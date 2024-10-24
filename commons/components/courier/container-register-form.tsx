"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { ContainerSchema } from "@/commons/schema";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { FormError } from "@/commons/components/form/form-error";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/commons/components/ui/form";
import { FormSuccess } from "@/commons/components/form/form-success";
import { Button } from "@/commons/components/ui/button";
import { Input } from "@/commons/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/commons/components/ui/dialog";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { useState, useTransition } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { createContainer } from "@/commons/lib/actions/container";

interface ContainerFormProps {
  triggerButtonLabel: string;
}

export const ContainerForm = ({ triggerButtonLabel }: ContainerFormProps) => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof ContainerSchema>>({
    resolver: zodResolver(ContainerSchema),
    defaultValues: {
      containerNumber: "",
      status: "",
      currentLocation: "",
    },
  });
 
  const onSubmit = (values: z.infer<typeof ContainerSchema>) => {
    console.log(values);
    setError("");
    setSuccess("");
    startTransition(() => {
      createContainer(values).then((data) => {
       
        setError(data!.error);
        setSuccess(data.success);
      });
    });
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button size="sm" className="px-3.5" variant="outline">
            <PlusCircledIcon className="mr-2 h-4 w-4" />
            {triggerButtonLabel}
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create New Container</DialogTitle>
            <DialogDescription>
              Fill in the details to create a new container.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-4">
                  {/* Container Number */}
                  <FormField
                    control={form.control}
                    name="containerNumber"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>
                          Container Number <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={isPending}
                            placeholder="Container Number"
                            type="text"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Status */}
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Status</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={isPending}
                            placeholder="Status (e.g., In Transit)"
                            type="text"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Current Location */}
                  <FormField
                    control={form.control}
                    name="currentLocation"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Current Location</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={isPending}
                            placeholder="Current Location"
                            type="text"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormError message={error} />
                <FormSuccess message={success} />

                <Button disabled={isPending} type="submit" className="w-full">
                  {isPending ? (
                    <div className="flex items-center">
                      <AiOutlineLoading3Quarters className="animate-spin h-5 w-5 mr-3" />
                      Creating Container
                    </div>
                  ) : (
                    "Create Container"
                  )}
                </Button>
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ContainerForm;