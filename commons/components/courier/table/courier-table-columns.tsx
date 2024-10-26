"use client";

import { Badge } from "@/commons/components/ui/badge";
import { Button } from "@/commons/components/ui/button";
import { Checkbox } from "@/commons/components/ui/checkbox";
import { DataTableColumnHeader } from "@/commons/components/ui/data-table/data-table-column-header";
import { OrderSchema } from "@/commons/schema";
import { ColumnDef } from "@tanstack/react-table";
import * as z from "zod";
import SelectCell from "./courier-select-cell";

import CourierEditForm from "./courier-edit-form";

export const columns: ColumnDef<z.infer<typeof OrderSchema>>[] = [
  {
    accessorKey: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value: any) =>
          table.toggleAllPageRowsSelected(!!value)
        }
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value: any) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "orderNumber",
    header: "Order #",
  },
  {
    accessorKey: "orderDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Order Date" />
    ),
    cell: ({ row }) => {
      const orderDate = row.getValue("orderDate");
      const formattedDate = orderDate
        ? new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }).format(new Date(orderDate))
        : "-"; // Show a dash if the date is missing or invalid
      return <span>{formattedDate}</span>;
    },
  }
  ,
 
  {
    accessorKey: "deliveryDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Delivery Date" />
    ),
    cell: ({ row }) => {
      const deliveryDate = row.getValue("deliveryDate");
      const formattedDate = deliveryDate
        ? new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }).format(new Date(deliveryDate))
        : "-"; // Show a dash if the date is missing or invalid
      return <span>{formattedDate}</span>;
    },
  },
  
  {
    accessorKey: "source",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Source" />
    ),
  },
  {
    accessorKey: "destination",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Destination" />
    ),
  },
  {
    accessorKey: "sender",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Sender" />
    ),
    cell: ({ row }) => {
      return (
        <Badge variant="outline" className="font-medium">
          {row.getValue("sender")}
        </Badge>
      );
    },
  },
  {
    accessorKey: "orderContent",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Content" />
    ),
  },
  {
    accessorKey: "orderStatus",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="ml-4"
        column={column}
        title="Order Status"
      />
    ),
    cell: SelectCell,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "isDelivered",
    header: "Received",
    cell: ({ row }) => {
      const value: "Yes" | "No" = row.getValue("isDelivered");
      if (value === "Yes") {
        return (
          <Button className="p-0" variant="ghost" disabled>
            <Badge className="inline-block p-0 min-w-4">{value}</Badge>
          </Button>
        );
      }
      return (
        <Button className="p-0" variant="ghost">
          <Badge className="inline-block p-0 min-w-4">{value}</Badge>
        </Button>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "edit",
    header: "Actions", // Or "Edit" if you prefer
    cell: ({ row }) => {
      const isDelivered = row.getValue("isDelivered") === "Yes";
      console.log(isDelivered);
      return isDelivered ? null : <CourierEditForm triggerButtonLabel={"Edit"} orderToUpdadte={row.original} />;
     
    },
    enableSorting: false,
    enableHiding: false,
  },
];
