"use client";
import DataTable from "@/components/DateTable/DataTable";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

import UserDetailsForm from "@/components/UserDetailsForm";
import { columns } from "./columns";
import { useMemo } from "react";
import useDrivers from "@/hooks/useDrivers";
import ActionContext from "@/components/ActionContext";

export default function DriversPage() {
  const { drivers, deleteDriver, createDriver } = useDrivers();

  const columnsWithDelete = useMemo(() => {
    return [
      ...columns,
      {
        id: "actions",
        cell: ({ row }) => {
          const driver = row.original;

          return (
            <ActionContext>
              <>
                <DropdownMenuItem
                  onClick={async () => {
                    await deleteDriver(driver.id.toString());
                  }}
                >
                  <Button variant="destructive">Delete Driver</Button>
                </DropdownMenuItem>
              </>
            </ActionContext>
          );
        },
      },
    ];
  }, []);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Drivers</CardTitle>
        <CardDescription>
          List of all the drivers in the database.
        </CardDescription>
        {/* User creation form */}
        <UserDetailsForm
          onSumbit={async (data) => {
            await createDriver(data);
          }}
          title="Create a driver record"
          description="Enter the driver details."
        />
      </CardHeader>
      <CardContent>
        <DataTable
          searchable="name"
          columns={columnsWithDelete}
          data={drivers}
        />
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}
