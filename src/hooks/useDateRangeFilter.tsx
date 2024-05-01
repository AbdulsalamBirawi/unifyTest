import { useEffect, useState } from "react";
import Bike from "../interfaces/bike";

const useFilteredBikes = (
  bikes: Bike[],
  startDate: number,
  endDate: number
) => {
  const [filteredBikes, setFilteredBikes] = useState<Bike[]>([]);

  useEffect(() => {
    if (startDate && endDate) {
      const filteredData = bikes.filter((bike) => {
        const bikeDate = bike.date_stolen;
        return bikeDate >= startDate && bikeDate <= endDate;
      });
      setFilteredBikes(filteredData);
    } else {
      setFilteredBikes(bikes);
    }
  }, [bikes, startDate, endDate]);

  return filteredBikes;
};

export default useFilteredBikes;
