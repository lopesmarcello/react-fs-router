import { useState, useEffect } from "react";
import { useParams, Link, Outlet } from "react-router-dom";

interface User {
  id: string;
  username: string;
  email: string;
  avatar: string;
  bio: string;
  followers: number;
  following: number;
  postsCount: number;
}

export default function UserProfile() {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    fetch(`/api/users/${id}`)
      .then((res) => res.json())
      .then(setUser);
  }, [id]);

  if (!user) return null;

  return (
    <div className="user-profile">
      <div className="profile-header">
        <img src={user.avatar} alt={user.username} className="avatar" />
        <div className="profile-info">
          <h1>{user.username}</h1>
          <p className="bio">{user.bio}</p>

          <div className="stats">
            <div className="stat">
              <strong>{user.postsCount}</strong>
              <span>Posts</span>
            </div>
            <div className="stat">
              <strong>{user.followers}</strong>
              <span>Followers</span>
            </div>
            <div className="stat">
              <strong>{user.following}</strong>
              <span>Following</span>
            </div>
          </div>
        </div>
      </div>

      <nav className="profile-nav">
        <Link to={`/user/${id}`}>Posts</Link>
        <Link to={`/user/${id}/about`}>About</Link>
        <Link to={`/user/${id}/settings`}>Settings</Link>
      </nav>

      <div className="profile-content">
        <Outlet /> {/* Nested routes render here */}
      </div>
    </div>
  );
}

export function Layout({ children }: { children: React.ReactNode }) {
  return <div className="user-layout">{children}</div>;
}

export function Loading() {
  return (
    <div className="user-profile-loading">
      <div className="skeleton skeleton-avatar"></div>
      <div className="skeleton skeleton-text"></div>
      <div className="skeleton skeleton-stats"></div>
    </div>
  );
}
