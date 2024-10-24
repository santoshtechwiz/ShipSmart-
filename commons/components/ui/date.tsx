import * as React from "react";
import { cn } from "@/commons/lib/utils";

// Define the InputDate component
export interface InputDateProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> {
  value?: Date | string; // Accept both Date or string
  onChange?: (value: Date) => void; // Ensure onChange passes a Date object
}

const InputDate = React.forwardRef<HTMLInputElement, InputDateProps>(
  ({ className, value, onChange, ...props }, ref) => {
    // Convert Date to string in the format YYYY-MM-DD
    const formattedValue = value instanceof Date ? value.toISOString().substring(0, 10) : value;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      onChange?.(new Date(newValue)); // Pass the new Date object back to the onChange handler
    };

    return (
      <input
        type="date"
        className={cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder-gray-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        value={formattedValue} // Set formatted date string
        onChange={handleChange} // Handle change
        ref={ref}
        {...props}
      />
    );
  }
);

InputDate.displayName = "InputDate";

export { InputDate };
