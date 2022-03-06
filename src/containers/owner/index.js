import React from "react";
import AddOwner from "./addOwner";

const Owner = ({ path }) => {
  return (
    <>
      <div>{path === "addOwner" && <AddOwner />}</div>
    </>
  );
};

export default Owner;
