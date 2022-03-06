import React from "react";
import AddOwner from "./addOwner";

const Owner = ({ path }) => {
  console.log("asdas", path);
  return (
    <>
      <div className="w-screen">{path === "addOwner" && <AddOwner />}</div>
    </>
  );
};

export default Owner;
