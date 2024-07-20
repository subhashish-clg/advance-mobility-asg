import { useEffect, useState } from "react";
import { Driver } from "./useDrivers";
import axios from "axios";
import { Vehicle } from "./useVehicles";

export interface Transfer {
  vehicle: Vehicle;
  fromDriver: Driver;
  toDriver: Driver;
  transferDate: string;
}

export default function useTransfers() {
  const [state, setState] = useState<Transfer[]>([] as Transfer[]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  async function fetchTransfers() {
    setError(null);
    setIsLoading(true);
    const response = await axios.get<Transfer[]>(
      "http://localhost:8000/transfers"
    );

    setIsLoading(false);

    if (response.status === 200) {
      return setState(response.data);
    }

    setError("Failed loading vehicles data.");
  }

  const createTransfer = async (transfer: {
    vehicle: string;
    fromDriver: number;
    toDriver: number;
  }) => {
    setError(null);
    setIsLoading(true);

    console.log(transfer);
    // const formData = new FormData();
    // formData.append("vehicleNumber", vehicle.vehicleNumber);
    // formData.append("vehicleType", vehicle.vehicleType);
    // formData.append("insuranceCertifcate", vehicle.insuranceCertifcate);
    // formData.append("pucCertificate", vehicle.pucCertificate);

    // if ("owner" in vehicle) {
    //   formData.append("owner", vehicle.owner?.toString() as string);
    // }

    // console.log(formData);

    // try {
    //   const response = await axios.post(
    //     "http://localhost:8000/vehicles",
    //     formData,
    //     {
    //       headers: {
    //         "Content-Type": "multipart/form-data",
    //       },
    //     }
    //   );

    //   alert(`Response status: ${response.status}`);

    //   await fetchTransfers();
    // } catch (error) {
    //   console.error("Error uploading data:", error);
    //   alert("Error uploading data");
    //   setError("Error uploading data");
    // } finally {
    //   setIsLoading(false);
    // }
  };

  const deleteVehicle = async (vehicleNumber: string) => {
    console.log("http://localhost:8000/" + vehicleNumber);
    const results = await axios.delete(
      "http://localhost:8000/vehicles/" + vehicleNumber
    );

    if (results.status === 200) {
      await fetchTransfers();
      return alert("Deleted vehicle recorded successfully.");
    }

    return alert("Deleted vehicle recorded unsuccessfully.");
  };

  useEffect(() => {
    fetchTransfers();
  }, []);

  return {
    transfers: state,
    isLoading,
    error,
    methods: {
      fetchTransfers,
      createTransfer,
      deleteVehicle,
    },
  };
}
