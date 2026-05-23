# 雅思口语复习 — 项目开发指引

## 项目概述
雅思口语学习卡片软件。老师制作表达卡片和口语思路模板，生成链接分享给学生复习。

## 标准文件路径

| 文档 | 路径 | 说明 |
|------|------|------|
| 产品需求 | [docs/requirements.md](docs/requirements.md) | 功能需求、用户角色、非功能需求 |
| 技术规范 | [docs/tech.md](docs/tech.md) | 技术栈、项目结构、编码规范、数据存储规范 |
| 设计规范 | [docs/design.md](docs/design.md) | 配色、字体、圆角间距、动效、响应式断点 |
| 执行步骤 | [docs/implementation.md](docs/implementation.md) | 分步实施清单，勾选进度 |
| 项目计划 | [C:\Users\ASUS\.claude\plans\sleepy-doodling-kazoo.md](C:\Users\ASUS\.claude\plans\sleepy-doodling-kazoo.md) | 完整项目方案 |

## 工作约定

### 开发节奏
- 每次只做一步，完成并确认后再继续
- 每完成一个小步骤，更新 `docs/implementation.md` 中的勾选状态
- 每天结束时在 `logs/YYYY-MM-DD.md` 记录完成事项和待办

### 编码要求
- 严格遵循 `docs/tech.md` 中的技术选型和编码规范
- UI 实现参考 `docs/design.md` 中的设计规范
- 所有功能对标 `docs/requirements.md` 中的需求
- 写代码前先阅读相关规范文件

### 日志规范
- 每天在 `logs/` 下创建 `YYYY-MM-DD.md` 文件
- 内容包含：今日完成事项 + 明日待办
- 文件名使用当天日期（如 `2026-05-23.md`）

### 不要做的事
- 不要一次性做大量改动，保持步骤可控
- 不要偏离技术选型引入新的依赖
- 不要跳过规范直接写代码
