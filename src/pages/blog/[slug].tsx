import { useParams, } from "react-router-dom";

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();

  return (
    <article className="blog-post">
      <h1>Slug</h1>
      {slug}
    </article>
  );
}



