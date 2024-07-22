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
import { LoaderCircle } from "lucide-react";

export default function DriversPage() {
  const { drivers, isLoading, methods } = useDrivers(); // This hooks communicates with the "/drivers" API endpoint.

  const columnsWithDelete = useMemo(
    () => {
      // Insert the actions columns to perform deletion and update property
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
                      await methods.deleteDriver(driver.id.toString());
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
    },
    [] // The dependencies array is empty here because this has to be done only one time i.e when the components mounts
  );

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
            await methods.createDriver(data);
          }}
          title="Create a driver record"
          description="Enter the driver details."
        />
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <LoaderCircle className="mx-auto h-12 w-12 text-gray-500 transition-transform animate-spin" /> // Spining loader to display
        ) : (
          <DataTable
            searchable="name" // This the property of the object that can filtered using the filter search input
            columns={columnsWithDelete}
            data={drivers}
          />
        )}
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}
