import React from "react";
import UserDashboard from "./user-dashboard";
import ClientLayout from "@/containers/client/client-layout";

const User = ({ user }) => {
  return (
    <ClientLayout>
      <UserDashboard user={user} />
    </ClientLayout>
  );
};

export default User;
