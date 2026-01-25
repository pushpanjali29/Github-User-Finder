import { useState } from "react";
import "./App.css";

function App() {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!username.trim()) {
      setError("Please enter a GitHub username.");
      setUser(null);
      return;
    }

    setError("");

    try {
      const res = await fetch(`https://api.github.com/users/${username}`);
      if (!res.ok) {
        throw new Error("User not found");
      }
      const data = await res.json();
      setUser(data);
    } catch (err) {
      setError("No user yet. Try searching for 'octocat'.");
      setUser(null);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h1>GitHub User Finder</h1>
        <p>Search a GitHub username to see profile details.</p>

        <div className="search-box">
          <input
            type="text"
            name="username"
            placeholder="e.g. torvalds, gaearon, octocat"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />
          <button onClick={handleSearch}>Search</button>
        </div>

        {error && <div className="error">{error}</div>}

        {user && (
          <div className="user-card">
            <img src={user.avatar_url} alt={user.login} />
            <div>
              <h2>
                {user.name || user.login}{" "}
                <span>@{user.login}</span>
              </h2>

              <div className="stats">
                <span>{user.public_repos} Repos</span>
                <span>{user.followers} Followers</span>
                <span>{user.following} Following</span>
              </div>

              <div className="links">
                {user.location && <span>📍 {user.location}</span>}
                {user.company && <span>🏢 {user.company}</span>}
                {user.blog && (
                  <a href={user.blog} target="_blank" rel="noreferrer">
  {user.blog}
</a>
                )}
                <a href={user.html_url} target="_blank" rel="noreferrer">
  View on GitHub
</a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
