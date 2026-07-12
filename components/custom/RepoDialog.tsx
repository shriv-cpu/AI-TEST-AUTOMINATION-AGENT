import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import axios from "axios";

type Repo = {
  id: number;
  name: string;
  full_name: string;
  private: boolean;
  html_url: string;
  description: string;
  language: string;
  updated_at: string;
  default_branch: string;
  owner: string;
};

export const RepoDialog = () => {
  const [repoList, setRepoList] = useState<Repo[]>([]);

  useEffect(() => {
    GetRepoList();
  }, []);

  const GetRepoList = async () => {
    const result = await axios.get("/api/github/repos");
    console.log(result.data);
    setRepoList(result.data);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-medium transition">
          + Add Repo
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[430px] rounded-xl p-6">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Add Repository
          </DialogTitle>

          <DialogDescription className="text-gray-500 mt-1">
            Search and select one of your github repositories
          </DialogDescription>
        </DialogHeader>

        <div>
          <ul className="max-h-60 overflow-y-auto border rounded-xl">
            {repoList.map((repo) => (
              <li key={repo.id} className="p-4 border-b">
                {repo.full_name}
              </li>
            ))}
          </ul>
        </div>

        <DialogFooter>
          <DialogClose>Cancel</DialogClose>
          <Button>Add</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};