[English](./README.md) | 简体中文

# Tailwind Nextjs TypeScript Starter Blog

> 基于 [Tailwind](https://github.com/tailwindlabs/tailwindcss) + [Next.js](https://github.com/vercel/next.js) + **[TypeScript](https://github.com/microsoft/TypeScript)** 的博客模板。

## 功能特色

- 🦄 [Next.js](https://nextjs.org/) 结合 [TypeScript](https://github.com/microsoft/TypeScript)
- 💎 基于 [Tailwind CSS](https://tailwindcss.com/) 的样式定制
- ☀️ 支持亮色 🌘 暗色主题
- 😎 基于 [MDX](https://mdxjs.com/) 和 [Contentlayer](https://contentlayer.dev/) 的内容管理
- 🚀 SEO 优先
  - 基于 [idlization](https://github.com/yunsii/idlization) 尽可能实现基于 [_idle-until-urgent_](https://philipwalton.com/articles/idle-until-urgent/) 模式的数值计算与事件回调优化
  - [LazyFramerMotion](./src/components/LazyFramerMotion/index.tsx) 组件
- 📊 基于 [analytics](https://github.com/DavidWells/analytics) 的数据分析
- ❤️ 赫蹏中文排版
- 🎈 基于 [tailwindcss-plugin-iconify](https://github.com/yunsii/tailwindcss-plugin-iconify) 使用纯 CSS 图标库

开发体验优化基于:

- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [commitlint](https://commitlint.js.org/)

由 [@jannajs/lint](https://github.com/jannajs/janna) 初始化相关配置。

## 使用

- `Use this template` 或者 fork 该仓库
- 自定义用户数据，包括：
  - [`metadata.ts`](./data/metadata.ts)
  - [`menu.ts`](./data/menu.ts)
  - [`projects.ts`](./data/projects.ts)
  - [`logo.svg`](./data/logo.svg)
  - [自我介绍](./data/authors/default.mdx)
  - `npm run compose` 起草一篇博客文章
  - `npm run dev` 实时查看相关变化

此外，你可以自定义 [favicons](./public/static/favicons) 并删除其他模板文件。

## 部署

由于存在一部分 API 功能，最好选择 [Vercel](https://vercel.com/)。

## 动机

在一篇对于 React 核心开发者的访谈记录文章中看到其推荐新人直接 Next.js 入门，作为一个老 Reacter，还对 Next.js 不了解实在说不过去了，刚好最近打算自己搞个博客模板，之前用的 Hexo 模板感觉心智负担挺大的，没太大动力去做好博客，如果是基于 React 的框架的话，就可以各种折腾了。另外最近对于 [Vite](https://github.com/vitejs/vite) 和 [Windi CSS](https://github.com/windicss/windicss) 已经比较熟悉了，正好以此为契机，做个 Next.js 和 Vite 的深入体验。

本来想自己从 0 开始，想想工作量还是太离谱了，毕竟目标是先做好模板之后把自己的博客再迁移一下。最后找到了 [timlrx/tailwind-nextjs-starter-blog](https://github.com/timlrx/tailwind-nextjs-starter-blog) 一个 Tailwind + Nextjs 的模板，本来想换成 Windi CSS 的，在还不熟悉项目的情况下不好把握工作量，想了想不如乘此机会把 Tailwind 也深入体验一下，这波不亏。又由于项目对 TypeScript 的支持不够完善，个人属于 TypeScript 狂热爱好者，虽然类型体操能力一般 \_(:з」∠)\_ 遂基于此模板做了较为全面的 TypeScript 支持。
