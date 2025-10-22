import React from "react";
import GetJobs from "./components/GetJobs";

type SearchParams = { [key: string]: string | string[] | undefined } | undefined;

export default async function ListingsPage({ searchParams }: { searchParams?: SearchParams }) {
  return (
    <div className="space-y-6 min-h-screen">
      <GetJobs searchParams={searchParams} />
    </div>
  );
}
