import { useEffect, useState } from "react";
import { Driver } from "./useDrivers";
import axios from "axios";

export interface Vehicle {
  vehicleNumber: string;
  vehicleType: string;
  pucCertificate: string;
  insuranceCertificate: string;
  owner: Driver | null;
}

export interface CreateVehicle {
  vehicleNumber: string;
  vehicleType: string;
  insuranceCertifcate: File;
  pucCertificate: File;
  owner?: string | undefined;
}

const VEHICLES_ENDPOINT = process.env.NEXT_PUBLIC_SERVER_URL + "vehicles/";

export default function useVehicles() {
  const [state, setState] = useState<Vehicle[]>([] as Vehicle[]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const resetLoadingState = () => {
    setError(null);
    setIsLoading(true);
  };

  const fetchVehicles = async () => {
    resetLoadingState();

    try {
      const response = await axios.get(VEHICLES_ENDPOINT);

      if (response.status === 200) {
        return setState(response.data);
      }
    } catch {
      setError("Error loading vehicles records.");
    } finally {
      setIsLoading(false);
    }
  };

  const createVehicle = async (vehicle: CreateVehicle) => {
    resetLoadingState();

    const formData = new FormData();
    formData.append("vehicleNumber", vehicle.vehicleNumber);
    formData.append("vehicleType", vehicle.vehicleType);
    formData.append("insuranceCertifcate", vehicle.insuranceCertifcate);
    formData.append("pucCertificate", vehicle.pucCertificate);

    if ("owner" in vehicle) {
      formData.append("owner", vehicle.owner?.toString() as string);
    }

    try {
      const response = await axios.post(VEHICLES_ENDPOINT, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert(`Successfully added the vehicle record.`);

      await fetchVehicles();
    } catch (error) {
      alert("Error uploading data");
      setError("Error uploading data");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteVehicle = async (vehicleNumber: string) => {
    try {
      const results = await axios.delete(VEHICLES_ENDPOINT + vehicleNumber);

      if (results.status === 200) {
        alert("Deleted vehicle recorded successfully.");
        await fetchVehicles();
      }
    } catch {
      setError("Error creating the vehicle record.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  return {
    vehicles: state,
    isLoading,
    error,
    methods: {
      fetchVehicles,
      createVehicle,
      deleteVehicle,
    },
  };
}
