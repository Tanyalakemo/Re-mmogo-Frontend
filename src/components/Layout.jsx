import React from "react";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";

function Layout({ children }) {
  return (
    <>
      <Header />
      <main>
        <div className="main-inner">{children}</div>
      </main>
      <Footer />
    </>
  );
}

export default Layout;