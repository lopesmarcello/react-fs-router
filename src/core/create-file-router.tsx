import { type RouteObject } from "react-router-dom";
import { ComponentType, lazy, Suspense } from "react";
import { PathParser } from "./path-parser";
import { type RouteModule } from "../types";

interface CreateFileRouterOptions {
  loading?: ComponentType;
  notFound?: ComponentType;
}

/**
 * Creates routes from import.meta.glob result
 * Usage: createFileRouter(import.meta.glob('./pages/**\/*.tsx'))
 */
export function createFileRouter(
  modules: Record<string, () => Promise<any>>,
  options: CreateFileRouterOptions = {},
): RouteObject[] {
  const { loading: DefaultLoading, notFound: NotFound } = options;

  const routes = Object.entries(modules).map(([filePath, importFn]) => {
    // Clean up the file path (remove leading ./ etc)
    const cleanPath = filePath.replace(/^\.\/pages\//, "pages/");
    const routePath = PathParser.fileToRoute(cleanPath);

    const LazyComponent = lazy(async () => {
      const module = await importFn();
      return { default: module.default };
    });

    return {
      path: routePath,
      lazy: async () => {
        const module: RouteModule = await importFn();
        const Component = module.default;
        const Layout = module.Layout;
        const Loading = module.Loading || DefaultLoading;
        const ErrorBoundary = module.ErrorBoundary;

        let element = <Component />;

        if (Loading) {
          element = <Suspense fallback={<Loading />}>{element}</Suspense>;
        }

        if (Layout) {
          element = <Layout>{element}</Layout>;
        }

        return {
          element,
          ...(ErrorBoundary && {
            errorElement: <ErrorBoundary error={new Error("Route error")} />,
          }),
        };
      },
    };
  });

  const sortedRoutes = PathParser.sortRoutes(routes);

  // Add 404
  if (NotFound) {
    sortedRoutes.push({
      path: "*",
      element: <NotFound />,
    });
  }

  return sortedRoutes;
}
