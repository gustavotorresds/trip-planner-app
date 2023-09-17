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

  const patchTripItinerary = (tripId, updatedData) => {
    setIsLoading(true);

    // setTimeout(() => { setIsLoading(false) }, 2000);
    let url = `http://localhost:5050/api/trips/${tripId}`;

    axios
      .patch(url, updatedData)
      .then((response) => {
        const newTrips = [...trips];
        const tripIndex = newTrips.findIndex((trip) => trip._id === tripId);
        
        if (tripIndex === -1) {
          throw new Error('ID not valid')
        }

        newTrips[tripIndex] = response.data.value;

        setTrips(newTrips);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }

  useEffect(() => {
    setIsLoading(true);
    let url = 'http://localhost:5050/api/trips';
    axios
      .get(url)
      .then((response) => {
        setTrips(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error)
        setIsLoading(false);
      });
  }, []);

  return (
    <TripsContext.Provider value={{ trips, isLoading, patchTripItinerary}}>
      {children}
    </TripsContext.Provider>
  );
}
