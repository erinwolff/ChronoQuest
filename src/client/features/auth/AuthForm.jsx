import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginMutation, useRegisterMutation } from "./authSlice";

/** This form allows users to register or log in. */
export default function AuthForm() {
  const navigate = useNavigate();

  // Handles swapping between login and register
  const [isLogin, setIsLogin] = useState(true);
  const authAction = isLogin ? "Login" : "Register";
  const altCopy = isLogin
    ? "Need an account? Register here."
    : "Already have an account? Login here.";

  // Controlled form fields
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Form submission
  const [login, { isLoading: loginLoading, error: loginError }] =
    useLoginMutation();
  const [register, { isLoading: registerLoading, error: registerError }] =
    useRegisterMutation();

  /** Send the requested authentication action to the API */
  const attemptAuth = async (evt) => {
    evt.preventDefault();

    const authMethod = isLogin ? login : register;
    const credentials = { username, password };

    // We don't want to navigate if there's an error.
    // `unwrap` will throw an error if there is one
    // so we can use a try/catch to handle it.
    try {
      await authMethod(credentials).unwrap();
      navigate("/profile");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="authForm">
      <h1>{authAction}</h1>
      <form onSubmit={attemptAuth}>
        <label>
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
          />
        </label>
        <br />
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
        </label>
        <br />
        <button>{authAction}</button>
      </form>
      <a onClick={() => setIsLogin(!isLogin)}>{altCopy}</a>
      <br />
      <h5>What is included in a membership?</h5>
      <h6>
        Share your playtime data with the world.
        <br />
        Write reviews for those games you love (or hate).
        <br />
        All at no cost &#128516;
      </h6>

      {(loginLoading || registerLoading) && <p>Please wait...</p>}
      {loginError && <p role="alert">{loginError}</p>}
      {registerError && <p role="alert">{registerError}</p>}
    </div>
  );
}
