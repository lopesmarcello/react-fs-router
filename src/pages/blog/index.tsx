import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

interface BlogPostPreview {
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  publishedAt: string;
  coverImage?: string;
  tags: string[];
}

export default function BlogIndex() {
  const navigate = useNavigate();
  const location = useLocation();
  const [posts, setPosts] = useState<BlogPostPreview[]>([]);
  const [loading, setLoading] = useState(true);

  // Get tag from query params
  const selectedTag = new URLSearchParams(location.search).get("tag");

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const url = selectedTag ? `/api/blog?tag=${selectedTag}` : "/api/blog";
        const response = await fetch(url);
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [selectedTag]);

  return (
    <div className="blog-index">
      <header className="blog-header">
        <h1>Blog</h1>
        {selectedTag && (
          <div className="filter-info">
            <span>Filtered by: #{selectedTag}</span>
            <button onClick={() => navigate("/blog")}>Clear Filter</button>
          </div>
        )}
      </header>

      {loading ? (
        <div className="posts-loading">Loading posts...</div>
      ) : (
        <div className="posts-grid">
          {posts.map((post) => (
            <article key={post.slug} className="post-card">
              {post.coverImage && (
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="post-thumbnail"
                />
              )}

              <div className="post-card-content">
                <h2>
                  <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                </h2>

                <p className="post-excerpt">{post.excerpt}</p>

                <div className="post-card-meta">
                  <span>{post.author}</span>
                  <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                </div>

                <div className="post-card-tags">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="tag"
                      onClick={() => navigate(`/blog?tag=${tag}`)}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
