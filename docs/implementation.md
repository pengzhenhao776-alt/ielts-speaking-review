# 执行步骤

## 第1步：项目初始化
- [x] 安装依赖（npm install）
- [x] 安装附加包：tailwindcss, zustand, react-router-dom, pako
- [x] 配置 Tailwind CSS
- [x] 清理 Vite 默认文件，建立项目文件结构
- [x] 配置路由框架

## 第2步：数据类型和状态管理
- [x] 定义 Card、Deck、Template 等 TypeScript 类型
- [x] 实现 deckStore（Zustand + localStorage 持久化）
- [x] 实现 templateStore（Zustand + localStorage 持久化）

## 第3步：表达卡片模块
- [x] FlipCard 组件（含 3D 翻转动画）
- [x] CardEditor 组件（新增/编辑单张卡片）
- [x] CardDeck 组件（卡片组容器、翻页导航）
- [x] DeckCreate 页面（创建卡片组、添加卡片）
- [x] DeckReview 页面（复习模式、翻转浏览）

## 第4步：口语思路模板模块
- [x] TemplateEditor 组件（三段式框架编辑）
- [x] TemplateView 组件（模板展示）
- [x] TemplateCreate 页面
- [x] TemplateReview 页面

## 第5步：分享功能
- [x] pako 压缩 + Base64 编码工具函数
- [x] URL 生成和解析
- [x] 分享链接复制按钮
- [x] 分享链接页面（只读模式）

## 第6步：首页和路由
- [x] HomePage 首页仪表盘
- [x] Layout 全局布局组件
- [x] 所有路由连接

## 第7步：UI 打磨
- [x] Apple Style 整体视觉调整
- [x] 按钮配色优化（黑字浅底）
- [x] 毛玻璃弹窗效果

## 第8步：种子数据 & 部署
- [x] 从教师文档提取8套卡片组 + 4套口语模板
- [x] 导入课程数据功能
- [ ] 构建生产版本
- [ ] 部署到 Vercel 或 GitHub Pages
- [ ] 分享链接功能测试
