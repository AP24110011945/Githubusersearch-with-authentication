import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register({ goToLogin }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    const handleregister = async () => {
        const res = await fetch("https://githubusersearch-with-authentication.onrender.com/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email, password }),
        });

        const data = await res.json();



        if (data.message === "User registered successfully") {
            setSuccess("Registered Successfully");

            setTimeout(() => {
                 goToLogin();
                
            }, 2000);
            navigate("/");
        } else {
            setError(data.message);
        }
    }
    return (
        <div className="container">
            <div className="card">
                <h2>Register</h2>
            {success && (
                <p style={{ color: "green" }}>
                    {success}
                </p>
            )}
            {error && (
                <p style={{ color: "red" }}>
                    {error}
                </p>
            )}
            <div><input
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            /></div>
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
                console.log("REGISTER BUTTON CLICKED");
                handleregister();
            }}>
                Register
            </button>
            </div> 
        </div>
    );

};