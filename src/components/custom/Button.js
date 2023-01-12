import React from "react";

function Button({ className, value, onClick, type }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${className} bg-primary-color text-white w-fit p-2 rounded-lg cursor-pointer`}
    >
      {value}
    </button>
  );
}

export default Button;
