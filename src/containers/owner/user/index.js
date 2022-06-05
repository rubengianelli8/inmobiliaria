import React from "react";
import UserDashboard from "./user-dashboard";
import OwnerLayout from "@/containers/owner/owner-layout";

const User = ({ user }) => {
  return (
    <OwnerLayout>
      <UserDashboard user={user} />
    </OwnerLayout>
  );
};

export default User;
