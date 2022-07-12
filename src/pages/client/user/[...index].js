import React, { useEffect, useState } from "react";
import Router from "next/router";
import { useLazyQuery, useQuery } from "@apollo/client";

import { GET_USER } from "@/gql/user.gql";

import Layout from "@/containers/layout";
import User from "@/containers/client/user";

const index = () => {
  const id = Router?.router?.query?.index;

  const { data: dataUser, refetch } = useQuery(GET_USER, {
    variables: { clientId: parseInt(id) },
  });

  const [user, setUser] = useState({});
  useEffect(() => {
    if (dataUser?.getUser) {
      setUser(dataUser?.getUser);
    }
  }, [dataUser]);

  useEffect(() => {
    refetch();
  }, []);

  return (
    <Layout>
      <User user={user} />
    </Layout>
  );
};

export default index;
