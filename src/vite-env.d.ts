/// <reference types="vite/client" />

declare module 'virtual:react-fs-router-dom/routes' {
  import { RouteObject } from 'react-router-dom';  // Adjust if using a different route type

  export const routes: RouteObject[];  // Match your exact export shape (e.g., add more if needed)
}
