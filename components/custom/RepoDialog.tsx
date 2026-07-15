"use client";

import React, { useContext, useEffect, useState } from "react";
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
import { cn } from "@/lib/utils";
import axios from "axios";
import { UserDetailContext } from "@/app/context/UserDetailContext";

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
  owner: {
    login: string;
  };
};

export const RepoDialog = () => {
  const [open, setOpen] = useState(false);
  const [repoList, setRepoList] = useState<Repo[]>([]);
  const [selectedRepo, setSelectedRepo] = useState<Repo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { userDetail } = useContext(UserDetailContext);

  useEffect(() => {
    if (open) {
      getRepoList();
    }
  }, [open]);

  const getRepoList = async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await axios.get<Repo[]>("/api/github/repos");
      setRepoList(result.data);
    } catch {
      setError("Connect your GitHub account first to see repositories.");
      setRepoList([]);
    } finally {
      setLoading(false);
    }
  };

 const SaveRepoToDB = async () => {
  if (!selectedRepo) return;

  const payload = {
    repoId: selectedRepo.id,
    userId: userDetail?.id,
    name: selectedRepo.name,
    full_name: selectedRepo.full_name,
    private: selectedRepo.private,
    html_url: selectedRepo.html_url,
    description: selectedRepo.description,
    language: selectedRepo.language,
    updated_at: selectedRepo.updated_at,
    owner: selectedRepo.owner.login,
  };

  console.log("Payload:", payload);

  try {
    await axios.post("/api/user-repo", payload);
  } catch (err) {
    console.error(err);
  }
};

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);

    if (!isOpen) {
      setSelectedRepo(null);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <button
          type="button"
          className="rounded-md bg-green-600 px-4 py-2 font-medium text-white transition hover:bg-green-700"
        >
          + Add Repo
        </button>
      </DialogTrigger>

      <DialogContent className="gap-6 rounded-xl border-0 p-8 shadow-xl sm:max-w-[480px]">
        <DialogHeader className="space-y-2">
          <DialogTitle className="text-2xl font-bold text-black">
            Add Repository
          </DialogTitle>

          <DialogDescription className="text-base text-gray-500" />
        </DialogHeader>

        <div>
          <input
            className="m-1 w-full rounded border p-2"
            placeholder="Search repo by name"
          />

          {loading ? (
            <p className="py-4 text-gray-500">Loading repositories...</p>
          ) : error ? (
            <p className="py-4 text-gray-500">{error}</p>
          ) : (
            <ul className="max-h-64 space-y-1 overflow-y-auto">
              {repoList.map((repo) => (
                <li
                  key={repo.id}
                  onClick={() => setSelectedRepo(repo)}
                  className={cn(
                    "cursor-pointer rounded-md border px-3 py-2.5 text-gray-800 transition-colors hover:bg-gray-50",
                    selectedRepo?.id === repo.id && "bg-gray-100"
                  )}
                >
                  {repo.full_name}
                </li>
              ))}
            </ul>
          )}
        </div>

        <DialogFooter className="flex flex-row justify-end gap-3 sm:justify-end">
          <DialogClose asChild>
            <button
              type="button"
              className="px-4 py-2 font-medium text-gray-700 hover:text-gray-900"
            >
              Cancel
            </button>
          </DialogClose>

          <Button
            type="button"
            onClick={SaveRepoToDB}
            disabled={!selectedRepo}
            className="rounded-md bg-green-600 px-8 text-white hover:bg-green-700 disabled:opacity-50"
          >
            Add
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};