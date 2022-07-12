import React from "react";

const Button = ({
  type = "submit",
  label,
  classPlus,
  bgColor,
  action,
  disabled,
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`uppercase p-4 text-12 sm:text-16 font-bold ${bgColor} text-white rounded shadow-box ${classPlus} disabled:opacity-50 disabled:cursor-not-allowed`}
      onClick={() => {
        action && action();
      }}
    >
      {label}
    </button>
  );
};

export default Button;
