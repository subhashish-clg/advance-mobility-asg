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
import { Driver } from "@/hooks/useDrivers";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  phoneNumber: z.string().min(10, {
    message: "Phone number should be atleast 10 digits long.",
  }),

  profilePhoto: z.union([z.string(), z.instanceof(File)]),
});

export const DriverSchema = formSchema;

export interface UserDetailsFormsProps {
  title: string;
  description: string;
  driver?: Partial<Driver>;
  onSumbit: (data: z.infer<typeof formSchema>) => Promise<void>;
}

export default function UserDetailsForms(props: UserDetailsFormsProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [photoPreview, setPhotoPreview] = useState<string | null>(
    props.driver?.profilePhoto ?? null
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: props.driver?.name ?? "",
      phoneNumber: props.driver?.phoneNumber ?? "",
      profilePhoto: props.driver?.profilePhoto ?? "",
    },
  });

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      form.setValue("profilePhoto", file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    await props.onSumbit(values);
    setOpen(false);
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
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
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
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="8282..." {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter the Driver's phone number.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="profilePhoto"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Profile Photo</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoChange}
                    />
                  </FormControl>
                  <FormDescription>
                    Upload a profile photo for the driver.
                  </FormDescription>
                  {photoPreview && (
                    <img
                      src={photoPreview}
                      alt="Profile preview"
                      className="mt-2 mx-auto w-32 h-32 object-cover rounded-full"
                    />
                  )}
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
