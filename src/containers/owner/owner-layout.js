import React from "react";
import AsideNavigation from "./aside-navigation";

const OwnerLayout = ({ children }) => {
  return (
    <div className="grid grid-cols-12">
      <AsideNavigation />
      <div className="col-start-1 col-end-13 md:col-start-4 lg:col-start-3">
        {children}
      </div>
    </div>
  );
};

export default OwnerLayout;
