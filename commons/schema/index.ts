import { stat } from "fs";
import * as z from "zod";

export const ORDERSTATUS = [
  "Order_Placed",
  "Order_Shipped",
  "In_Transit",
  "Arrived_at_Hub",
  "Out_for_Delivery",
  "Delivered",
] as const;

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
});

export const RegisterSchema = z.object({
  username: z.string().min(1, {
    message: "Username is required",
  }),
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(6, {
    message: "Minimum 6 characters",
  }),
});

export const OrderSchema = z.object({

  orderNumber: z.string().min(4),
  orderContent: z.string().min(1, {
    message: "Content is required",
  }),
  sender: z.string().min(1, {
    message: "Sender is required",
  }),
  recipient: z.string().email({
    message: "Recipient is required",
  }),
  isDelivered: z.boolean().default(false),
  orderStatus: z.enum(ORDERSTATUS),
  orderDate:z.date().default(new Date()),
  deliveryDate:z.date().default(new Date()),
  source:z.string().default(""),
  destination:z.string().default(""),
  containerId:z.number()  ,
});

export const ContainerSchema = z.object({
  containerNumber: z.string().min(4),
  status: z.string().min(1, { message: "Status is required" }),
  currentLocation:z.string().min(1, { message: "Location is required" }),
});