# create-djl-vue-ts

`bun create djl-vue-ts` 脚手架项目，基于 Vue 3 + TypeScript + Rsbuild 模板。

## 使用方式

```bash
bun create djl-vue-ts my-project
cd my-project
bun install
bun run dev
```

## 模板目录

- 脚手架入口：`bin/index.mjs`
- 模板内容：`template/`
- 发布包名：`create-djl-vue-ts`

## 首次初始化 GitHub 仓库

在本项目目录执行：

```bash
cd /Users/dengjianlong/Desktop/Code/template-repos/create-djl-vue-ts

git init
git branch -M main
printf ".DS_Store\nnode_modules\n" >> .gitignore
git add .
git commit -m "chore: init create-djl-vue-ts scaffold"
```

### 方式 A：使用 GitHub CLI（推荐）

```bash
gh auth login
gh repo create create-djl-vue-ts --public --source=. --remote=origin --push
```

### 方式 B：网页创建后手动绑定 remote

```bash
git remote add origin git@github.com:<你的用户名>/create-djl-vue-ts.git
git push -u origin main
```

## 发布到 npm

```bash
cd /Users/dengjianlong/Desktop/Code/template-repos/create-djl-vue-ts
bun publish --access public
```

发布成功后可用：

```bash
bun create djl-vue-ts my-project
```

## 日常迭代流程（推荐）

1. 修改 `template/` 中的模板内容。
2. 执行检查：`bun run check`。
3. 提交并推送 GitHub。
4. 更新 `package.json` 的 `version`（例如 `0.1.0 -> 0.1.1`）。
5. 发布 npm：`bun publish --access public`。
6. 打版本标签并推送：

```bash
git tag v0.1.1
git push origin v0.1.1
```

## 版本建议

- Git tag 与 npm 版本保持一致（如 `v0.1.1` 对应 `package.json#version: 0.1.1`）。
- 每次发布前确保 `template/` 内容可直接创建项目并运行。
