// Explanation: Client pagination component that uses Next's router to navigate pages while preserving existing query params. Renders using ShadCN Pagination components.

"use client";

import React from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "@/components/ui/pagination";

type Props = {
  pagination: { currentPage: number; totalPages: number };
};

export default function JobPagination({ pagination }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const current = pagination.currentPage;
  const total = pagination.totalPages;

  function goToPage(p: number) {
    const qs = new URLSearchParams(searchParams?.toString() || "");
    if (p <= 1) qs.delete("page"); else qs.set("page", String(p));
    const q = qs.toString();
    const url = q ? `${pathname}?${q}` : pathname;
    router.push(url);
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious onClick={() => goToPage(Math.max(1, current - 1))}>
            Previous
          </PaginationPrevious>
        </PaginationItem>

        {Array.from({ length: total }).map((_, i) => {
          const p = i + 1;
          const show =
            total <= 7 || p === 1 || p === total || (p >= current - 1 && p <= current + 1);
          if (!show) {
            const isEllipsisPos = (p === 2 && current > 4) || (p === total - 1 && current < total - 3);
            if (isEllipsisPos) return (
              <PaginationItem key={`ellipsis-${p}`}>
                <PaginationEllipsis />
              </PaginationItem>
            );
            return null;
          }

          return (
            <PaginationItem key={p}>
              <PaginationLink onClick={() => goToPage(p)} isActive={p === current}>
                {p}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        <PaginationItem>
          <PaginationNext onClick={() => goToPage(Math.min(total, current + 1))}>
            Next
          </PaginationNext>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

