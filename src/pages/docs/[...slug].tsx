import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";

interface DocPage {
  title: string;
  content: string;
  breadcrumbs: Array<{ label: string; href: string }>;
  tableOfContents: Array<{ id: string; title: string; level: number }>;
}

export default function DocsPage() {
  const params = useParams();
  // For catch-all routes, the param is "*" and contains the full path
  const slug = params["*"] || "introduction";
  const segments = slug.split("/");

  const [doc, setDoc] = useState<DocPage | null>(null);

  useEffect(() => {
    fetch(`/api/docs/${slug}`)
      .then((res) => res.json())
      .then(setDoc);
  }, [slug]);

  if (!doc) return null;

  return (
    <div className="docs-page">
      <aside className="docs-sidebar">
        <nav className="docs-nav">
          <h3>Documentation</h3>
          <ul>
            <li>
              <Link to="/docs/introduction">Introduction</Link>
            </li>
            <li>
              <Link to="/docs/getting-started">Getting Started</Link>
            </li>
            <li>
              <Link to="/docs/api">API Reference</Link>
              <ul>
                <li>
                  <Link to="/docs/api/router">Router</Link>
                </li>
                <li>
                  <Link to="/docs/api/hooks">Hooks</Link>
                </li>
                <li>
                  <Link to="/docs/api/components">Components</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to="/docs/guides">Guides</Link>
            </li>
          </ul>
        </nav>
      </aside>

      <main className="docs-content">
        {/* Breadcrumbs */}
        <nav className="breadcrumbs">
          {doc.breadcrumbs.map((crumb, index) => (
            <span key={index}>
              {index > 0 && " / "}
              <Link to={crumb.href}>{crumb.label}</Link>
            </span>
          ))}
        </nav>

        {/* Main Content */}
        <article>
          <h1>{doc.title}</h1>
          <div
            className="prose"
            dangerouslySetInnerHTML={{ __html: doc.content }}
          />
        </article>

        {/* Table of Contents */}
        <aside className="toc">
          <h4>On This Page</h4>
          <nav>
            {doc.tableOfContents.map((item) => (
              <a
                key={item.id}
                to={`#${item.id}`}
                style={{ paddingLeft: `${(item.level - 1) * 12}px` }}
              >
                {item.title}
              </a>
            ))}
          </nav>
        </aside>
      </main>
    </div>
  );
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="docs-layout">
      <header className="docs-header">
        <Link to="/" className="logo">
          react-fs-router
        </Link>
        <nav>
          <Link to="/docs">Docs</Link>
          <Link to="/examples">Examples</Link>
          <Link to="https://github.com">GitHub</Link>
        </nav>
      </header>
      {children}
    </div>
  );
}

export function Loading() {
  return (
    <div className="docs-loading">
      <div className="skeleton-sidebar"></div>
      <div className="skeleton-content"></div>
    </div>
  );
}
