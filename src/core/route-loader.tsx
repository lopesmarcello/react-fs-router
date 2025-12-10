import { type RouteObject } from "react-router-dom";
import { Suspense, ComponentType } from "react";
import { PathParser } from "./path-parser";
import { type RouteModule } from "../types";

export class RouteLoader {
  // Generate routes from vite.meta.glob

  static generateRoutes(
    modules: Record<string, () => Promise<RouteModule>>,
    defaultLoading?: ComponentType,
  ): RouteObject[] {
    const routes = Object.entries(modules).map(([filePath, importFn]) => {
      const path = PathParser.fileToRoute(filePath);

      return {
        path,
        filePath,
        lazy: async () => {
          const module = await importFn();
          const Component = module.default;
          const Layout = module.Layout;
          const Loading = module.Loading || defaultLoading;
          const ErrorBoundary = module.ErrorBoundary;

          let element = <Component />;

          // Wrap it with layout if exists
          if (Layout) {
            element = <Layout>{element} </Layout>;
          }

          // Wrap it with suspense if loading exists
          if (Loading) {
            element = <Suspense fallback={<Loading />}>{element}</Suspense>;
          }

          return {
            element,
            errorElement: ErrorBoundary ? (
              <ErrorBoundary error={new Error()} />
            ) : undefined,
          };
        },
      };
    });

    return PathParser.sortRoutes(routes);
  }
}
