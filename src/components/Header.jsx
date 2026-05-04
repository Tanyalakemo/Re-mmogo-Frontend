import React from "react";
import { NavLink } from "react-router-dom";

function Header() {
  return (
    <header>
      <div className="header-inner">
        <h1>
          <span className="brand-highlight">Re-Mmogo</span> WebApp
        </h1>
        <nav>
          <NavLink to="/dashboard">Dashboard</NavLink>
          <NavLink to="/groups">Groups</NavLink>
          <NavLink to="/members">Members</NavLink>
          <NavLink to="/contributions">Contributions</NavLink>
          <NavLink to="/loans">Loans</NavLink>
          <NavLink to="/approvals">Approvals</NavLink>
          <NavLink to="/reports">Reports</NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Header;