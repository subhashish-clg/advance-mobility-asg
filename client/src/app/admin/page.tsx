"use client";

import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { columns } from "./drivers/columns";
import { Button } from "@/components/ui/button";

import UserDetailsForm from "@/components/UserDetailsForm";
import useDrivers from "@/hooks/useDrivers";
import { useMemo } from "react";

export default function AdminPage() {
  const { drivers, deleteDriver } = useDrivers();

  return (
    <div>
      <Tabs defaultValue="drivers" className="w-full bg-red-500 ">
        <TabsList>
          <TabsTrigger value="drivers">Drivers</TabsTrigger>
          <TabsTrigger value="vehicles">Vehicles</TabsTrigger>
          <TabsTrigger value="transfers">Transfers</TabsTrigger>
        </TabsList>
        <TabsContent value="drivers">
          <Card>
            <CardHeader>
              <CardTitle>Drivers</CardTitle>
              <CardDescription>
                List of all the drivers in the database.
              </CardDescription>

              <UserDetailsForm />
            </CardHeader>
            <CardContent>
              <DataTable columns={columnsWithDelete} data={drivers} />
            </CardContent>
            <CardFooter></CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
