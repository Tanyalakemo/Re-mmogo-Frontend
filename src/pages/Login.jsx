import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (username && password) {
      navigate("/dashboard");
    } else {
      alert("Please fill in all fields");
    }
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

        <h2 style={{ 
          marginBottom: "20px", 
          color: "#1d4ed8" 
        }}>
          Welcome! Please log in
        </h2>

        
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "12px",
            borderRadius: "10px",
            border: "1px solid #cbd5f5",
            outline: "none"
          }}
          onFocus={(e) => e.target.style.border = "1px solid #3b82f6"}
          onBlur={(e) => e.target.style.border = "1px solid #cbd5f5"}
        />

        
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "20px",
            borderRadius: "10px",
            border: "1px solid #cbd5f5",
            outline: "none"
          }}
          onFocus={(e) => e.target.style.border = "1px solid #3b82f6"}
          onBlur={(e) => e.target.style.border = "1px solid #cbd5f5"}
        />

        
        <button
          onClick={handleLogin}
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
            transition: "0.3s"
          }}
          onMouseOver={(e) => e.target.style.background = "#2563eb"}
          onMouseOut={(e) => e.target.style.background = "#3b82f6"}
        >
          Login
        </button>

        
        <button
          onClick={() => navigate("/")}
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
          ← Back to Home
        </button>

      </div>

    </div>
  );
}

export default Login;