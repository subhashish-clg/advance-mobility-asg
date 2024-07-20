"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import UserDetailsForm from "../UserDetailsForm";
import { Driver } from "@/hooks/useDrivers";
import React, { ReactElement } from "react";

export interface ActionContextProps {
  children?: React.ReactElement;
}

{
  /* <DropdownMenuItem onClick={(e) => e.preventDefault()}>
          <UserDetailsForm
            driver={props.row}
            onSumbit={async () => {}}
            title="Update user detail"
            description="Update the user details here."
          />
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            props.deleteAction(props.id);
          }}
        >
          <Button variant="destructive">Delete Driver</Button>
        </DropdownMenuItem> */
}
export default function ActionContext(props: ActionContextProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        {props.children}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
