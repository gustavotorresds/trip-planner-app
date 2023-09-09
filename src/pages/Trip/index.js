import '../../assets/app.css';

import { useState } from 'react';
import {
  useParams
} from 'react-router-dom';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';

import { useTrips } from '../../context/TripsContext.js';
import {
  tripTitle,
  tripDateString,
  destinationCitiesString,
  numberOfPeopleString,
  dayItineraryDate,
  itineraryItemSummaryDescription,
} from '../../utils';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const cityOptions = ['New York', 'San Francisco', 'Sao Paulo', 'Rio de Janeiro'];

function SearchModal() {
  const [origin, setOrigin] = useState('');
  const [destinations, setDestinations] = useState(['RJ', 'SP']);
  const [isOriginSelected, setIsOriginSelected] = useState(true); // Used to control whether options are displayed
  // TODO: figure out context/satte flow for this

  const updateOrigin = (event) => {
    setOrigin(event.target.value);
    setIsOriginSelected(false);
  }

  const updateDestinations = (event, idx) => {
    setDestinations([
      ...destinations.slice(0, idx),
      event.target.value,
      ...destinations.slice(idx + 1),
    ]);
  }

  return (
    <div className="filters-container">
      <div className="filter-option">
        <div className="filter-title">
        Where from?
        </div>

        <input
          class="text-input"
          type="text"
          placeholder="Type something..."
          value={origin}
          onChange={updateOrigin}
        />

        {(origin.length > 1 && !isOriginSelected) &&
          (<div className="city-options">
            {cityOptions
              .filter((city) => city.toLowerCase().startsWith(origin.toLowerCase()))
              .map((city, cityIdx) =>
                <div className="city-option" onClick={() => {
                  setOrigin(city);
                  setIsOriginSelected(true);
                }}>
                  {city}
                </div>
              )}
          </div>)
        }
      </div>

      <div className="filter-option">
        <div className="filter-title">
        Where to?
        </div>

        {destinations.map((destination, idx) =>
          <div className="destination-container">
            <input
              class="text-input"
              type="text"
              placeholder="Type something..."
              value={destination}
              onChange={(event) => updateDestinations(event, idx)}
            />

            {(destination.length > 1) &&
              (<div className="city-options">
                {cityOptions
                  .filter((city) => city.toLowerCase().startsWith(destination.toLowerCase()))
                  .map((city, cityIdx) =>
                      <div className="city-option" onClick={() => {
                        setDestinations([
                          ...destinations.slice(0, idx),
                          city,
                          ...destinations.slice(idx + 1),
                        ]);
                      }}>
                        {city}
                      </div>)}
              </div>)
            }

          </div>
        )}
      </div>
    </div>
    );
}

function Trip() {
  const { tripId, } = useParams();
  const { trips, } = useTrips();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  const trip = trips.find(({ id }) => id == tripId);

  return (
      <div className="trip">
        <div className="header">
        { tripTitle(trip) }
        </div>

        <div className="page">
          <div className="query-summary" onClick={handleOpen}>
            {destinationCitiesString(trip)} • {tripDateString(trip)} • {numberOfPeopleString(trip)}
          </div>

          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'}}
          >
            <SearchModal/>
          </Modal>

          <div className="overall-itinerary">
            {trip.itinerary.map((dayItinerary, idx) =>
              <div className="day-itinerary" key={`day-${idx}`}>
                <div className="date">
                {dayItineraryDate(trip, idx)}
                </div>

                <div className="day-itinerary-items">
                  {dayItinerary.map((itineraryItem, idx2) =>
                    <div className="day-itinerary-item" key={`day-${idx}-item-${idx2}`}>
                      {itineraryItemSummaryDescription(itineraryItem)}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
  );
}

export default Trip;
