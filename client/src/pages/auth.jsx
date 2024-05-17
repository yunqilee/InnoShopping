import {useState} from "react";
import {Link} from "react-router-dom";
import "./auth.css"
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useCookies} from "react-cookie";
import {UserErrors} from "../models/errors";

export const Auth = () => {
    return (
        <div className="auth">
            <Login />
        </div>
    )
}

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [_, setCookies] = useCookies(["access_token"]);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const resp =  await axios.post("http://localhost:3001/user/login", {
                username,
                password,
            });
            setCookies("access_token", resp.data.token);
            localStorage.setItem("userID", resp.data.userID);
            navigate("/")
        } catch (err) {
            let errorMessage = ""
            switch (err.response.data.type) {
                case UserErrors.NO_USER_FOUND:
                    errorMessage = "User does not exist";
                    break
                case UserErrors.WRONG_CREDENTIALS:
                    errorMessage = "Wrong username and password combination"
                    break
                default:
                    errorMessage = "Something went wrong!"
            }
            alert("Error: " + errorMessage)
        }
    }

    return (
        <div className="auth-container">
            <form onSubmit={handleSubmit}>
                <h2>Login</h2>
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
                    <button className="auth-button" type="submit">Login</button>
                </div>
            </form>
            <p className="register-link">
                Don't have an account yet? <Link to="/register">Click here to register.</Link>
            </p>
        </div>
    )
}