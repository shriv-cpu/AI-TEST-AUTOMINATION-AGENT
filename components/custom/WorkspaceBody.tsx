"use client"
import Image from "next/image";

import { UserDetailContext } from '@/app/context/UserDetailContext'
import React, { useContext } from 'react'
import { Card, CardContent } from "../ui/card";
import EmptyWorkspace from "./EmptyWorkspace";
import { Router } from "lucide-react";
import { useRouter } from "next/navigation";
import { RepoDialog } from "./RepoDialog";



function WorkspaceBody() {
  const router = useRouter()
  const { userDetail } = useContext(UserDetailContext)

  const onAddRepo = () => {
    window.location.href = '/api/github'
  }


  return (
    <div>
      <div className='flex justify-between items-center'>
        <h4 className='text-4xl font-medium'>worksace</h4>
        <h2 className='text-blue-800 bg-blue-100 px-2 rounded-lg'>Remaining Credits:1000{ }</h2>
      </div>

      <Card className=" mt-5 flex justify-between p-4 border rounded-lg">
        <Image
          src="/github.png"
          alt="GitHub"
          width={40}
          height={40}
        />
        <h2 className="text-lg">connect github & add repo</h2>

        <div><  RepoDialog/></div>
      </Card>
      <Card className=" mt-10">
        <CardContent>
        <EmptyWorkspace/>
        </CardContent>
      </Card>
    </div>

  )
}


export default WorkspaceBody