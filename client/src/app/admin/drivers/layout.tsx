import { ReactElement } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";

export default function layout({ children }: { children: ReactElement }) {
  return (
    <Tabs defaultValue="drivers" className="container mx-auto px-5 bg-red-500 ">
      <TabsList>
        <TabsTrigger value="drivers">
          <Link href="/admin/drivers">Drivers</Link>
        </TabsTrigger>
        <TabsTrigger value="vehicles">
          <Link href="/admin/vehicles">Vehicles</Link>
        </TabsTrigger>
        <TabsTrigger value="transfers">Transfers</TabsTrigger>
      </TabsList>
      <TabsContent value="drivers">{children}</TabsContent>
    </Tabs>
  );
}
