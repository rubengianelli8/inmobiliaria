import React from "react";

const Button = ({ type, label }) => {
  return (
    <button
      type={type}
      className="p-4 text-16 font-bold bg-blue-500 text-white rounded shadow-box"
    >
      {label}
    </button>
  );
};

export default Button;
