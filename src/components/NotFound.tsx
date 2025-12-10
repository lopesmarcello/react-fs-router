import { Link, useNavigate, useLocation } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="not-found">
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>The page "{location.pathname}" does not exist.</p>
      <div className="actions">
        <button onClick={() => navigate(-1)}>Go Back</button>
        <Link to="/">Go Home</Link>
      </div>
    </div>
  );
}
