import Image from "next/image";
import React from "react";
import { UserButton } from "@clerk/nextjs";

const WorkspaceHeader = () => {
  return (
    <div className="flex w-full flex-nowrap items-center justify-between gap-4 p-4">
      <Image
        src="/logo.svg"
        alt="logo"
        width={120}
        height={40}
        className="h-10 w-auto shrink-0"
      />

      <ul className="flex shrink-0 items-center gap-8 text-xl list-none m-0 p-0">
        <li>Workspace</li>
        <li>Pricing</li>
        <li>Support</li>
      </ul>

      <div className="shrink-0">
        <UserButton />
      </div>
    </div>
  );
};

export default WorkspaceHeader;