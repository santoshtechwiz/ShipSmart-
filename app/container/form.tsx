// components/ContainerForm.tsx

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// Tailwind classes for button and input styling
const formStyles = {
  input: "w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500",
  button: "bg-indigo-600 text-white font-bold py-2 px-4 rounded hover:bg-indigo-700",
  formContainer: "max-w-md mx-auto bg-white p-8 border border-gray-200 rounded-md shadow-lg space-y-4",
};

const ContainerForm = () => {
  const [containerNumber, setContainerNumber] = useState("");
  const [status, setStatus] = useState("In Transit");
  const [currentLocation, setCurrentLocation] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      containerNumber,
      status,
      currentLocation,
    };

    try {
      const res = await fetch("/api/container", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        // Reset the form after successful submission
        setContainerNumber("");
        setStatus("In Transit");
        setCurrentLocation("");
        router.refresh(); // Refresh the page to see updated container list
      } else {
        console.log(res);
        console.error("Failed to create container");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div className={formStyles.formContainer}>
      <h2 className="text-2xl font-bold mb-4">Create Container</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="containerNumber" className="block font-medium mb-2">
            Container Number
          </label>
          <input
            id="containerNumber"
            type="text"
            className={formStyles.input}
            value={containerNumber}
            onChange={(e) => setContainerNumber(e.target.value)}
            placeholder="Enter container number"
            required
          />
        </div>
        <div>
          <label htmlFor="status" className="block font-medium mb-2">
            Status
          </label>
          <select
            id="status"
            className={formStyles.input}
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="In Transit">In Transit</option>
            <option value="Delivered">Delivered</option>
            <option value="Pending">Pending</option>
          </select>
        </div>
        <div>
          <label htmlFor="currentLocation" className="block font-medium mb-2">
            Current Location
          </label>
          <input
            id="currentLocation"
            type="text"
            className={formStyles.input}
            value={currentLocation}
            onChange={(e) => setCurrentLocation(e.target.value)}
            placeholder="Enter current location"
          />
        </div>
        <button type="submit" className={formStyles.button}>
          Create Container
        </button>
      </form>
    </div>
  );
};

export default ContainerForm;
