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

import { columns } from "./columns";
import { useMemo } from "react";
import ActionContext from "@/components/ActionContext";
import useTransfers from "@/hooks/useTransfers";
import TransferDetailsForm from "@/components/TransferDetailsForm";
import { LoaderCircle } from "lucide-react";

export default function TransfersPage() {
  const { transfers, isLoading, methods } = useTransfers();

  const columnsWithDelete = useMemo(() => {
    return [
      ...columns,
      {
        id: "actions",
        cell: ({ row }) => {
          const transfer = row.original;
          return (
            <ActionContext>
              <>
                <DropdownMenuItem>
                  <Button
                    onClick={async () => {
                      await methods.deleteTransfer(transfer.id);
                    }}
                    variant="destructive"
                  >
                    Delete Transfer Record
                  </Button>
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
        {isLoading ? (
          <LoaderCircle className="mx-auto h-12 w-12 text-gray-500 transition-transform animate-spin" />
        ) : (
          <DataTable
            searchable="vehicle"
            columns={columnsWithDelete}
            data={transfers}
          />
        )}
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}
