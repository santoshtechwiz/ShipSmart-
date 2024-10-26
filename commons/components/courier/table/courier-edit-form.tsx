"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { ORDERSTATUS, OrderSchema } from "@/commons/schema";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/commons/components/ui/select";
import {
  addOrder,
  getRecepientEmail,
  updateOrder,
} from "@/commons/lib/actions/order"; // Assuming addOrder is the right function
import { Pencil1Icon, PlusCircledIcon } from "@radix-ui/react-icons";
import { useEffect, useState, useTransition } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaRedo } from "react-icons/fa";
import { getContainers } from "@/commons/lib/actions/container";
import { InputDate } from "../../ui/date";

interface CourierRegistrationFormProps {
  triggerButtonLabel: string;
  orderToUpdadte?: any; // Pass the order to edit
}

export const CourierEditForm = ({
  triggerButtonLabel,
  orderToUpdadte,
}: CourierRegistrationFormProps) => {
  interface Container {
    id: string;
    containerNumber: string;
  }

  const [containers, setContainers] = useState<Container[]>([]); // State to hold container list

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  console.log(orderToUpdadte);
  const form = useForm({
    defaultValues: {
      orderNumber: orderToUpdadte?.orderNumber || "",
      orderContent: orderToUpdadte?.orderContent || "",
      sender: orderToUpdadte?.sender || "",
      recipient: orderToUpdadte?.sender || "",
      isDelivered: orderToUpdadte?.isDelivered || false,
      orderStatus: orderToUpdadte?.orderStatus || "Order_Placed",
      orderDate: orderToUpdadte?.orderDate || new Date(),
      deliveryDate: orderToUpdadte?.deliveryDate || new Date(),
      source: orderToUpdadte?.source || "",
      destination: orderToUpdadte?.destination || "",
      containerId: orderToUpdadte?.containerId || "",
    },
  });

  // Fetch containers on component mount
  useEffect(() => {
    getContainers().then((data) => {
      setContainers(data); // Set the container data to state
      console.log(data);
    });
  }, []);

  const onSubmit = async (values: z.infer<typeof OrderSchema>) => {
    try {
      console.log("Form Submitted Values:", values); // Log the values
      setError("");
      setSuccess("");

      // Ensure that the updateOrder function is getting called
      updateOrder(values)
        .then((data: any) => {
          console.log("Response from updateOrder:", data);
          if (data.error) {
            setError(data.error);
          } else {
            setSuccess("Order updated successfully!");
          }
        })
        .catch((err) => {
          console.error("Error updating order:", err);
          setError("An error occurred while updating the order.");
        });
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" className="px-3.5" variant="outline">
          <Pencil1Icon className="mr-2 h-4 w-4" />
          {triggerButtonLabel}
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>
            {orderToUpdadte
              ? `Edit Order ${orderToUpdadte.orderNumber}`
              : "Add New Order"}
          </DialogTitle>
          <DialogDescription>
            {orderToUpdadte
              ? "Edit the shipment order details here."
              : "Add a new shipment order here."}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Split into 2 columns */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-4">
                  {/* Order Number */}
                  <FormField
                    control={form.control}
                    name="orderNumber"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="items-center">
                          Order #
                          <span className="text-xs bg-red-500 text-white rounded-lg p-1">
                            {orderToUpdadte ? "Editing" : "Generated"}
                          </span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            readOnly={true}
                            {...field}
                            disabled
                            type="text"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Recipient */}
                  <FormField
                    control={form.control}
                    name="recipient"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>
                          Recipient <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            disabled
                            {...field}
                            placeholder="Recipient@email.com"
                            type="email"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Sender */}
                  <FormField
                    control={form.control}
                    name="sender"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>
                          Sender <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled
                            placeholder="Brand"
                            type="text"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Order Content */}
                  <FormField
                    control={form.control}
                    name="orderContent"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>
                          Content <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled
                            placeholder="Package details"
                            type="text"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Container Dropdown */}
                  <FormField
                    control={form.control}
                    name="containerId"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Container</FormLabel>
                        <Select
                          value={field.value} // Bind directly to field.value
                          onValueChange={(value) => field.onChange(value)}
                          disabled={isPending}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue>
                                {containers.find(
                                  (container) => container.id === field.value
                                )?.containerNumber || "Select Container"}
                              </SelectValue>
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {containers.map((container: any) => (
                              <SelectItem
                                key={container.id}
                                value={container.id} // Using container.id as the value to match field.value type
                              >
                                {container.containerNumber}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Right Column */}
                <div className="space-y-4">
                  {/* Source */}
                  <FormField
                    control={form.control}
                    name="source"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Source</FormLabel>
                        <FormControl>
                          <Input {...field} type="text" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Destination */}
                  <FormField
                    control={form.control}
                    name="destination"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Destination</FormLabel>
                        <FormControl>
                          <Input {...field} disabled={isPending} type="text" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Order Date */}
                  <FormField
                    control={form.control}
                    name="orderDate"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Order Date</FormLabel>
                        <FormControl>
                          <InputDate {...field} disabled={isPending} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Delivery Date */}
                  <FormField
                    control={form.control}
                    name="deliveryDate"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Delivery Date</FormLabel>
                        <FormControl>
                          <InputDate {...field} disabled={isPending} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Order Status */}
                  <FormField
                    control={form.control}
                    name="orderStatus"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Order Status</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          disabled
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Order Status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {ORDERSTATUS.map((type) => (
                              <SelectItem key={type} value={type}>
                                {type.replace(/_/g, " ")}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <FormError message={error} />
              <FormSuccess message={success} />

              <Button disabled={isPending} type="submit" className="w-full">
                {isPending ? (
                  <div className="flex items-center">
                    <AiOutlineLoading3Quarters className="animate-spin h-5 w-5 mr-3" />
                    {orderToUpdadte
                      ? "Updating Shipment Order"
                      : "Creating Shipment Order"}
                  </div>
                ) : orderToUpdadte ? (
                  "Update Shipment Order"
                ) : (
                  "Generate Shipment Order"
                )}
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CourierEditForm;
