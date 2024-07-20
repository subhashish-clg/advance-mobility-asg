"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export type Driver = {
  id: number;
  name: string;
  phoneNumber: string;
  profilePhoto: string;
};

function useDrivers() {
  const [state, setState] = useState<Driver[]>([] as Driver[]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<null | string>(null);

  const getAllDrivers = async () => {
    setError(null);
    setIsLoading(true);

    const results = await axios.get<Driver[]>("http://localhost:8000/drivers");

    setIsLoading(false);

    if (results.status === 200) {
      return setState(results.data);
    }
    setError("Unable to fetch driver data.");
  };

  const createDriver = async (driver: {
    name: string;
    phoneNumber: string;
    profilePhoto: File | string;
  }) => {
    setError(null);
    setIsLoading(true);
    const formData = new FormData();
    formData.append("name", driver.name);
    formData.append("phoneNumber", driver.phoneNumber);
    formData.append("profilePhoto", driver.profilePhoto);

    try {
      const response = await axios.post(
        "http://localhost:8000/drivers",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert(`Response status: ${response.status}`);
      await getAllDrivers();
    } catch (error) {
      console.error("Error uploading data:", error);
      alert("Error uploading data");
      setError("Error uploading data");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteDriver = async (id: string) => {
    setError(null);
    setIsLoading(true);

    const results = await axios.delete(`http://localhost:8000/drivers/${id}`);

    if (results.status === 200) {
      alert("Deleted driver successfully.");
      return await getAllDrivers();
    }

    setIsLoading(false);
    setError("Unable to fetch driver data.");
  };

  useEffect(() => {
    getAllDrivers();
  }, []);

  return {
    drivers: state,
    isLoading,
    error,
    getAllDrivers,
    deleteDriver,
    createDriver,
  };
}

export default useDrivers;
