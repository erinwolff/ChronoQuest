import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useInitiatePasswordResetMutation, useLoginMutation, useRegisterMutation, useCompletePasswordResetMutation } from "./authSlice";

/** This form allows users to register, log in, or reset their password. */
export default function AuthForm() {
  const navigate = useNavigate();

  // Handles swapping between login, registration, and password reset forms
  const [isReset, setIsReset] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [showNewPasswordForm, setShowNewPasswordForm] = useState(false);

  // Controlled form fields
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [resetSuccess, setResetSuccess] = useState(null);
  const [newPassword, setNewPassword] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [resetRequested, setResetRequested] = useState(false);

  // Form submission
  const [login, { isLoading: loginLoading, error: loginError }] = useLoginMutation();
  const [register, { isLoading: registerLoading, error: registerError }] = useRegisterMutation();
  const [requestPasswordReset, { isLoading: resetLoading, error: resetError }] = useInitiatePasswordResetMutation();
  const [completePasswordReset, { isLoading: resetCompleteLoading, error: resetCompleteError, reset }] = useCompletePasswordResetMutation();


  /** Send the requested authentication action to the API */
  const attemptAuth = async (evt) => {
    evt.preventDefault();

    const authMethod = isLogin ? login : register;
    const credentials = { username, password, email };

    try {
      await authMethod(credentials).unwrap();
      navigate("/profile");
    } catch (err) {
      console.error(err);
    }
  };

  /** Handle password reset request */
  const handlePasswordReset = async (evt) => {
    evt.preventDefault();
    try {
      await requestPasswordReset(username).unwrap();
      setResetSuccess('Password reset email has been sent!'); // Set success message
      setResetRequested(true);
      setShowNewPasswordForm(true);
    } catch (err) {
      console.error(err);
      setResetSuccess(null); // Clear success message if there was an error
    }
  };

  /** Finalize password reset */
  const handleCompletePasswordReset = async (evt) => {
    evt.preventDefault();
    try {
      await completePasswordReset({ token: resetToken, password: newPassword }).unwrap();
      setIsReset(false);
      setResetSuccess('Your password has been successfully updated!');
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };


  return (
    <div className="authForm">
      {/* Login/Register form */}
      {!isReset && (
        <form onSubmit={isLogin ? attemptAuth : attemptAuth}>
          <h1>{isLogin ? "LOGIN" : "REGISTER"}</h1>
          <br/>
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
          <br/>
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
          {!isLogin && (
            <>
            <br/>
              <label>
                Email<br />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                />
              </label>
            </>
          )}
          <button className="small-button-53" role="button">{isLogin ? "LOGIN" : "REGISTER"}</button>
        </form>
      )}

      {/* Forgot Password Link */}
      {!isReset && isLogin && (
        <a onClick={() => {
          setIsReset(true);
          setResetRequested(false);
        }}>Forgot my password!</a>
      )}

      {/* Registration Link */}
      {!isReset && (
        <a onClick={() => setIsLogin(!isLogin)}>{isLogin ? "Need an account? Register here." : "Already have an account? Login here."}</a>
      )}

      {/* Request Reset Form */}
      {isReset && !resetRequested && (
        <>
          <h1>PASSWORD RESET</h1>
          <form onSubmit={handlePasswordReset}>
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
            <button className="small-button-53" role="button" disabled={resetLoading}>RESET</button>
          </form>
        </>
      )}

      {/* New Password Form */}
      {showNewPasswordForm && isReset && resetRequested && (
        <>
          <p>Please check the email associated <br />with this account for your password reset token.</p>
          <form onSubmit={handleCompletePasswordReset}>
            <label>
              Reset Token <br />
              <input
                type="text"
                value={resetToken}
                onChange={(e) => setResetToken(e.target.value)}
                autoComplete="off"
              />
            </label>
            <br />
            <label>
              New Password <br />
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                autoComplete="new-password"
              />
            </label>
            <br />
            <button className="small-button-53" role="button" disabled={resetCompleteLoading}>COMPLETE RESET</button>
          </form>
        </>
      )}

      {/* Back to Login Link */}
      {isReset && (
        <a onClick={() => {
          setIsReset(false);
          reset();
        }}>Return to login</a>
      )}

      {/* Error & Success Message handling */}
      {(loginLoading || registerLoading || resetLoading) && <p>Please wait...</p>}
      {loginError && <p role="alert">{loginError}</p>}
      {registerError && <p role="alert">{registerError}</p>}
      {isReset && resetSuccess && <p role="alert">{resetSuccess.message}</p>}
      {isReset && resetError && <p role="alert">{resetError.data.message}</p>}
      {isReset && resetCompleteError && <p role="alert">{resetCompleteError.data}</p>}


      <h5>Join the community:</h5>
      <h6>
        Showcase your playtime stats for the world to see.
        <br />
        Write reviews for those games you love (or hate).
        <br />
        Kickstart conversations on the forum & connect with fellow gamers.
        <br />
        🎮 Best of all, it's completely free! 🎮
      </h6>
    </div>
  );
}