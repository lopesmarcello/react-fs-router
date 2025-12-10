import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  content: string;
  author: string;
  publishedAt: string;
  tags: string[];
  coverImage?: string;
}

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/blog/${slug}`);
        if (!response.ok) {
          throw new Error("Post not found");
        }
        const data = await response.json();
        setPost(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load post");
      }
    };

    fetchPost();
  }, [slug]);

  if (error) {
    return (
      <div className="error-container">
        <h1>Error</h1>
        <p>{error}</p>
        <button onClick={() => navigate("/blog")}>Back to Blog</button>
      </div>
    );
  }

  if (!post) {
    return null; // Loading component will show
  }

  return (
    <article className="blog-post">
      <header className="post-header">
        <Link to="/blog" className="back-link">
          ← Back to Blog
        </Link>

        {post.coverImage && (
          <img src={post.coverImage} alt={post.title} className="cover-image" />
        )}

        <h1>{post.title}</h1>

        <div className="post-meta">
          <span className="author">By {post.author}</span>
          <span className="date">
            {new Date(post.publishedAt).toLocaleDateString()}
          </span>
        </div>

        <div className="tags">
          {post.tags.map((tag) => (
            <Link key={tag} to={`/blog?tag=${tag}`} className="tag">
              #{tag}
            </Link>
          ))}
        </div>
      </header>

      <div
        className="post-content"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      <footer className="post-footer">
        <button onClick={() => navigate(-1)}>← Previous Page</button>
        <button onClick={() => navigate("/blog")}>View All Posts</button>
      </footer>
    </article>
  );
}

// Layout for blog posts
export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="blog-layout">
      <nav className="blog-nav">
        <Link to="/">Home</Link>
        <Link to="/blog">All Posts</Link>
        <Link to="/blog/categories">Categories</Link>
      </nav>
      <main className="blog-main">{children}</main>
      <aside className="blog-sidebar">
        <h3>Recent Posts</h3>
        {/* Sidebar content */}
      </aside>
    </div>
  );
}

// Loading state
export function Loading() {
  return (
    <div className="blog-post-loading">
      <div className="skeleton skeleton-title"></div>
      <div className="skeleton skeleton-meta"></div>
      <div className="skeleton skeleton-content"></div>
      <div className="skeleton skeleton-content"></div>
      <div className="skeleton skeleton-content"></div>
    </div>
  );
}

// Error boundary
export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <div className="blog-post-error">
      <h1>Oops! Something went wrong</h1>
      <p>{error.message}</p>
      <Link to="/blog">Return to Blog</Link>
    </div>
  );
}
