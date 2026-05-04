import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Layout from "./components/Layout.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Groups from "./pages/Groups.jsx";
import Members from "./pages/Members.jsx";
import AddMember from "./pages/AddMember.jsx";
import RegisterGroup from "./pages/RegisterGroup.jsx";
import Contributions from "./pages/Contributions.jsx";

function App() {
  return (
    <Router>
      <Routes>
        {/* Pages WITHOUT Layout */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />

        {/* Pages WITH Layout */}
        <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
        <Route path="/groups" element={<Layout><Groups /></Layout>} />
        <Route path="/groups/new" element={<Layout><RegisterGroup /></Layout>} />
        <Route path="/register-group" element={<Layout><RegisterGroup /></Layout>} />
        <Route path="/members" element={<Layout><Members /></Layout>} />
        <Route path="/members/add" element={<Layout><AddMember /></Layout>} />
        <Route path="/contributions" element={<Layout><Contributions /></Layout>} />
      </Routes>
    </Router>
  );
}

export default App;