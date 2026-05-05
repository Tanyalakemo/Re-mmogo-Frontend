import { useNavigate } from "react-router-dom";
import { useState } from "react";
import API from "../Api";

function Login() {
  const navigate = useNavigate();

  const [isCreatingAccount, setIsCreatingAccount] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const inputStyle = {
    width: "100%",
    padding: "12px",
    marginBottom: "12px",
    borderRadius: "10px",
    border: "1px solid #cbd5f5",
    outline: "none",
    boxSizing: "border-box",
  };

  const handleLogin = async () => {
    setServerError("");

    if (!email || !password) {
      setServerError("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      const response = await API.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (error) {
      setServerError(
        error.response?.data?.message || "Invalid email or password."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAccount = async () => {
    setServerError("");

    if (!email || !password || !confirmPassword) {
      setServerError("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      setServerError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      await API.post("/auth/register", {
        email,
        password,
      });

      alert("Account created! Please log in.");
      setIsCreatingAccount(false);
      setPassword("");
      setEmail("");
      setConfirmPassword("");
    } catch (error) {
      setServerError(
        error.response?.data?.message || "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setServerError("");
  };

  return (
    <div style={{
      height: "100vh",
      background: "linear-gradient(135deg, #0f172a, #1e3a8a, #3b82f6)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <div style={{
        background: "white",
        padding: "35px",
        borderRadius: "20px",
        width: "340px",
        boxShadow: "0 10px 25px rgba(0,0,0,0.25)",
        textAlign: "center"
      }}>

        <h2 style={{ marginBottom: "20px", color: "#1d4ed8" }}>
          {isCreatingAccount ? "Create an Account" : "Welcome! Please log in"}
        </h2>

        {serverError && (
          <p style={{ color: "red", marginBottom: "10px", fontSize: "14px" }}>
            {serverError}
          </p>
        )}

        {/* Email - always shown */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
          onFocus={(e) => e.target.style.border = "1px solid #3b82f6"}
          onBlur={(e) => e.target.style.border = "1px solid #cbd5f5"}
        />

        {/* Password - always shown */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ ...inputStyle, marginBottom: isCreatingAccount ? "12px" : "20px" }}
          onFocus={(e) => e.target.style.border = "1px solid #3b82f6"}
          onBlur={(e) => e.target.style.border = "1px solid #cbd5f5"}
        />

        {/* Confirm Password - only when creating account */}
        {isCreatingAccount && (
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={{ ...inputStyle, marginBottom: "20px" }}
            onFocus={(e) => e.target.style.border = "1px solid #3b82f6"}
            onBlur={(e) => e.target.style.border = "1px solid #cbd5f5"}
          />
        )}

        {/* Submit Button */}
        <button
          onClick={isCreatingAccount ? handleCreateAccount : handleLogin}
          disabled={loading}
          style={{
            width: "100%",
            padding: "12px",
            background: "#3b82f6",
            color: "white",
            border: "none",
            borderRadius: "25px",
            cursor: "pointer",
            fontWeight: "bold",
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
            transition: "0.3s",
            opacity: loading ? 0.7 : 1,
          }}
          onMouseOver={(e) => e.target.style.background = "#2563eb"}
          onMouseOut={(e) => e.target.style.background = "#3b82f6"}
        >
          {loading
            ? isCreatingAccount ? "Creating..." : "Logging in..."
            : isCreatingAccount ? "Create Account" : "Login"
          }
        </button>

        {/* Toggle between login and register */}
        <button
          onClick={() => {
            setIsCreatingAccount(!isCreatingAccount);
            resetForm();
          }}
          style={{
            width: "100%",
            marginTop: "12px",
            padding: "10px",
            background: "transparent",
            border: "none",
            color: "#2563eb",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          {isCreatingAccount
            ? "Already have an account? Login"
            : "Don't have an account? Create one"}
        </button>

        <button
          onClick={() => navigate("/")}
          style={{
            width: "100%",
            marginTop: "4px",
            padding: "10px",
            background: "transparent",
            border: "none",
            color: "#2563eb",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          ← Back to Home
        </button>

      </div>
    </div>
  );
}

export default Login;