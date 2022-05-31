import React from "react";

const Button = ({ type = "submit", label, classPlus, bgColor, action }) => {
  return (
    <button
      type={type}
      className={`uppercase p-4 text-12 sm:text-16 font-bold ${bgColor} text-white rounded shadow-box ${classPlus}`}
      onClick={() => {
        action && action();
      }}
    >
      {label}
    </button>
  );
};

export default Button;
