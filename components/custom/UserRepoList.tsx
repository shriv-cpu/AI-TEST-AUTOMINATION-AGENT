import React from "react";

export type UserRepo = {
  id: number;
  repoId: number;
  name: string;
  fullName: string;
  private: number;
  htmlUrl: string;
  description: string | null;
  userId: number;
  owner: string;
  updatedAt: string;
};

type UserRepoListProps = {
  repos: UserRepo[];
};

const UserRepoList = ({ repos }: UserRepoListProps) => {
  return (
    <div className="space-y-3">
      {repos.map((repo) => (
        <div key={repo.id} className="rounded-lg border p-4">
          <h2 className="font-semibold text-gray-900">{repo.fullName}</h2>
          <p className="mt-1 text-sm text-gray-500">
            {repo.description || "No description"}
          </p>
        </div>
      ))}
    </div>
  );
};

export default UserRepoList;
