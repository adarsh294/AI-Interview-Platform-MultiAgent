
import React, { useState } from "react";
import Nav from "../components/Nav";
import Loginmodel from "../components/Loginmodel";

const Home = () => {
  // User actually logged in hai ya nahi
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Login modal open hai ya nahi
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Login button click
  const openLogin = () => {
    setShowLoginModal(true);
  };

  // X click
  const closeLogin = () => {
    setShowLoginModal(false);
  };

  // Google login successful
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setShowLoginModal(false);
  };

  // Logout
  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div className="text-[#0A0A0A] font-sans min-h-screen overflow-x-hidden">

      <Nav
        onopen={isLoggedIn ? handleLogout : openLogin}
        login={isLoggedIn}
      />

      <section className="relative overflow-hidden bg-[#F8F9FA]">

        {showLoginModal && (
          <Loginmodel
            onclose={closeLogin}
            log={handleLoginSuccess}
          />
        )}

      </section>
    </div>
  );
};

export default Home;

