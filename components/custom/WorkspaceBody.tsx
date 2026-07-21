"use client";

import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

import { UserDetailContext } from "@/app/context/UserDetailContext";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import EmptyWorkspace from "./EmptyWorkspace";
import { RepoDialog } from "./RepoDialog";
import UserRepoList, { type UserRepo } from "./UserRepoList";

function WorkspaceBody() {
  const { userDetail } = useContext(UserDetailContext);
  const [token, setToken] = useState<string | null>(null);
  const [userRepoList, setUserRepoList] = useState<UserRepo[]>([]);

  useEffect(() => {
    fetchGithubUserToken();
  }, []);

  useEffect(() => {
    if (userDetail?.id) {
      fetchUserAddedRepoList();
    }
  }, [userDetail]);

  const fetchGithubUserToken = async () => {
    try {
      const result = await axios.get("/api/github/token");
      setToken(result.data.token ?? null);
    } catch (error) {
      console.error(error);
      setToken(null);
    }
  };

  const fetchUserAddedRepoList = async () => {
    if (!userDetail?.id) {
      return;
    }

    try {
      const result = await axios.get(`/api/user-repo?userId=${userDetail.id}`);
      setUserRepoList(result.data);
    } catch (error) {
      console.error(error);
      setUserRepoList([]);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h4 className="text-4xl font-medium">Workspace</h4>

        <h2 className="rounded-lg bg-blue-100 px-2 text-blue-800">
          Remaining Credits: 1000
        </h2>
      </div>

      {token ? (
        <Card className="mt-5 flex items-center justify-between rounded-lg border p-4">
          <Image
            src="/github.png"
            alt="GitHub"
            width={40}
            height={40}
          />

          <h2 className="text-lg">Connect GitHub & Add Repository</h2>

          <RepoDialog onRepoAdded={fetchUserAddedRepoList} />
        </Card>
      ) : (
        <Card className="mt-5 flex items-center justify-between rounded-lg border p-4">
          <Image
            src="/github.png"
            alt="GitHub"
            width={40}
            height={40}
          />

          <h2 className="text-lg">Connect GitHub to continue</h2>

          <Button asChild className="bg-black text-white hover:bg-gray-800">
            <Link href="/api/github">Connect GitHub</Link>
          </Button>
        </Card>
      )}

      <Card className="mt-10">
        <CardContent className="p-6">
          {userRepoList.length === 0 ? (
            <EmptyWorkspace isGithubConnected={Boolean(token)} />
          ) : (
            <UserRepoList repos={userRepoList} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default WorkspaceBody;
