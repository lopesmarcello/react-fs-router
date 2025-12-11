# react-fs-router

Next.js-style file-based routing for React with react-router-dom integration.

[![npm version](https://badge.fury.io/js/react-fs-router.svg)](https://www.npmjs.com/package/react-fs-router)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Features

- 🗂️ **File-based routing** - Just like Next.js
- 🔄 **Dynamic routes** - Support for `[param]` and `[...slug]` patterns
- 📦 **Zero config** - Works out of the box
- 🎨 **Layouts** - Per-route layouts with nesting support
- ⚡ **Code splitting** - Automatic lazy loading
- 🎯 **Type-safe** - Full TypeScript support
- 🪝 **Familiar hooks** - useRouter, useParams, and more
- 🔌 **react-router-dom** - Built on the industry standard

## Installation

```bash
npm install react-fs-router react-router-dom
# or
yarn add react-fs-router react-router-dom
# or
pnpm add react-fs-router react-router-dom
```

## Quick start 

### 1. Create your pages
```

```
src/
├── pages/
│   ├── index.tsx          -> /
│   ├── about.tsx          -> /about
│   └── blog/
│       ├── index.tsx      -> /blog
│       └── [slug].tsx     -> /blog/:slug
└── App.tsx
```
```

### 2. Use FileRouter in your app 

```tsx
// App.tsx
import { FileRouter } from 'react-fs-router';

function App() {
  return <FileRouter />;
}

export default App;
```

### 3. Create a page component

```tsx
// src/pages/blog/[slug].tsx
import { useParams } from 'react-router-dom';

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  return <h1>Blog Post: {slug}</h1>;
}
```

That's it! 🎉

## License

MIT © [Marcello Lopes]
