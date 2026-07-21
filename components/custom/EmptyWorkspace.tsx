"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

type EmptyWorkspaceProps = {
  isGithubConnected: boolean;
};

const EmptyWorkspace = ({ isGithubConnected }: EmptyWorkspaceProps) => {
  return (
    <div className="mt-8 flex flex-col items-center justify-center gap-2 text-center">
      <Image
        src="/folders.png"
        alt="folder"
        width={70}
        height={70}
      />

      <h2 className="text-2xl font-bold">No Repo Connected</h2>

      {isGithubConnected ? (
        <p className="text-gray-500">
          Click <strong>+ Add Repo</strong> above to add your first repository.
        </p>
      ) : (
        <>
          <p className="max-w-md text-gray-500">
            Connect your GitHub account and add a repository to run test cases.
          </p>

          <Button asChild className="bg-black text-white hover:bg-gray-800">
            <Link href="/api/github">Connect GitHub</Link>
          </Button>
        </>
      )}
    </div>
  );
};

export default EmptyWorkspace;
