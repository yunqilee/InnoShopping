import {useState} from "react";
import axios from "axios";
import {UserErrors} from "../models/errors";
import "./auth.css"

export const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:3001/user/register", {
                username,
                password,
            });
            alert("Register successfully!");
        } catch (err) {
            if (err.response.data.type === UserErrors.USERNAME_ALREADY_EXISTS) {
                alert("User already exists!");
            } else {
                alert("Something went wrong!");
            }
        }
    }
    return (
        <div className="auth">
            <div className="auth-container">
                <form onSubmit={handleSubmit}>
                    <h2>Register</h2>
                    <div className="form-group">
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="button-container">
                        <button className="auth-button" type="submit">Register</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
