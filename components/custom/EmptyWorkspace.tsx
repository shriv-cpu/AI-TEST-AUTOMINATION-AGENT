"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import React from "react";
import Image from "next/image";

const EmptyWorkspace = () => {
  return (
    <div className='flex items-center justify-center flex-col gap-2 mt-8'>
      <Image
        src="/folders.png"
        alt="folder"
        width={70}
        height={70} 
      />
      <h2 className="text-2xl font-bold">No Repo Connected</h2>
      <p className="text-gray-500">connect your github account and add a repo to run test cases</p>
      <Button className="bg-black text-white hover:bg-gray-800">
  <Link href="/api/github" className="text-white hover:text-gray-300">Connect Github</Link>
</Button>
    </div>
  );
};

export default EmptyWorkspace;