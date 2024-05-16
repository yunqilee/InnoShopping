import {useState} from "react";
import {Link} from "react-router-dom";
import "./auth.css"

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

    const handleSubmit = (e) => {
        e.preventDefault();
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