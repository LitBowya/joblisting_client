"use client";

import React from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";

type JobOption = { job: { id: number; title: string } };

type Props = {
    jobs?: JobOption[];
    currentJobId?: number | undefined;
    currentStatus?: string | undefined;
};

export default function Filters({ jobs = [], currentJobId, currentStatus }: Props) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    function updateQs(patch: Record<string, string | undefined>) {
        const qs = new URLSearchParams(searchParams?.toString() || "");
        Object.entries(patch).forEach(([k, v]) => {
            if (v === undefined || v === "" || v === "all") qs.delete(k);
            else qs.set(k, v);
        });
        const q = qs.toString();
        const url = q ? `${pathname}?${q}` : pathname;
        router.push(url);
    }

    return (
        <div className="flex flex-col md:flex-row md:justify-start md:items-center gap-4">
            {/* Job Filter */}
            <div className="flex items-center gap-2">
                <label className="text-sm">Job:</label>
                <Select
                    value={currentJobId ? String(currentJobId) : "all"}
                    onValueChange={(value) =>
                        updateQs({ jobId: value === "all" ? undefined : value, page: "1" })
                    }
                >
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="All jobs" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All jobs</SelectItem>
                        {jobs.map((j) => (
                            <SelectItem key={j.job.id} value={String(j.job.id)}>
                                {j.job.title}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {/* Clear Button */}
            <div className="flex items-center gap-2">
                <Button
                    variant="ghost"
                    onClick={() => updateQs({ jobId: undefined, status: undefined, page: "1" })}
                >
                    Clear
                </Button>
            </div>
        </div>
    );
}
