English | [简体中文](./README.zh-CN.md)

# Tailwind Nextjs TypeScript Starter Blog

> Blogging starter template based on [Tailwind](https://github.com/tailwindlabs/tailwindcss) + [Next.js](https://github.com/vercel/next.js) + **[TypeScript](https://github.com/microsoft/TypeScript)**.

## Features

- 🦄 [Next.js](https://nextjs.org/) with [TypeScript](https://github.com/microsoft/TypeScript)
- 💎 Easy styling customization with [Tailwind CSS](https://tailwindcss.com/)
- ☀️ Light and 🌘 dark theme
- 😎 Content management base on [MDX](https://mdxjs.com/) with [Contentlayer](https://contentlayer.dev/)
- 🚀 SEO first
  - Calculates and event callbacks optimize for [_idle-until-urgent_](https://philipwalton.com/articles/idle-until-urgent/) pattern as much as possible based on [idlization](https://github.com/yunsii/idlization)
  - [LazyFramerMotion](./src/components/LazyFramerMotion/index.tsx) component
- 📊 Analytics based on [analytics](https://github.com/DavidWells/analytics)
- ❤️ Heti post layout (for Chinese)
- 🎈 Svg sprite based on [unplugin-svg-sprite](https://github.com/yunsii/unplugin-svg-sprite)

Developers experience (DX) based on:

- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [commitlint](https://commitlint.js.org/)

Initialized by [@jannajs/lint](https://github.com/jannajs/janna).

## Usage

- `Use this template` or fork this repo
- Custom your data, includes:
  - [`metadata.ts`](./data/metadata.ts)
  - [`menu.ts`](./data/menu.ts)
  - [`projects.ts`](./data/projects.ts)
  - [`logo.svg`](./data/logo.svg)
  - [Self-introduction](./data/authors/default.mdx)
  - `npm run compose` to draft a blog post
  - `npm run dev` to watch changes instantly

Moreover, you can custom your [favicons](./public/static/favicons) and remove others example files.

## Deploy

You'd better to choose [Vercel](https://vercel.com/), because of some API functions.

## Motivation

In an interview article with the React core developers, I read that he recommended newcomers to get started with Next.js. As an old React developer, It's hard to justify not knowing about Next.js, I recently decided to start my own blog template, the previous Hexo template felt like a mental burden and didn't have much motivation to blog well. With the React framework, we can do a lot of things. In addition to the recent [Vite](https://github.com/vitejs/vite) and [Windi CSS](https://github.com/windicss/windicss) has been more familiar, just take this as an opportunity to do a Next.js and Vite in-depth experience.

I originally thought that started from ZERO, the workload or too screaming after short thinking. After all, the goal is to make my blog again after the template works well. Finally found [timlrx/tailwind-nextjs-starter-blog](https://github.com/timlrx/tailwind-nextjs-starter-blog), a Tailwind + Nextjs template, I wanted to migrate to Windi CSS, but it was not easy to grasp the workload when I was not familiar with the project, so I thought it would be better to take this opportunity to Tailwind and have a deep experience. And because the project's support for TypeScript isn't complete enough, As a TypeScript enthusiast, even though I'm a mediocre type gymnast \_(:з」∠)\_ Therefore, a more comprehensive TypeScript support is made based on this template.
