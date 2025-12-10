import { ComponentType } from "react";

export interface RouteModule {
  default: ComponentType<any>;
  Layout?: ComponentType<{ children: React.ReactNode }>;
  Loading?: ComponentType;
  ErrorBoundary?: ComponentType<{ error: Error }>;
  getServerSideProps?: () => Promise<any>;
}

export interface FileRouterProps {
  basePath?: string;
  type?: "browser" | "hash" | "memory";
  loading?: ComponentType;
  notFound?: ComponentType;
}

export interface GeneratedRoute {
  path: string;
  filePath: string;
  component: () => Promise<RouteModule>;
}
