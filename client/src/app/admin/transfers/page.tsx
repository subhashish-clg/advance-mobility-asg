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
import useTransfers from "@/hooks/useTransfers";
import TransferDetailsForm from "@/components/TransferDetailsForm";

export default function TransfersPage() {
  const { transfers, methods } = useTransfers();

  const columnsWithDelete = useMemo(() => {
    return [
      ...columns,
      {
        id: "actions",
        cell: ({ row }) => {
          return (
            <ActionContext>
              <>
                <DropdownMenuItem>
                  <Button variant="destructive">Delete Transfer Record</Button>
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
        <TransferDetailsForm
          onSumbit={async (data) => {
            await methods.createTransfer({
              vehicleNumber: data.vehicleNumber,
              fromDriverID: parseInt(data.fromDriverID),
              toDriverID: parseInt(data.fromDriverID),
            });
          }}
          title="Create a driver record"
          description="Enter the driver details."
        />
      </CardHeader>
      <CardContent>
        <DataTable
          searchable="vehicle"
          columns={columnsWithDelete}
          data={transfers}
        />
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}
