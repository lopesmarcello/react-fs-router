import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { FileRouter } from "./components/FileRouter";


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <FileRouter />
  </StrictMode>,
);
