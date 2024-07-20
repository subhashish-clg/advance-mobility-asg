"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Transfer } from "@/hooks/useTransfers";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Transfer>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "transferDate",
    header: "Transfer Date",
  },

  {
    accessorKey: "vehicle",
    header: "Vehicle Number",
    cell: ({ row }) => {
      const transfer = row.original;

      return <>{transfer.vehicle.vehicleNumber}</>;
    },
  },
  {
    accessorKey: "fromDriver",
    header: "From",
    cell: ({ row }) => {
      const transfer = row.original;

      return <>{transfer.fromDriver.name}</>;
    },
  },
  {
    accessorKey: "toDriver",
    header: "To",
    cell: ({ row }) => {
      const transfer = row.original;

      return <>{transfer.toDriver.name}</>;
    },
  },
];
