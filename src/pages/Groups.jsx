import React from "react";
import { Link } from "react-router-dom";

function Groups() {
  return (
    <>
      <section className="card">
        <div className="card-header">
          <h2>Motshelo Groups</h2>
          <span>Register and manage groups</span>
        </div>
        <p>This page will show all groups and allow you to create a new group.</p>

        {/* This is the button that should navigate to /groups/new */}
        <Link to="/groups/new" className="button-link">
          + Register New Group
        </Link>
      </section>
    </>
  );
}

export default Groups;