import "./App.css";
import { useState } from "react";
import Login from "./Login";
import Profile from "./Profile";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Navigate
} from "react-router-dom";

function Home() {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  function searchUser() {
    if (!username) return;

    setLoading(true);
    setUser(null);

    fetch(`https://api.github.com/users/${username}`)
      .then(res => res.json())
      .then(data => {
        setUser(data);
        setLoading(false);
      });
  }

  return (
    <div>
      <h1>GitHub User Search</h1>

      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter username"
      />

      <button onClick={searchUser}>
        Search
      </button>

      {loading && <p>Loading...</p>}

      {user && (
        <div>
          <img src={user.avatar_url} width="150" />
          <h2>{user.name}</h2>
          <p >Followers: {user.followers}</p>
          <p>Following: {user.following}</p>
          <p>Repos: {user.public_repos}</p>
        </div>
      )}
    </div>
  );
}

function About() {
  return (
    <div>
      <h1>About</h1>

      <p>
        This is a GitHub User Search App built with React.
      </p>

      <p>
        Users can search for GitHub profiles and view
        information such as name, username, followers,
        following, and public repositories.
      </p>

      <h3>Technologies Used</h3>

      <ul>
        <li>React</li>
        <li>useState</li>
        <li>Fetch API</li>
        <li>React Router</li>
      </ul>
    </div>
  );
}



function App() {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [showRegister, setShowRegister] = useState(false);
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };



  return (
    <BrowserRouter>
      <nav>
        <Link to="/profile">Profile</Link>{" | "}
        <Link to="/home">Home</Link>{" | "}
        <Link to="/about">About</Link>{" | "}

        {token && (
          <button onClick={logout}>Logout</button>
        )}
      </nav>

      <hr />

      <Routes>


        <Route
          path="/profile"
          element={
            token ? <Profile /> : <Navigate to="/" />
          }
        />
        <Route
          path="/"
          element={
            token ? (
              <Navigate to="/home" />
            ) : (
              <Login setToken={setToken} />
            )
          }
        />

        <Route
          path="/home"
          element={
            token ? <Home /> : <Navigate to="/" />
          }
        />

        <Route path="/about" element={<About />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;