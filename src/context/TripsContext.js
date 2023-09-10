import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

import {
  ItineraryType,
} from '../utils';

const TripsContext = createContext();

export function useTrips() {
  const context = useContext(TripsContext);

  if (context ===  undefined) {
    throw new Error("Context must be used within a Provider");
  }

  return context;
}

export function TripsProvider({ children }) {
  const [trips, setTrips] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let url = 'http://localhost:5050/api/trips';
    axios
      .get(url)
      .then((response) => {
        setTrips(response.data);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <TripsContext.Provider value={{ trips, isLoading}}>
      {children}
    </TripsContext.Provider>
  );
}
