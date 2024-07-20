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

export default function useVehicles() {
  const [state, setState] = useState<Vehicle[]>([] as Vehicle[]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  async function fetchVehicles() {
    setError(null);
    setIsLoading(true);
    const response = await axios.get("http://localhost:8000/vehicles");

    setIsLoading(false);

    if (response.status === 200) {
      return setState(response.data);
    }

    setError("Failed loading vehicles data.");
  }

  const createVehicle = async (vehicle: {
    vehicleNumber: string;
    vehicleType: string;
    insuranceCertifcate: File;
    pucCertificate: File;
    owner?: string | undefined;
  }) => {
    setError(null);
    setIsLoading(true);

    console.log(vehicle);
    const formData = new FormData();
    formData.append("vehicleNumber", vehicle.vehicleNumber);
    formData.append("vehicleType", vehicle.vehicleType);
    formData.append("insuranceCertifcate", vehicle.insuranceCertifcate);
    formData.append("pucCertificate", vehicle.pucCertificate);

    if ("owner" in vehicle) {
      formData.append("owner", vehicle.owner?.toString() as string);
    }

    console.log(formData);

    try {
      const response = await axios.post(
        "http://localhost:8000/vehicles",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert(`Response status: ${response.status}`);

      await fetchVehicles();
    } catch (error) {
      console.error("Error uploading data:", error);
      alert("Error uploading data");
      setError("Error uploading data");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteVehicle = async (vehicleNumber: string) => {
    console.log("http://localhost:8000/" + vehicleNumber);
    const results = await axios.delete(
      "http://localhost:8000/vehicles/" + vehicleNumber
    );

    if (results.status === 200) {
      await fetchVehicles();
      return alert("Deleted vehicle recorded successfully.");
    }

    return alert("Deleted vehicle recorded unsuccessfully.");
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
