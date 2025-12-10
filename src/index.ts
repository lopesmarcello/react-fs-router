export { FileRouter } from "./components/FileRouter";
export { createFileRouter } from "./core/create-file-router";
export { useRouter } from "./hooks/useRouter";
export { useParams } from "./hooks/useParams";

// Re-exports
export {
  Link,
  NavLink,
  Outlet,
  Navigate,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

export type { FileRouterProps, RouteModule } from "./types";
