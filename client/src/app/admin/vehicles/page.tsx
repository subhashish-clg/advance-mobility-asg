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
import { columns } from "./columns";
import useVehicles from "@/hooks/useVehicles";
import VehicleDetailsForm from "@/components/VehicleDetailsForm";
import { useMemo } from "react";
import ActionContext from "@/components/ActionContext";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { LoaderCircle } from "lucide-react";

export default function VehiclesPage() {
  const { vehicles, isLoading, methods } = useVehicles();

  const columnsWithDelete = useMemo(() => {
    return [
      ...columns,
      {
        id: "actions",
        cell: ({ row }) => {
          const vehicle = row.original;

          return (
            <ActionContext>
              <>
                <DropdownMenuItem onClick={(e) => e.preventDefault()}>
                  <VehicleDetailsForm
                    vehicle={vehicle}
                    onSumbit={async () => {}}
                    title="Update vehicles detail"
                    description="Update the vehicles details here."
                  />
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={async () => {
                    await methods.deleteVehicle(vehicle.vehicleNumber);
                  }}
                >
                  <Button variant="destructive">Delete Vehicle</Button>
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
        <CardTitle>Vehicles</CardTitle>
        <CardDescription>
          List of all the vehicles in the database.
        </CardDescription>
        {/* User creation form */}
        <VehicleDetailsForm
          onSumbit={async (values) => {
            await methods.createVehicle(values);
          }}
          title="Create a vehicle record"
          description="Enter the vehicle details."
        />
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <LoaderCircle className="mx-auto h-12 w-12 text-gray-500 transition-transform animate-spin" /> // Spining loader to display
        ) : (
          <DataTable
            searchable="vehicleNumber"
            columns={columnsWithDelete}
            data={vehicles}
          />
        )}
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}
