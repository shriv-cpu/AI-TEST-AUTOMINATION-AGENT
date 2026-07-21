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
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import axios from "axios";
import { UserDetailContext } from "@/app/context/UserDetailContext";

type Repo = {
  id: number;
  name: string;
  full_name: string;
  private: boolean;
  html_url: string;
  description: string | null;
  language: string;
  updated_at: string;
  default_branch: string;
  owner: string;
};

type RepoDialogProps = {
  onRepoAdded?: () => Promise<void> | void;
};

export const RepoDialog = ({ onRepoAdded }: RepoDialogProps) => {
  const [open, setOpen] = useState(false);
  const [repoList, setRepoList] = useState<Repo[]>([]);
  const [selectedRepo, setSelectedRepo] = useState<Repo | null>(null);
  const [searchValue, setSearchValue] = useState("");
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

  const handleSaveRepo = async () => {
    if (!selectedRepo || !userDetail?.id) {
      return;
    }

    const payload = {
      repoId: selectedRepo.id,
      userId: userDetail.id,
      name: selectedRepo.name,
      fullName: selectedRepo.full_name,
      private: Number(selectedRepo.private),
      htmlUrl: selectedRepo.html_url,
      description: selectedRepo.description,
      updatedAt: selectedRepo.updated_at,
      owner: selectedRepo.owner,
    };

    try {
      await axios.post("/api/user-repo", payload);
      await onRepoAdded?.();
      handleOpenChange(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);

    if (!isOpen) {
      setSelectedRepo(null);
      setSearchValue("");
    }
  };

  const filteredRepoList = repoList.filter((repo) =>
    repo.full_name.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          type="button"
          className="bg-green-600 text-white hover:bg-green-700"
        >
          + Add Repo
        </Button>
      </DialogTrigger>

      <DialogContent className="gap-6 rounded-xl border-0 p-8 shadow-xl sm:max-w-[480px]">
        <DialogHeader className="space-y-2">
          <DialogTitle className="text-2xl font-bold text-black">
            Add Repository
          </DialogTitle>

          <DialogDescription className="text-base text-gray-500">
            Select one of your GitHub repositories to add it to this workspace.
          </DialogDescription>
        </DialogHeader>

        <div>
          <Input
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
            placeholder="Search repo by name"
          />

          {loading ? (
            <p className="py-4 text-gray-500">Loading repositories...</p>
          ) : error ? (
            <p className="py-4 text-gray-500">{error}</p>
          ) : filteredRepoList.length === 0 ? (
            <p className="py-4 text-gray-500">No repositories found.</p>
          ) : (
            <ul className="max-h-64 space-y-1 overflow-y-auto">
              {filteredRepoList.map((repo) => (
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
            <Button
              type="button"
              variant="ghost"
              className="text-gray-700 hover:text-gray-900"
            >
              Cancel
            </Button>
          </DialogClose>

          <Button
            type="button"
            onClick={handleSaveRepo}
            disabled={!selectedRepo || !userDetail?.id}
            className="rounded-md bg-green-600 px-8 text-white hover:bg-green-700 disabled:opacity-50"
          >
            Add
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
