
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Register from "./Register";

export default function Login({ setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showRegister, setShowRegister] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    const res = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();



    if (data.token) {
      localStorage.setItem("token", data.token);
      setToken(data.token);
      navigate("/home");   // 🔥 THIS updates App.jsx UI
    } else {
      setError(data.message);
    }

  };

  return (
    <>{
      showRegister ? (
        <Register
          goToLogin={() => setShowRegister(false)}
        />
      ) :

        <div className="container">

          <div className="card">



            {error && (

              <p style={{ color: "red" }}>

                {error}

              </p>

            )}

            <h3>new user? <button onClick={() => setShowRegister(true)}>

              Register

            </button></h3>

            <h2>Login</h2>



            <div><input

              placeholder="Email"

              value={email}

              onChange={(e) => setEmail(e.target.value)}

            /></div>



            <div><input

              type="password"

              placeholder="Password"

              value={password}

              onChange={(e) => setPassword(e.target.value)}

            /></div>



            <button onClick={() => {

              console.log("LOGIN BUTTON CLICKED");

              handleLogin();

            }}>

              Login

            </button>



          </div>

        </div>



    }
    </>

  );
}