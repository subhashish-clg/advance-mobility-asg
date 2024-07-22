"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export type Driver = {
  id: number;
  name: string;
  phoneNumber: string;
  profilePhoto: string;
};

export interface UpdateDriver {
  name: string;
  phoneNumber: string;
  profilePhoto: File | string;
}

export const DRIVERS_ENPOINT = process.env.NEXT_PUBLIC_SERVER_URL + "drivers"; // The endpoint of the server

function useDrivers() {
  // State definition
  const [state, setState] = useState<Driver[]>([] as Driver[]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<null | string>(null);

  const resetLoadingState = () => {
    setError(null);
    setIsLoading(true);
  };

  // All the CRUD operations on the server
  const fetchDrivers = async () => {
    // Reset the error state and set loading to true
    setError(null);
    setIsLoading(true);

    try {
      const results = await axios.get<Driver[]>(DRIVERS_ENPOINT);

      if (results.status === 200) {
        return setState(results.data); // Update the state to trigger a re-render
      }
    } catch {
      setError("Unable to fetch driver data."); // Set error message incase of failure
    } finally {
      setIsLoading(false); // Disable loading
    }
  };

  const createDriver = async (driver: UpdateDriver) => {
    // Set the initial state
    resetLoadingState();

    // Create a formdata object to send the images
    const formData = new FormData();
    formData.append("name", driver.name);
    formData.append("phoneNumber", driver.phoneNumber);
    formData.append("profilePhoto", driver.profilePhoto);

    try {
      const response = await axios.post(DRIVERS_ENPOINT, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 2001) alert(`Successfully created the driver.`);
      await fetchDrivers(); // Update the state at the end
    } catch (error) {
      alert("Error uploading data");
      setError("Error uploading data");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteDriver = async (id: string) => {
    resetLoadingState();

    try {
      const results = await axios.delete(DRIVERS_ENPOINT + id);

      if (results.status === 200) {
        alert("Deleted driver successfully.");
        return await fetchDrivers();
      }
    } catch {
      setError("Unable to fetch driver data.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDrivers(); // Fetchs all the drivers data when the component is mounted
  }, []);

  return {
    drivers: state,
    isLoading,
    error,
    methods: {
      fetchDrivers,
      createDriver,
      deleteDriver,
    },
  };
}

export default useDrivers;
