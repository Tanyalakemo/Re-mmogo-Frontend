import { useNavigate } from "react-router-dom";
import { useState } from "react";
import API from "../Api";

function Login() {
  const navigate = useNavigate();

  const [isCreatingAccount, setIsCreatingAccount] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
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

    if (!username || !password) {
      setServerError("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      const response = await API.post("/auth/login", {
        username,
        password,
      });

      // Save token so Api.js can attach it to future requests
      localStorage.setItem("token", response.data.token);

      navigate("/dashboard");
    } catch (error) {
      setServerError(
        error.response?.data?.message || "Invalid username or password."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAccount = async () => {
    setServerError("");

    if (!username || !email || !password || !confirmPassword) {
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
        username,
        email,
        password,
      });

      alert("Account created successfully!");
      setIsCreatingAccount(false);
      setUsername("");
      setPassword("");
      setEmail("");
      setConfirmPassword("");
    } catch (error) {