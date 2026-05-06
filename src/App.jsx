import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage   from "./pages/LandingPage";
import Login         from "./pages/Login";
import Layout        from "./components/Layout.jsx";
import Dashboard     from "./pages/Dashboard.jsx";
import Groups        from "./pages/Groups.jsx";
import Members       from "./pages/Members.jsx";
import AddMember     from "./pages/AddMember.jsx";
import RegisterGroup from "./pages/RegisterGroup.jsx";
import Contributions from "./pages/Contributions.jsx";
import Loans         from "./pages/Loans.jsx";
import Approvals     from "./pages/Approvals.jsx";
import Reports       from "./pages/Reports.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/"      element={<LandingPage />} />
        <Route path="/login" element={<Login />} />

        <Route path="/dashboard"      element={<Layout><Dashboard /></Layout>} />
        <Route path="/groups"         element={<Layout><Groups /></Layout>} />
        <Route path="/groups/new"     element={<Layout><RegisterGroup /></Layout>} />
        <Route path="/register-group" element={<Layout><RegisterGroup /></Layout>} />
        <Route path="/members"        element={<Layout><Members /></Layout>} />
        <Route path="/members/add"    element={<Layout><AddMember /></Layout>} />
        <Route path="/contributions"  element={<Layout><Contributions /></Layout>} />
        <Route path="/loans"          element={<Layout><Loans /></Layout>} />
        <Route path="/approvals"      element={<Layout><Approvals /></Layout>} />
        <Route path="/reports"        element={<Layout><Reports /></Layout>} />
      </Routes>
    </Router>
  );
}

export default App;