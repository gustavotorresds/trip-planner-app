import { createContext, useContext, useState } from 'react';

import {
  ItineraryType,
} from '../utils';

const TripsContext = createContext();

export function useTrips() {
  return useContext(TripsContext);
}

export function TripsProvider({ children }) {
  const [trips, setTrips] = useState([
    {
      id: 1,
      title: 'A week with family in the U.S.',
      startDate: '2023-08-20',
      endDate: '2023-08-27',
      cityFrom: 'São Paulo',
      destinationCities: [
          { city: 'Miami', numberOfDays: 4 },
          { city: 'San Francisco', numberOfDays: 3 }
      ],
      numberOfPeople: 4,
      itinerary: [
        [
          {
            itineraryType: ItineraryType['Flight'],
            description: 'GRU to MIA with United Airlines'
          },
        ],
        [
          {
            itineraryType: ItineraryType['LodgingCheckin'],
            description: 'Residence Inn'
          },
          {
            itineraryType: ItineraryType['Activity'],
            description: 'Sunset at the bay'
          },
        ],
      ],
    },
    {
      id: 2,
      title: 'A week with family in Brazil',
      startDate: '2023-08-20',
      endDate: '2023-11-20',
      cityFrom: 'San Francisco',
      destinationCities: [
          { city: 'São Paulo', numberOfDays: 4 },
          { city: 'Rio de Janeiro', numberOfDays: 3 }
      ],
      numberOfPeople: 1,
      itinerary: [
        [
          {
            itineraryType: ItineraryType['Flight'],
            description: 'GRU to MIA with United Airlines'
          },
        ],
        [
          {
            itineraryType: ItineraryType['LodgingCheckin'],
            description: 'Residence Inn'
          },
          {
            itineraryType: ItineraryType['Activity'],
            description: 'Sunset at the bay'
          },
        ],
      ],
    },
  ]);

  return (
    <TripsContext.Provider value={{ trips, }}>
      {children}
    </TripsContext.Provider>
  );
}
