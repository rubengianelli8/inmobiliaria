import React from "react";
import AsideNavigation from "./aside-navigation";
import OwnerLayout from "./owner-layout";
import ViewOwners from "./view-owners";

const Owner = () => {
  return (
    <OwnerLayout>
      <ViewOwners />
    </OwnerLayout>
  );
};

export default Owner;
