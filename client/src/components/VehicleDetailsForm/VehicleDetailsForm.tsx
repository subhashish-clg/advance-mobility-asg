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
import { useState } from "react";
import axios from "axios";
import { Driver, DRIVERS_ENPOINT } from "@/hooks/useDrivers";
import { Vehicle, VEHICLES_ENDPOINT } from "@/hooks/useVehicles";

const formSchema = z.object({
  vehicleNumber: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  vehicleType: z.string().min(3, {
    message: "Phone number should be atleast 5 digits long.",
  }),

  pucCertificate: z.instanceof(File),
  insuranceCertifcate: z.instanceof(File),
  owner: z.string().optional(),
});

export const VehicleSchema = formSchema;

export interface UserDetailsFormsProps {
  title: string;
  description: string;
  vehicle?: Partial<Vehicle>;
  onSumbit: (data: z.infer<typeof formSchema>) => Promise<void>;
}

export default function VehicleDetailsForm(props: UserDetailsFormsProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [pucPreview, setPUCPreviw] = useState<string | null>(
    props.vehicle?.pucCertificate ?? null
  );
  const [ownerSearch, setOwnerSearch] = useState<Driver | null>(
    props.vehicle?.owner ?? null
  );

  const [insuranceCertificatePreview, setInsuranceCertificatePreview] =
    useState<string | null>(props.vehicle?.insuranceCertificate ?? null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      vehicleNumber: props.vehicle?.vehicleNumber ?? "",
      vehicleType: props.vehicle?.vehicleType ?? "",
      insuranceCertifcate: undefined,
      pucCertificate: undefined,
      owner: props.vehicle?.owner?.name.toString() ?? "",
    },
  });

  const handleInsuranceCertificate = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      form.setValue("insuranceCertifcate", file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setInsuranceCertificatePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePUCCertificateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      form.setValue("pucCertificate", file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPUCPreviw(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleOwnerSearch = async () => {
    const id = form.getValues("owner");

    if ((ownerSearch && ownerSearch.name.toString() === id) || !id) {
      return;
    }

    try {
      const response = await axios.get<Driver>(DRIVERS_ENPOINT + id);

      if (response.status === 200) {
        setOwnerSearch(response.data);
        form.setValue("owner", response.data.name);
        return form.clearErrors("owner");
      }
    } catch {
      setOwnerSearch(null);
      form.setValue("owner", "");
      return form.setError("owner", {
        type: "custom",
        message: "User does not exits. Please enter a valid ID.",
      });
    }
  };

  // Define a submit handler.
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (ownerSearch) {
      values.owner = ownerSearch.id.toString();
      await props.onSumbit(values);
    }
    setOpen(false);
  };
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
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormDescription>Enter your vehicle number </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="vehicleType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vehicle Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Car, Bike, etc.." {...field} />
                  </FormControl>
                  <FormDescription>Enter your vehicle type </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="insuranceCertifcate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Insurance Certificate</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleInsuranceCertificate}
                    />
                  </FormControl>
                  <FormDescription>
                    Upload a Insurance Certifcate of the Vehicle.
                  </FormDescription>
                  {insuranceCertificatePreview && (
                    <img
                      src={insuranceCertificatePreview}
                      alt="Profile preview"
                      className="mt-2 mx-auto w-full  object-fit"
                    />
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="pucCertificate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>PUC Certificate</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handlePUCCertificateChange}
                    />
                  </FormControl>
                  <FormDescription>
                    Upload a PUC Certifcate of the Vehicle.
                  </FormDescription>
                  {pucPreview && (
                    <img
                      src={pucPreview}
                      alt="PUC Certificate"
                      className="mt-2 mx-auto w-full object-fit"
                    />
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="owner"
              render={({ field }) => (
                <FormItem onBlur={handleOwnerSearch}>
                  <FormLabel>Owner of the Vehicle</FormLabel>
                  <FormControl>
                    <Input placeholder="Name of the owner" {...field} />
                  </FormControl>
                  <FormDescription>Enter the owner ID</FormDescription>
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
