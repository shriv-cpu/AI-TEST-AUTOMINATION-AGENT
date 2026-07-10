"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { UserDetailContext } from "./context/UserDetailContext";

function Provider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [userDetail, setUserDetail] = useState<any>(null);

  useEffect(() => {
    CreateNewUser();
  }, []);

  const CreateNewUser = async () => {
    const result = await axios.post("/api/users", {});
    console.log("Result", result);
    setUserDetail(result.data?.user);
  };

  return (
    <UserDetailContext.Provider
      value={{ userDetail, setUserDetail }}
    >
      {children}
    </UserDetailContext.Provider>
  );
}

export default Provider;