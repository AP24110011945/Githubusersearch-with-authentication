import { useState, useEffect } from "react";

export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("https://githubusersearch-with-authentication.onrender.com/profile", {
      headers: {
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
      });
  }, []);

  if (!user) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      <h2>Profile</h2>

      <p>Name: {user.name}</p>

      <p>Email: {user.email}</p>
    </div>
  );
}