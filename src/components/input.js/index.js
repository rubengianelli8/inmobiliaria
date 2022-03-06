import React from "react";

const Input = ({ type, label, name, placeholder, onChange }) => {
  return (
    <div className="flex flex-col w-full">
      <label className="relative w-full focus:border-blue-400 z-10">
        <span className="absolute -top-3 left-2 bg-white text-14 font-bold pl-1 pr-3 rounded text-blue-300">
          {label}
        </span>
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          className={
            "border-blue-300 border w-full py-4 px-4 focus:outline-none focus:ring focus:ring-blue-300 focus:mb-1"
          }
          onChange={onChange}
        ></input>
      </label>
    </div>
  );
};

export default Input;
