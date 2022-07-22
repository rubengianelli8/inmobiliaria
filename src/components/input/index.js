import React from "react";
import { GoTriangleUp } from "react-icons/go";

const Input = ({
  type,
  label,
  name,
  placeholder,
  register,
  error,
  classPlus,
}) => {
  return (
    <div className="flex flex-col w-full">
      <label className="relative w-full focus:border-primary z-10">
        <span className="absolute -top-3 left-2 bg-white text-14 font-bold pl-1 pr-3 rounded text-secondary">
          {label}
        </span>
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          className={
            "border-secondary border w-full py-4 px-4 focus:outline-none focus:ring focus:ring-primary focus:mb-1 " +
            classPlus
          }
          {...register(name)}
        ></input>
      </label>
      {error && (
        <div className="mt-2 z-20 font-roboto text-left w-9/16 ml-1 font-regular text-12 text-white flex relative justify-items-start">
          <span className="bg-red-600 inline-block z-20 w-auto p-1">
            {error.message}
          </span>
          <GoTriangleUp
            size={"30px"}
            className="absolute -top-4 z-5 text-red-600"
          />
        </div>
      )}
    </div>
  );
};

export default Input;
