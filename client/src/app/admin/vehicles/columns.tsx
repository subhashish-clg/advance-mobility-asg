"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Vehicle } from "@/hooks/useVehicles";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

export const columns: ColumnDef<Vehicle>[] = [
  {
    accessorKey: "vehicleNumber",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Vehicle Number
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "vehicleType",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Vehicle Type
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "insuranceCertificate",
    header: "Insurance Certificate",
    cell: ({ row }) => {
      const vehicle = row.original;
      return <img src={vehicle.insuranceCertificate} className="h-9" />;
    },
  },
  {
    accessorKey: "pucCeritficate",
    header: "PUC Certificate",
    cell: ({ row }) => {
      const vehicle = row.original;
      return <img src={vehicle.pucCertificate} className="h-9" />;
    },
  },
  {
    accessorKey: "owner",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Owner
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const vehicle = row.original;
      return <>{vehicle.owner?.name ?? "None"}</>;
    },
  },
];
