import { useEffect, useState } from "react";
import { Driver } from "./useDrivers";
import axios from "axios";
import { Vehicle } from "./useVehicles";

export interface Transfer {
  id: number;
  vehicle: Vehicle;
  fromDriver: Driver;
  toDriver: Driver;
  transferDate: string;
}

export interface CreateDriver {
  vehicleNumber: string;
  fromDriverID: number;
  toDriverID: number;
}

const TRANSFERS_ENDPOINT = process.env.NEXT_PUBLIC_SERVER_URL + "transfers/";

export default function useTransfers() {
  const [state, setState] = useState<Transfer[]>([] as Transfer[]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const resetLoadingState = () => {
    setError(null);
    setIsLoading(true);
  };

  const fetchTransfers = async () => {
    resetLoadingState();
    try {
      const response = await axios.get<Transfer[]>(TRANSFERS_ENDPOINT);

      if (response.status === 200) {
        return setState(response.data);
      }
    } catch {
      setError("Failed loading vehicles data.");
    } finally {
      setIsLoading(false);
    }
  };

  const createTransfer = async (transfer: CreateDriver) => {
    resetLoadingState();

    try {
      const response = await axios.post(TRANSFERS_ENDPOINT, transfer);

      alert(`Created transfer record successfully.`);

      await fetchTransfers();
    } catch (error) {
      alert("Error uploading data");
      setError("Error uploading data");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteTransfer = async (id: number) => {
    resetLoadingState();

    try {
      const response = await axios.delete(TRANSFERS_ENDPOINT + id.toString());
      alert(`Deleted the transfer record.`);
      await fetchTransfers();
    } catch {
      setError("Error uploading data");
    } finally {
      setIsLoading(false);
    }
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
      deleteTransfer,
    },
  };
}
