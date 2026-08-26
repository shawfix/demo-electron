# AGENTS.md

## 交互约定
- 回复、注释、commit 信息均用简体中文；代码标识符与文件名用英文

## 项目概述
demo-electron：Electron 桌面应用，pnpm 管理。
- 技术栈：electron-vite（Electron 39 + Vite 7 + TS 5）、React 19 + react-router-dom（Hash 路由）+ Tailwind 4 + daisyUI、better-sqlite3 + Drizzle ORM（启动自动迁移）、electron-log
- `src/main`：主进程（`windows/`、`db/`、`logger/`、入口 `index.ts`）
- `src/preload`：经 `helper/bridge.ts` 的 `createBridge()` 用 contextBridge 暴露 API
- `src/renderer`：别名 `@renderer` → `src/renderer/src`；页面放 `pages/<页面名>/index.tsx`，在 `router/index.tsx` 懒加载注册

## 常用命令
- `pnpm install` 安装；`pnpm dev` 开发；`pnpm typecheck` / `pnpm lint` / `pnpm format` 检查与格式化
- `pnpm build` 构建（含 typecheck），平台包：`pnpm build:mac` / `build:win` / `build:linux`
- DB schema 在 `src/main/db/schema/`，改动后 `npx drizzle-kit generate` 生成迁移
- 暂未配置测试框架，不要虚构测试命令

## 代码风格
- 遵循现有 ESLint（含 react-hooks、react-refresh）与 Prettier（单引号、分号、行宽 100、无尾逗号）
- 组件文件 PascalCase，工具文件 camelCase，页面目录小写 + `index.tsx`；统一函数组件 + Hooks
- 禁止 `any`，必须显式类型；确无法收窄时附中文注释并加 `eslint-disable`
- 渲染进程访问系统能力一律经 preload 桥接（`createBridge` / contextBridge），不直连 Node API
- 仅渲染层使用的依赖装 `devDependencies`；主进程运行时依赖必须装 `dependencies`（electron-builder 只打包 `dependencies`）
- 行尾符统一 LF：`.gitattributes`（`* text=auto eol=lf`）+ Prettier `endOfLine: lf` + `.editorconfig` 三层约束
- 提交前 `pnpm lint` 与 `pnpm typecheck` 必须通过

## UI 风格规范
- 配色一律用 daisyUI 语义 token（`bg-base-100`、`text-base-content`、`btn-primary` 等），禁止硬编码颜色值，保证 light/dark 双主题自适应
- 组件优先用 daisyUI 类（`card`、`btn`、`badge`、`alert`、`dropdown` 等），Tailwind 工具类只做布局与微调
- 图标统一用 `lucide-react`，不新增内联 SVG
- 遵守 macOS 标题栏约定：尺寸用 `--app-header-height` / `--app-header-pl` 变量；可拖拽区域内的交互元素加 `-webkit-app-region: no-drag`
- 动效保持克制：页面切换用 `PageTransition`（透明度淡入淡出）；新增动画必须尊重 `prefers-reduced-motion`
- 主题切换必须经 `transitionViewIfSupported` + `flushSync`，确保 View Transition 拍到新主题画面
- 界面文案用简体中文；字体沿用 Inter/系统字体栈，不自引入字体

## 环境变量
- `.env`（基础）/ `.env.development` / `.env.production`
- 仅 `VITE_` 前缀暴露给渲染进程；主进程/预加载用 `MAIN_VITE_` / `PRELOAD_VITE_` 前缀

## docs 目录规范
配合 `superpowers` 工作流存放 spec/plan 文档，按模块划分：
```
docs/[module]/                    # 如 docs/posts、docs/dashboard
├── index.md                      # 功能汇总、业务流程图
├── CHANGELOG.md                  # 变更日志
├── plans/[feature].md            # 计划：方向、拆阶段、风险
└── specs/[feature]/
    ├── spec.md                   # 需求、架构、边界、影响范围
    ├── tasks.md                  # 任务拆解、依赖顺序、执行步骤
    ├── checklist.md              # 验收清单
    └── 技术方案.md                # 评审与归档的正式方案
```
- `CHANGELOG.md` 基于 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.0.0/)，每条变更末尾标注提交人 `(@用户名)`

## 开发流程
1. 以模块为需求单位：先分析需求、拆分模块
2. 按工作量或故事点分级选流程：
   - 大功能/大迁移/跨系统：拆需求后分多个 SDD 闭环，产出多组 plan/spec/tasks/checklist
   - 架构影响/复杂链路/用户可见功能：单个 SDD 闭环，产出 spec/plan/tasks/checklist
   - 小功能/轻量重构：仅 tasks/checklist
   - 小 bug/小样式/小文案：直接对话处理，必要时补测试用例
3. 拆分结果告知用户，由用户决定流程
4. 按单个 task 实现，完成后按修改顺序列出变动文件及改动内容供 review，确认后更新 task 状态
5. 全部完成后执行验证（测试框架就绪前以 `pnpm typecheck`、`pnpm lint` 及 `pnpm dev` 手动验证为准），更新 `checklist.md`；用户最终确认后更新 `技术方案.md`、`index.md`、`CHANGELOG.md`

### spec/plan/task/checklist 规范
- `spec.md`：必须含结论、边界、影响范围、逐文件改动点、流程图、测试矩阵
- `tasks.md`：把需求拆成可执行工作流，task → subTask 逐级拆分，明确依赖顺序，全部可勾选
- `checklist.md`：写成验收标准，不是 TODO 清单
- `技术方案.md`：按模板重组，服务评审、测试、维护与归档

## 提交规范
> 仅当用户要求生成提交信息或执行 git commit 时适用。

- 遵循 Conventional Commits，类型判定：修复错误行为 → `fix`；引入新能力 → `feat`；行为不变的内部调整 → `refactor`；其他：`docs`、`style`、`perf`、`test`、`build`、`ci`、`chore`
- 依赖变更用 `build(deps)` / `chore(deps)` 并写明包名与版本区间；schema/迁移变更用 `feat(db)` / `refactor(db)`，注明迁移文件与是否需手动执行
- 生成前先读 `git diff --staged`（无则 `git status` + `git diff`）确认范围；只基于实际变更撰写，不臆测；混合类型必须拆分提交；不附署名或 Co-authored-by
- 格式（三段式，缺一不可）：
  ```
  <type>(<scope>): <简要描述，≤72 字符>

  <改了什么、为什么改、关键实现思路>

  涉及文件：
  - path/to/file.ts：<一句话概括改动>

  <可选：Closes #123 / Refs #45 / BREAKING CHANGE: 说明>
  ```
- 要求：scope 为受影响模块/目录；禁止「优化逻辑」「完善功能」等模糊表述；输出提交信息时只输出内容本身
- 不要主动 push 或建分支

## 禁区
- 不修改任务无关内容；不修改 `drizzle/` 迁移文件（自动生成且不入库）及 `out/`、`node_modules/`、`.eslintcache` 等产物
- 不开启 `nodeIntegration`、不关闭 `contextIsolation` / `contextBridge`（Electron 安全红线）
- 不手动编辑 `tsconfig.node.json` / `tsconfig.web.json`（脚手架生成）
- 不升级大版本依赖；不在 `.env*` 中提交真实密钥
