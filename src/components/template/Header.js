import React from "react";

//Asset
import Logo from "../../assets/PNG/Logo.png";

function Header() {
  return (
    <div className="flex bg-primary-color items-center justify-between text-white p-3">
      <img src={Logo} alt="logo" className="h-auto w-32"/>
      <div className="flex justify-end items-center grow gap-2">
        <i className="fa-solid fa-magnifying-glass"></i>
        <span>logout</span>
      </div>
    </div>
  );
}

export default Header;
