import React, { useEffect, useState } from "react";
import Router from "next/router";
import { useLazyQuery, useQuery } from "@apollo/client";
import { GET_OWNER } from "@/gql/owner.gql";
import { GET_USER } from "@/gql/user.gql";

import Layout from "@/containers/layout";
import User from "@/containers/owner/user";

const index = () => {
  const id = Router?.router?.query?.index;

  const [Owner, { data }] = useLazyQuery(GET_OWNER);
  const { data: dataUser, refetch } = useQuery(GET_USER, {
    variables: { ownerId: parseInt(id) },
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
