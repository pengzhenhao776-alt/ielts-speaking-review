import pako from 'pako'

export function encode(data: unknown): string {
  const json = JSON.stringify(data)
  const compressed = pako.deflate(json)
  let binary = ''
  for (let i = 0; i < compressed.length; i++) {
    binary += String.fromCharCode(compressed[i])
  }
  return btoa(binary)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '')
}

export function decode<T>(encoded: string): T | null {
  try {
    const base64 = encoded.replace(/-/g, '+').replace(/_/g, '/')
    const binary = atob(base64)
    const bytes = new Uint8Array(binary.length)
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i)
    }
    const decompressed = pako.inflate(bytes, { to: 'string' })
    return JSON.parse(decompressed) as T
  } catch {
    return null
  }
}

export function generateShareUrl(type: 'deck' | 'template' | 'all' | 'activate', data: unknown): string {
  const encoded = encode(data)
  const base = window.location.origin + window.location.pathname
  return `${base}#/share?type=${type}&d=${encoded}`
}

export async function shortenUrl(longUrl: string): Promise<string> {
  try {
    const resp = await fetch(
      `https://tinyurl.com/api-create.php?url=${encodeURIComponent(longUrl)}`
    )
    if (resp.ok) {
      const text = await resp.text()
      if (text.startsWith('http')) return text
    }
  } catch {}
  return longUrl
}
