import React from "react";
import AsideNavigation from "./aside-navigation";

const OwnerLayout = ({ children }) => {
  return (
    <div className="grid grid-cols-12">
      <AsideNavigation />
      <div className="col-start-1 col-end-13 md:col-start-2 ml-2">
        {children}
      </div>
    </div>
  );
};

export default OwnerLayout;
