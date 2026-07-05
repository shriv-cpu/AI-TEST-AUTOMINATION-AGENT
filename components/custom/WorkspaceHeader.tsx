import Image from "next/image";
import React from "react";
import { UserButton } from "@clerk/nextjs";

const WorkspaceHeader = () => {
  return (
    <div className="flex w-full flex-row flex-nowrap items-center justify-between gap-8 border-b border-zinc-200 bg-white px-6 py-3">
      <Image
        src="/logo.svg"
        alt="logo"
        width={120}
        height={40}
        className="h-10 w-auto shrink-0"
      />

      <ul className="flex shrink-0 items-center gap-8 text-xl list-none m-0 p-0">
        <li className="hover:text-blue-600">Workspace</li>
        <li className="hover:text-blue-600">Pricing</li>
        <li className="hover:text-blue-600">Support</li>
      </ul>

      <div className="shrink-0">
        <UserButton />
      </div>
    </div>
  );
};

export default WorkspaceHeader;