import { useParams, } from "react-router-dom";

export default function UserSettings() {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="user-settings">
      <h2>Account {id} Settings</h2>

      <form>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            placeholder="Enter username"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Enter email"
          />
        </div>

        <div className="form-group">
          <label htmlFor="bio">Bio</label>
          <textarea
            id="bio"
            placeholder="Tell us about yourself"
            rows={4}
          />
        </div>

        <div className="form-actions">
          <button type="submit">Save Changes</button>
        </div>
      </form>
    </div>
  );
}
