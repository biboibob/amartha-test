import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Page Component
import Footer from "./Footer";
import Header from "./Header";

function Layout({ children }) {
  const location = useLocation();

  useEffect(() => {
    var elmnt = document.body;
    elmnt.scrollTop = 0;
    window.scrollTo({ top: 0 });
  }, [location.pathname]);

  return (
    <div className="flex flex-col overflow-y-auto relative bg-soft-gray-2 min-h-screen">
      <Header />
      <main className="flex flex-col container grow bg-soft-gray-2">
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
