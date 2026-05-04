import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div style={{
      height: "100vh",
      background: "linear-gradient(135deg, #0f172a, #1e3a8a, #3b82f6)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center", 
      alignItems: "center",
      textAlign: "center",
      color: "white"
    }}>

      
      <h1 style={{
        fontSize: "80px",
        marginBottom: "10px",
        fontWeight: "bold",
        color: "#60a5fa" 
      }}>
        Re Mmogo 
      </h1>

      
      <p style={{
        fontSize: "20px",
        fontStyle: "italic",
        marginBottom: "30px",
        maxWidth: "420px",
        color: "#e0f2fe"
      }}>
        Save together, grow together, and manage your money in style.
      </p>

      
      <div style={{ display: "flex", gap: "20px" }}>

        
        <button
  onClick={() => navigate("/login")}
  style={{
    padding: "14px 28px",
    background: "#2563eb",
    border: "none",
    color: "white",
    borderRadius: "25px",
    cursor: "pointer",
    fontWeight: "bold",
    boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
    transition: "0.3s"
  }}
  onMouseOver={(e) => e.target.style.background = "#1d4ed8"}
  onMouseOut={(e) => e.target.style.background = "#2563eb"}
>
  Login
</button>

        
        <button
          onClick={() => navigate("/register-group")}
          style={{
            padding: "14px 28px",
            background: "#2563eb",
            border: "none",
            color: "white",
            borderRadius: "25px",
            cursor: "pointer",
            fontWeight: "bold",
            boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
            transition: "0.3s"
          }}
          onMouseOver={(e) => e.target.style.background = "#1d4ed8"}
          onMouseOut={(e) => e.target.style.background = "#2563eb"}
        >
          Register
        </button>

      </div>

    </div>
  );
}

export default LandingPage;