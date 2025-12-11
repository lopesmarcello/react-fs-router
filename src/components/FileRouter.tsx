import { useMemo } from "react";
import {
  createBrowserRouter,
  createHashRouter,
  createMemoryRouter,
  RouterProvider,
} from "react-router-dom";
import { RouteLoader } from "../core/route-loader";
import { type FileRouterProps, type RouteModule } from "../types";

export function FileRouter({
  basePath = "/",
  type = "browser",
  loading,
  notFound: NotFound,
}: FileRouterProps) {
  const router = useMemo(() => {
    // This will be populated by Vite's import.meta.glob
    // @ts-ignore - This is injected by the build process
    // project/node_modules/react-fs-router-dom/
    const modules = import.meta.glob<RouteModule>("../../src/pages/**/*.{tsx,jsx}");

    const routes = RouteLoader.generateRoutes(modules, loading);

    if (NotFound) {
      routes.push({
        path: "*",
        element: <NotFound />,
      });
    }

    const createRouter =
      type === "hash"
        ? createHashRouter
        : type === "memory"
          ? createMemoryRouter
          : createBrowserRouter;

    return createRouter(routes, {
      basename: basePath,
    });
  }, [basePath, type, loading, NotFound]);

  return <RouterProvider router={router} />;
}
