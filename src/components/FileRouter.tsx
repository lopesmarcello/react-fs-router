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
    const modules = import.meta.glob<RouteModule>("/src/pages/**/*.{tsx,jsx}");
    console.log("Modules from import.meta.glob:", modules);

    const routes = RouteLoader.generateRoutes(modules, loading);
    console.log("Generated routes:", routes);

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
      baseName: basePath,
    });
  }, [basePath, type, loading, NotFound]);

  return <RouterProvider router={router} />;
}
