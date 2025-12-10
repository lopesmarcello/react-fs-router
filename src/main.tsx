import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { FileRouter } from "./components/FileRouter.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <FileRouter loading={<h1>loading...</h1>} notFound={<h1>Not found</h1>} />
  </StrictMode>,
);
