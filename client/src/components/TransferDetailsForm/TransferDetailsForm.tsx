"use client";

import { Form, useForm, FormProvider } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useDeferredValue, useEffect, useState } from "react";
import axios from "axios";
import { Driver } from "@/hooks/useDrivers";
import { Transfer } from "@/hooks/useTransfers";
import { Vehicle } from "@/hooks/useVehicles";

const formSchema = z.object({
  vehicleNumber: z.string().min(5, {
    message: "Vehicle number should must be at least 5 characters.",
  }),
  fromDriverID: z.string(),
  toDriverID: z.string(),
});

export const DriverSchema = formSchema;

export interface TransferDetailsFormProps {
  title: string;
  description: string;
  transfer?: Partial<Transfer>;
  onSumbit: (data: z.infer<typeof formSchema>) => Promise<void>;
}

export default function TransferDetailsForm(props: TransferDetailsFormProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [vehicleDetails, setVehicleDetails] = useState<Vehicle | null>(
    {} as Vehicle
  );
  const [fromUser, setFromUser] = useState<Driver | null>(
    props.transfer?.fromDriver ?? null
  );
  const [toUser, setToUser] = useState<Driver | null>(
    props.transfer?.toDriver ?? null
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      vehicleNumber: props.transfer?.vehicle?.vehicleNumber,
      fromDriverID: props.transfer?.fromDriver?.name,
      toDriverID: props.transfer?.toDriver?.name,
    },
  });

  const watchVehicleNumber = form.watch("vehicleNumber");
  const deferred = useDeferredValue(watchVehicleNumber);

  const fetchVehicle = async () => {
    try {
      const results = await axios.get<Vehicle>(
        `http://localhost:8000/vehicles/${watchVehicleNumber.toUpperCase()}`
      );
      if (results.data && results.data.owner) {
        setVehicleDetails(results.data);
        form.setValue("vehicleNumber", results.data.vehicleNumber);
        form.setValue("fromDriverID", results.data.owner.name);
      }
    } catch {
      setVehicleDetails(null);
      form.setError("vehicleNumber", {
        type: "custom",
        message: "Vehicle does not exists.",
      });
    }
  };

  useEffect(() => {
    fetchVehicle();
  }, [deferred]);

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    await props.onSumbit(values);
    setOpen(false);
    return form.reset();
  }

  async function mapFromDriver() {
    const id = form.getValues("fromDriverID");

    if ((fromUser && fromUser.name === id) || !id) {
      return;
    }

    try {
      const response = await axios.get<Driver>(
        `http://localhost:8000/drivers/${id}`
      );

      if (response.status === 200) {
        setFromUser(response.data);
        form.setValue("fromDriverID", response.data.name);
        return form.clearErrors("fromDriverID");
      }
    } catch {
      setFromUser(null);
      form.setValue("fromDriverID", "");
      return form.setError("fromDriverID", {
        type: "custom",
        message: "User does not exits. Please enter a valid ID.",
      });
    }
  }

  async function mapToDriver() {
    const id = form.getValues("toDriverID");

    if ((toUser && toUser.name === id) || !id) {
      return;
    }

    try {
      const response = await axios.get<Driver>(
        `http://localhost:8000/drivers/${id}`
      );

      if (response.status === 200) {
        setToUser(response.data);
        form.setValue("toDriverID", response.data.name);
        return form.clearErrors("toDriverID");
      }
    } catch {
      setToUser(null);
      form.setValue("toDriverID", "");
      return form.setError("toDriverID", {
        type: "custom",
        message: "User does not exits. Please enter a valid ID.",
      });
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">{props.title}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-h-[90%] overflow-y-scroll">
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <DialogHeader>
              <DialogTitle>{props.title}</DialogTitle>
              <DialogDescription>{props.description}</DialogDescription>
            </DialogHeader>

            <FormField
              control={form.control}
              name="vehicleNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vehicle Number</FormLabel>
                  <FormControl>
                    <Input placeholder="MH..." {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="fromDriverID"
              render={({ field }) => (
                <FormItem onBlur={mapFromDriver}>
                  <FormLabel>From User</FormLabel>
                  <FormControl>
                    <Input placeholder="ID..." {...field} />
                  </FormControl>
                  <FormDescription>Enter the driver id.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="toDriverID"
              render={({ field }) => (
                <FormItem onBlur={mapToDriver}>
                  <FormLabel>To</FormLabel>
                  <FormControl>
                    <Input placeholder="ID..." {...field} />
                  </FormControl>
                  <FormDescription>Enter the driver id.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
