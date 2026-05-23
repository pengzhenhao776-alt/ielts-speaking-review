# 技术规范

## 技术栈

| 层 | 选择 | 版本要求 |
|----|------|---------|
| 框架 | React | ^18 |
| 语言 | TypeScript | ^5 |
| 构建 | Vite | ^5 |
| 样式 | Tailwind CSS | ^3 |
| 状态管理 | Zustand | ^4 |
| 路由 | React Router DOM | ^6 |

## 项目结构

```
src/
├── main.tsx                 # 入口
├── App.tsx                  # 根组件 + 路由
├── index.css                # 全局样式 + Tailwind
├── types/
│   └── index.ts             # 所有类型定义
├── store/
│   ├── deckStore.ts         # 卡片组状态
│   └── templateStore.ts     # 模板状态
├── utils/
│   └── share.ts             # URL 编码/解码分享
├── components/
│   ├── Layout.tsx           # 全局布局（导航等）
│   ├── Card/
│   │   ├── FlipCard.tsx     # 翻转卡片
│   │   ├── CardEditor.tsx   # 卡片编辑器
│   │   └── CardDeck.tsx     # 卡片组容器
│   └── Template/
│       ├── TemplateView.tsx # 模板查看
│       └── TemplateEditor.tsx # 模板编辑器
└── pages/
    ├── HomePage.tsx         # 首页
    ├── DeckCreate.tsx       # 创建/编辑卡片组
    ├── DeckReview.tsx       # 复习卡片组
    ├── TemplateCreate.tsx   # 创建/编辑模板
    └── TemplateReview.tsx   # 查看模板
```

## 编码规范
- 组件使用函数式 + Hooks
- 类型定义集中在 types/index.ts
- 状态使用 Zustand store，不跨组件传递复杂 props
- 样式优先使用 Tailwind 类名，复杂动画用 CSS
- 文件名：组件用 PascalCase，工具用 camelCase

## 数据存储规范
- localStorage key 前缀：`ielts_`
- 卡片组 key：`ielts_decks`
- 模板 key：`ielts_templates`

## 分享机制
- 数据序列化为 JSON → 压缩 → Base64 编码 → 放入 URL hash
- 使用 `pako` 库进行 zlib 压缩
- URL 格式：`https://域名/#/share?d=<encoded_data>`
