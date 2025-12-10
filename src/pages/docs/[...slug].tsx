import { useParams } from "react-router-dom";

export default function DocsPage() {
  const { params } = useParams();
  // For catch-all routes, the param is "*" and contains the full path

  return (
    <div className="docs-page">
      Params:
      <ul>
        {params}
      </ul>
    </div>
  );
}
