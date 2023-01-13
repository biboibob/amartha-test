import React, { useState } from "react";

function Input({ onChange, value, name, label, type, classNameInput }) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="flex flex-col gap-1">
      <label className="text-base font-light text-primary-color">{label}</label>
      <div className="flex w-full relative">
        <input
          className={`${classNameInput && classNameInput} ${type === "password" && "!pr-12"} outline-none border-[.1rem] min-w-[18rem] w-full transition-all duration-500 border-dark-gray-color focus:border-primary-color p-2 rounded-lg text-sm md:text-base`}
          type={type === "password" && showPassword ? "text" : type}
          value={value}
          name={name}
          onChange={(e) => onChange(name, e.target.value)}
        />
        {type === "password"  && (
          <i className={`absolute my-auto inset-y-1/3 right-5 text-primary-color fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"}`} onClick={() => setShowPassword(showPassword ? false : true)}></i>
        )}
      </div>
    </div>
  );
}

export default Input;
