import { useState, useRef, useCallback, useEffect } from 'react'

interface Props {
  expression: string
  alternatives: string
  duration?: number
  simple?: boolean // true = countdown only, no expression matching
  onClose: () => void
}

interface MatchResult {
  phrase: string
  used: boolean
}

function isWeChat(): boolean {
  return /MicroMessenger/i.test(navigator.userAgent)
}

function supportsSpeech(): boolean {
  return !!((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition)
}

export default function SpeechPractice({ expression, alternatives, duration = 30, simple = false, onClose }: Props) {
  const [listening, setListening] = useState(false)
  const [countdown, setCountdown] = useState(duration)
  const [timerActive, setTimerActive] = useState(false)
  const timerRef = useRef<any>(null)
  const [text, setText] = useState('')
  const [results, setResults] = useState<MatchResult[] | null>(null)
  const [error, setError] = useState('')
  const recognitionRef = useRef<any>(null)

  // Expand verb conjugations for matching
  const expandVerb = (phrase: string): string[] => {
    const variants = [phrase]
    const beForms = ['am', 'is', 'are', 'was', 'were', 'been', 'being']
    const haveForms = ['has', 'had', 'having']
    const doForms = ['does', 'did', 'doing']
    const feelForms = ['feels', 'felt', 'feeling']
    // "be X" → "am X", "is X", "are X", etc.
    if (phrase.startsWith('be ')) {
      const rest = phrase.slice(3)
      variants.push(...beForms.map((f) => f + ' ' + rest))
      // Also add rest alone (e.g. "fond of" from "be fond of")
      variants.push(rest)
    }
    // "have X" → "has X", "had X"
    if (phrase.startsWith('have ')) {
      const rest = phrase.slice(5)
      variants.push(...haveForms.map((f) => f + ' ' + rest))
      variants.push(rest)
    }
    // "do X" → "does X", "did X"
    if (phrase.startsWith('do ')) {
      const rest = phrase.slice(3)
      variants.push(...doForms.map((f) => f + ' ' + rest))
    }
    // "feel X" → "feels X", "felt X"
    if (phrase.startsWith('feel ')) {
      const rest = phrase.slice(5)
      variants.push(...feelForms.map((f) => f + ' ' + rest))
    }
    // "can't X" → "cannot X"
    if (phrase.startsWith("can't ")) {
      const rest = phrase.slice(6)
      variants.push('cannot ' + rest)
    }
    // "get away from" etc - no be/do/have prefix, just check as-is
    return variants
  }

  // Build target phrases from alternatives string, with conjugations
  const rawPhrases = alternatives
    .split(/[,，/、]/)
    .map((s) => s.trim())
    .filter((s) => s.length > 1 && !s.includes('→'))

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopTimer()
      const rec = recognitionRef.current
      if (rec) {
        recognitionRef.current = null
        try { rec.stop() } catch {}
        setTimeout(() => { try { rec.abort() } catch {} }, 100)
      }
    }
  }, [])

  const startListening = useCallback(() => {
    setError('')
    setText('')
    setResults(null)

    // Stop any existing recognition first
    if (recognitionRef.current) {
      try { recognitionRef.current.abort() } catch {}
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    if (!SpeechRecognition) {
      setError('您的浏览器不支持语音识别，请使用 Chrome 浏览器')
      return
    }

    const recognition = new SpeechRecognition()
    recognition.lang = 'en-US'
    recognition.interimResults = false
    recognition.maxAlternatives = 1
    // Auto-stop after 8 seconds to prevent hanging mic
    recognition.continuous = false

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript
      setText(transcript)
      checkMatches(transcript)
      setListening(false)
    }

    recognition.onerror = (event: any) => {
      if (event.error === 'no-speech') {
        setError('未检测到语音，请再试一次')
      } else {
        setError('录音出错了，请重试')
      }
      setListening(false)
    }

    recognition.onend = () => {
      setListening(false)
    }

    recognitionRef.current = recognition
    recognition.start()
    setListening(true)
    startTimer()
  }, [])

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
    setTimerActive(false)
  }

  const startTimer = () => {
    setCountdown(duration)
    setTimerActive(true)
    timerRef.current = setInterval(() => {
      setCountdown((prev: number) => {
        if (prev <= 1) {
          stopTimer()
          stopMic()
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  const stopMic = () => {
    stopTimer()
    const rec = recognitionRef.current
    if (rec) {
      recognitionRef.current = null
      setListening(false)
      try { rec.stop() } catch {}
      setTimeout(() => {
        try { rec.abort() } catch {}
      }, 100)
    } else {
      setListening(false)
    }
  }

  const stopListening = useCallback(() => {
    stopMic()
  }, [])

  const handleClose = () => {
    stopMic()
    onClose()
  }

  const stopWords = new Set(['the', 'a', 'an', 'is', 'are', 'was', 'were', 'be', 'been', 'of', 'to', 'in', 'on', 'at', 'for', 'with', 'and', 'or', 'but', 'not', 'it', 'this', 'that', 'i', 'you', 'he', 'she', 'we', 'they', 'my', 'your', 'his', 'her', 'our', 'their', 'me', 'him', 'us', 'them', 'do', 'does', 'did', 'can', 'will', 'would', 'could', 'should', 'have', 'has', 'had', 'very', 'really', 'just', 'quite', 'from', 'by', 'about', 'as', 'if', 'so', 'than', 'too', 'all', 'no', 'some', 'any', 'each', 'every'])

  const checkMatches = (transcript: string) => {
    const lower = transcript.toLowerCase()
    const spokenWords = lower.split(/\s+/).filter((w) => w.length > 1 && !stopWords.has(w))

    const matches: MatchResult[] = rawPhrases.map((phrase) => {
      const variants = expandVerb(phrase)
      // Check if any variant matches
      let matched = false
      for (const v of variants) {
        const vl = v.toLowerCase()
        if (lower.includes(vl)) { matched = true; break }
        // Word-level check
        const pWords = vl.split(/\s+/).filter((w) => w.length > 1 && !stopWords.has(w))
        if (pWords.length === 0) continue
        const hits = pWords.filter((pw) => spokenWords.some((sw) => sw.includes(pw) || pw.includes(sw)))
        if (hits.length >= Math.ceil(pWords.length / 2)) { matched = true; break }
      }
      return { phrase, used: matched }
    })
    setResults(matches)
  }

  const usedCount = results ? results.filter((r) => r.used).length : 0
  const totalCount = rawPhrases.length

  // If WeChat or no speech support, show guide
  if (isWeChat() || !supportsSpeech()) {
    const url = window.location.href
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 p-4 backdrop-blur-sm">
        <div className="w-full max-w-md rounded-2xl bg-[--color-card] p-6 shadow-lg">
          <div className="text-center">
            <span className="text-4xl">📢</span>
            <p className="mt-3 text-lg font-semibold">请在系统浏览器中打开</p>
            <p className="mt-2 text-sm text-[--color-text-secondary]">
              微信内置浏览器不支持语音功能
            </p>
            <div className="mt-4 rounded-xl bg-gray-50 p-4 text-left text-sm space-y-2">
              <p><span className="font-medium">iPhone：</span>点击右上角 ··· → 在 Safari 中打开</p>
              <p><span className="font-medium">Android：</span>点击右上角 ··· → 在浏览器中打开</p>
            </div>
            <div className="mt-4 rounded-xl bg-blue-50 p-3 text-xs text-blue-700 break-all text-left">
              当前页面：{url}
            </div>
            <button
              onClick={handleClose}
              className="w-full mt-4 rounded-full bg-gray-100 py-3 text-sm font-medium transition-colors hover:bg-gray-200"
            >
              关闭
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl bg-[--color-card] p-6 shadow-lg max-h-[90vh] overflow-auto">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-semibold">口语练习</h2>
          <button
            onClick={handleClose}
            className="rounded-full p-1 text-[--color-text-secondary] hover:bg-gray-100"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l8 8M6 14l8-8" />
            </svg>
          </button>
        </div>

        <div className="mb-4 rounded-xl bg-blue-50 p-4">
          <p className="text-sm text-blue-800">
            {simple
              ? `请根据题目要求用英语回答，时长 ${duration} 秒`
              : `请用 "${expression}" 或其替代表达造一个英文句子`
            }
          </p>
        </div>

        {!simple && (
          <div className="mb-4">
            <p className="text-xs font-medium text-[--color-text-secondary] mb-2">目标表达</p>
            <div className="flex flex-wrap gap-1.5">
              {rawPhrases.map((p) => (
                <span key={p} className="rounded-full bg-gray-100 px-2.5 py-1 text-xs">
                  {p}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Record button + Timer */}
        <div className="mb-5 flex flex-col items-center gap-2">
          {/* Countdown */}
          <div className={`text-3xl font-mono font-bold transition-colors ${
            timerActive && countdown <= 5 ? 'text-red-500 animate-pulse' : 'text-[--color-text-secondary]'
          }`}>
            {timerActive || listening
              ? `${Math.floor(countdown / 60)}:${String(countdown % 60).padStart(2, '0')}`
              : `${Math.floor(duration / 60)}:${String(duration % 60).padStart(2, '0')}`
            }
          </div>

          <button
            onClick={listening ? stopListening : startListening}
            className={`rounded-full px-10 py-5 text-base font-medium transition-all ${
              listening
                ? 'bg-red-500 text-white shadow-lg shadow-red-200 scale-105'
                : 'bg-gray-900 text-white hover:opacity-90'
            }`}
          >
            {listening ? '⏹ 停止录音' : '🎤 开始录音'}
          </button>
          {listening && (
            <span className="flex items-center gap-1.5 text-xs text-red-500">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              麦克风已启用
            </span>
          )}
          <p className="text-xs text-[--color-text-secondary]">
            限时回答：{duration}秒
          </p>
        </div>

        {error && (
          <div className="mb-4 rounded-xl bg-red-50 p-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Recognized text */}
        {text && (
          <div className="mb-4 rounded-xl bg-gray-50 p-4">
            <p className="text-xs font-medium text-[--color-text-secondary] mb-1">你的回答</p>
            <p className="text-sm italic">"{text}"</p>
          </div>
        )}

        {/* Results - only in full mode */}
        {!simple && results && (
          <div className="rounded-xl border border-[--color-border] p-4">
            <p className="text-xs font-medium text-[--color-text-secondary] mb-3">
              表达匹配 ({usedCount}/{totalCount})
            </p>
            <div className="space-y-2">
              {results.map((r) => (
                <div
                  key={r.phrase}
                  className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm ${
                    r.used ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                  }`}
                >
                  <span>{r.used ? '✅' : '🔶'}</span>
                  <span>{r.phrase}</span>
                  {!r.used && <span className="text-xs opacity-70">未匹配</span>}
                </div>
              ))}
            </div>
            {usedCount > 0 ? (
              <p className="mt-3 text-sm text-emerald-600">
                识别到 {usedCount}/{totalCount} 个目标表达，继续加油！
              </p>
            ) : (
              <p className="mt-3 text-sm text-amber-600">
                语音识别可能不够准确，请对照上方文字自己检查发音是否包含目标表达
              </p>
            )}
          </div>
        )}

        <button
          onClick={handleClose}
          className="w-full mt-4 rounded-full bg-gray-100 py-3 text-sm font-medium transition-colors hover:bg-gray-200"
        >
          关闭
        </button>
      </div>
    </div>
  )
}
