import type { Metadata } from "next";
import Navbar from "@/components/Navbar";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <div className={"max-width"}>{children}</div>
    </>
  );
}
