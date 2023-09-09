import '../../assets/app.css';

import { useState } from 'react';
import {
  useParams
} from 'react-router-dom';

import Modal from '@mui/material/Modal';

import { useTrips } from '../../context/TripsContext.js';
import {
  tripTitle,
  tripDateString,
  destinationCitiesString,
  numberOfPeopleString,
  dayItineraryDate,
  itineraryItemSummaryDescription,
} from '../../utils';

const allCities = ['New York', 'San Francisco', 'Sao Paulo', 'Rio de Janeiro', 'Paris', 'Amsterdam', 'Salvador', 'Miami'];

const CityPicker = ({ initialCity, cityOptions, onCityPicked, isNewCity=false }) => {
  // TODO: should deal w the case when the user ends up picking nothing. The city should then reset to initialCity

  const [cityPick, setCityPick] = useState(initialCity);
  const [isPicked, setIsPicked] = useState(true); // Used to control whether options are displayed

  return (<div className="destination-container">
    <input
      className="text-input"
      type="text"
      placeholder="Choose a destination"
      value={cityPick}
      onChange={(event) => {
        setCityPick(event.target.value);
        setIsPicked(false);
      }}
    />

    {(cityPick.length > 1 && !isPicked) &&
        (<div className="city-options">
          {cityOptions
            .filter((cityOption) => cityOption.toLowerCase().startsWith(cityPick.toLowerCase()))
            .map((cityOption, cityIdx) =>
              <div key={`city-option-${cityIdx}`} className="city-option" onClick={() => {
                setCityPick(cityOption);
                setIsPicked(true);
                onCityPicked(cityOption);

                if (isNewCity) {
                  setCityPick("");
                }
              }}>
                {cityOption}
              </div>
            )}
        </div>)
      }
  </div>);
}

function SearchModal({ trip, }) {
  const [origin, setOrigin] = useState(trip.cityFrom);
  const [destinations, setDestinations] = useState(trip.destinationCities.map(c => c.city));
  // TODO: figure out context/satte flow for this

  return (
    <div className="filters-container">
      <div className="filter-option">
        <div className="filter-title">
        Where from?
        </div>

        <CityPicker
          key={`origin-picker`}
          initialCity={origin}
          cityOptions={allCities}
          onCityPicked={(cityPicked) => {
            setOrigin(cityPicked);
          }}
        />
      </div>

      <div className="filter-option">
        <div className="filter-title">
        Where to?
        </div>

        {destinations.map((destination, idx) =>
          <CityPicker
            key={`destination-picker-${idx}`}
            initialCity={destination}
            cityOptions={allCities.filter(c => c !== origin)}
            onCityPicked={(cityPicked) => {
              setDestinations([
                ...destinations.slice(0, idx),
                cityPicked,
                ...destinations.slice(idx + 1),
              ]);
            }}
          />
        )}

        <CityPicker
          initialCity={''}
          cityOptions={allCities.filter(c => c !== origin)}
          onCityPicked={(cityPicked) => {
            setDestinations([
              ...destinations,
              cityPicked,
            ]);
          }}
          isNewCity={true}
        />
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
            <>
              <SearchModal trip={trip} />
            </>
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
