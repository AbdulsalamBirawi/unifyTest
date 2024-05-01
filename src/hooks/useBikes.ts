/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Bike from "../interfaces/bike";
import { useGlobalContext } from "../context/context";
import axios from "axios";
import { API_URL } from "../constant/api";
import { DEFAULT_LOCATION, PER_PAGE, START_PAGE } from "../constant/settings";
type Filters = {
  query?: string;
  startDate?: number;
  endDate?: number;
};

const useBikes = (page: number = START_PAGE, filters: Filters) => {
  const filterDates = (bike: Bike) => {
    const bikeDate = bike.date_stolen;
    return bikeDate >= filters.startDate! && bikeDate <= filters.endDate!;
  };
  const asyncCatcher = <T>(fn: Promise<T>): Promise<T> => {
    return new Promise<T>((res, rej) => {
      setLoading(true);
      fn.then((v) => {
        res(v);
        setLoading(false);
      }).catch(() => {
        setError("something went wrong");
      });
    });
  };
  const { setLoading, setError } = useGlobalContext();
  const [bikes, setBikes] = useState<Bike[]>([]);
  const [count, setCount] = useState(0);
  const [allBikes, setAllBikes] = useState<Bike[]>([]);
  const isDateFiltered = !!filters.startDate && !!filters.endDate;
  const params = {
    query: filters.query,
    page,
    per_page: PER_PAGE,
    location: DEFAULT_LOCATION,
    distance: 100,
    stolenness: "proximity",
  };

  const fetchBikes = async (page: number) => {
    return (
      await axios.get(`${API_URL}/search`, {
        params: { ...params, page },
      })
    ).data.bikes;
  };
  const fetchCount = async () => {
    return (
      await axios.get<{ proximity: number }>(`${API_URL}/search/count`, {
        params,
      })
    ).data.proximity;
  };
  const getAllBikes = async () => {
    const total = await fetchCount();
    const promises = [...new Array(Math.ceil(total / 100))].map((_, idx) =>
      axios.get<{ bikes: Bike[] }>(`${API_URL}/search`, {
        params: { ...params, page: idx + 1, per_page: 100 },
      })
    );
    return (await Promise.all(promises)).reduce<Bike[]>(
      (pv, cur) => pv.concat(cur.data.bikes),
      []
    );
  };
  useEffect(() => {
    if (!isDateFiltered) {
      fetchBikes(page).then((bikes) => setBikes(bikes));
      return;
    }

    const firstPageIndex = (page - 1) * PER_PAGE;
    const lastPageIndex = Math.min(firstPageIndex + PER_PAGE, allBikes.length);
    const filtered = allBikes.filter(filterDates);
    setCount(filtered.length);
    setBikes(filtered.slice(firstPageIndex, lastPageIndex));
  }, [page, filters.startDate, filters.endDate]);
  useEffect(() => {
    getAllBikes().then((bikes) => {
      setAllBikes(bikes);
    });
  }, [filters.query]);
  useEffect(() => {
    if (!isDateFiltered) {
      asyncCatcher(Promise.all([fetchCount(), fetchBikes(page)])).then(
        ([e, bikes]) => {
          setCount(e);
          setBikes(bikes);
        }
      );
    }
  }, [filters.query]);
  return { bikes, count };
};

export default useBikes;
