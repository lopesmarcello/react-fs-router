import { Plugin } from 'vite'
import fg from 'fast-glob'
import path from 'path'
import { RouteObject } from 'react-router-dom'

interface PluginOptions {
  dir?: string; // Default: 'src/pages'
  extensions?: string[] // Default: ['tsx', 'jsx']
}

export default function fsRouter(options: PluginOptions = {}): Plugin {
  const virtualModuleId = 'virtual:react-fs-router-dom/routes'
  const resolvedVirtualModuleId = '\0' + virtualModuleId
  let projectRoot: string;

  return {
    name: 'vite:react-fs-router-dom',
    enforce: 'pre',

    configResolved(config) {
      projectRoot = config.root;
    },

    resolveId(id) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId
      }
    },

    load(id) {
      if (id === resolvedVirtualModuleId) {
        const pagesDir = path.resolve(projectRoot, options.dir || 'src/pages')
        const exts = options.extensions || ['tsx', 'jsx']
        const globPattern = `**/*.{${exts.join(',')}}`

        const files = fg.sync(globPattern, { cwd: pagesDir, absolute: true })

        const routeTree: RouteObject[] = buildRouteTree(files, pagesDir)

        return `
          import React from 'react';
          export const routes = ${JSON.stringify(routeTree, null, 2).replace(/"lazy": "([^"]+)"/g, '"lazy": $1')}
        `
      }
    },
  }
}

function buildRouteTree(files: string[], pagesDir: string): RouteObject[] {
  const tree: Map<string, RouteObject> = new Map()

  files.forEach((file) => {
    let routePath = path.relative(pagesDir, file).replace(path.extname(file), '')
    if (routePath.endsWith('index')) routePath = routePath.replace('index', "")
    routePath = '/' + routePath.replace(/\\/g, '/').replace(/\/$/, '');

    // Handle dynamic params: [param] -> :param
    routePath = routePath.replace(/$$ (.+?) $$/g, ':$1');

    // For nesting, split by '/' and build tree (pseudo-code; implement recursively)
    const parts = routePath.split('/').filter(Boolean);
    let currentLevel = tree;
    parts.forEach((part, index) => {
      const key = part.startsWith(':') ? part : part.toLowerCase();  // Or your convention
      if (!currentLevel.has(key)) {
        const isLeaf = index === parts.length - 1;
        const route: RouteObject = {
          path: part,
          children: isLeaf ? undefined : [],
          lazy: isLeaf ? () => import(file) : undefined,  // Lazy load component
        };
        currentLevel.set(key, route);
      }
      if (index < parts.length - 1) {
        currentLevel = new Map();  // Dive deeper (adjust for actual tree building)
      }
    });
  });

  // Flatten map to array (implement as needed)
  return Array.from(tree.values());

}
