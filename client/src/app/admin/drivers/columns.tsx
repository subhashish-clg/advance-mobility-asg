"use client";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Driver } from "@/hooks/useDrivers";

// The following are the columns to be displayed for driver table
export const columns: ColumnDef<Driver>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} // Sorting function using tanstack table
        >
          ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "profilePhoto",
    header: "Profile Photo",
    cell: ({ row }) => {
      const driver = row.original;
      return <img className="max-h-20" src={driver.profilePhoto} />; // Render the cell to display the image
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} // Sorting function using tanstack table
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "phoneNumber",
    header: "Phone Number",
  },
];
