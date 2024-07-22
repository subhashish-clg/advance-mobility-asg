"use client";
import { ReactElement } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function layout({ children }: { children: ReactElement }) {
  const router = useRouter();

  return (
    <Tabs
      defaultValue="vehicles"
      className="container mx-auto px-5  py-8 space-y-8"
    >
      <TabsList>
        <TabsTrigger
          value="drivers"
          onClick={() => router.push("/admin/drivers")}
        >
          <Link href="/admin/drivers">Drivers</Link>
        </TabsTrigger>
        <TabsTrigger
          value="vehicles"
          onClick={() => router.push("/admin/vehicles")}
        >
          <Link href="/admin/vehicles">Vehicles</Link>
        </TabsTrigger>
        <TabsTrigger
          value="transfers"
          onClick={() => router.push("/admin/transfers")}
        >
          <Link href="/admin/transfers">Transfers</Link>
        </TabsTrigger>
      </TabsList>
      <TabsContent value="vehicles">{children}</TabsContent>
    </Tabs>
  );
}
