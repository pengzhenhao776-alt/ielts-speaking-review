# 设计规范

## 视觉原则
- 简洁、留白、克制
- 信息密度低，聚焦单一任务
- 参考 Apple Human Interface Guidelines

## 色彩系统

| 用途 | 颜色 | Tailwind |
|------|------|----------|
| 页面背景 | 近白 | `bg-gray-50` |
| 卡片背景 | 纯白 | `bg-white` |
| 主强调色 | 系统蓝 | `text-blue-500` / `bg-blue-500` |
| 文字主色 | 深灰 | `text-gray-900` |
| 文字辅助 | 中灰 | `text-gray-500` |
| 卡片阴影 | 浅影 | `shadow-sm` / `shadow-md` |
| 分隔线 | 极浅灰 | `border-gray-100` |

## 字体
- 使用系统默认无衬线字体栈：`-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`
- 中文回退：系统默认中文字体
- 标题字重：`font-bold` (700)
- 正文字重：`font-normal` (400)

## 圆角与间距
- 大卡片圆角：`rounded-2xl` (16px)
- 小元素圆角：`rounded-xl` (12px)
- 按钮圆角：`rounded-full`（药丸形）
- 页面内边距：`p-6` (24px)
- 卡片内边距：`p-5` (20px)

## 动效
- 卡片翻转：CSS 3D transform，`transform-style: preserve-3d`，过渡 0.6s
- 页面切换：淡入淡出，opacity 过渡 0.2s
- 按钮悬停：轻微放大 scale(1.02) + 阴影加深

## 响应式断点
- 手机：默认（< 640px）
- 平板：`sm:` (≥640px) 两列网格
- 桌面：`lg:` (≥1024px) 最大宽度限制 960px 居中

## 组件风格
- 按钮：圆角药丸形，蓝色填充或线框
- 输入框：浅灰背景，聚焦时蓝色边框
- 卡片：白底 + 浅阴影 + 大圆角
- 标签：小圆角，浅色背景
