"use client";

import React, { useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export default function JobFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const initialTitle = searchParams?.get("title") || "";
  const initialLocation = searchParams?.get("location") || "";
  const initialJobType = searchParams?.get("jobType") || "";
  const initialLocationType = searchParams?.get("locationType") || "";

  const [title, setTitle] = useState(initialTitle);
  const [location, setLocation] = useState(initialLocation);
  const [jobType, setJobType] = useState(initialJobType);
  const [locationType, setLocationType] = useState(initialLocationType);

  function updateQs(patch: Record<string, string | undefined>) {
    const qs = new URLSearchParams(searchParams?.toString() || "");
    Object.entries(patch).forEach(([k, v]) => {
      if (v === undefined || v === "") qs.delete(k); else qs.set(k, v);
    });
    const q = qs.toString();
    const url = q ? `${pathname}?${q}` : pathname;
    router.push(url);
  }

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-4">
      <div className="flex items-center gap-2 w-full md:w-auto">


          <div className="flex flex-col md:flex-row gap-4 items-center">

              <div className="flex flex-col items-start gap-2">
                  <label className="text-sm font-medium text-gray-700">Search</label>
                  <Input
                      placeholder="Job title or keywords"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="min-w-0"
                  />
              </div>
              <div className="flex flex-col items-start gap-2">
                  <label className="text-sm font-medium text-gray-700">Location</label>
                  <Input
                      placeholder="Location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="min-w-0"
                  />
              </div>
              {/* Job Type Filter */}
              <div className="flex flex-col items-start gap-2">
                  <label className="text-sm font-medium text-gray-700">Job Type:</label>
                  <Select value={jobType} onValueChange={setJobType}>
                      <SelectTrigger className="w-[180px] text-sm">
                          <SelectValue placeholder="Any type" />
                      </SelectTrigger>
                      <SelectContent>
                          <SelectItem value="any">Any type</SelectItem>
                          <SelectItem value="full_time">Full time</SelectItem>
                          <SelectItem value="part_time">Part time</SelectItem>
                          <SelectItem value="contract">Contract</SelectItem>
                          <SelectItem value="internship">Internship</SelectItem>
                          <SelectItem value="freelance">Freelance</SelectItem>
                      </SelectContent>
                  </Select>
              </div>

              {/* Location Type Filter */}
              <div className="flex flex-col items-start gap-2">
                  <label className="text-sm font-medium text-gray-700">Location Type:</label>
                  <Select value={locationType} onValueChange={setLocationType}>
                      <SelectTrigger className="w-[180px] text-sm">
                          <SelectValue placeholder="All" />
                      </SelectTrigger>
                      <SelectContent>
                          <SelectItem value="all">All</SelectItem>
                          <SelectItem value="on_site">On Site</SelectItem>
                          <SelectItem value="remote">Remote</SelectItem>
                          <SelectItem value="hybrid">Hybrid</SelectItem>
                      </SelectContent>
                  </Select>
              </div>
          </div>

          <Button onClick={() => updateQs({ title: title || undefined, location: location ||  undefined, locationType: locationType ||  undefined, jobType: jobType || undefined, page: "1" })}>
          Search
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" onClick={() => { setTitle(""); setLocation(""); setJobType(""); updateQs({ title: undefined, location: undefined, jobType: undefined, locationType: undefined, page: "1" }); }}>
          Clear
        </Button>
      </div>
    </div>
  );
}

