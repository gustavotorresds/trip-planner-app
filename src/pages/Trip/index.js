import { useState } from 'react';
import {
  useParams
} from 'react-router-dom';

import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

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

function SearchModal({ trip, onClose, onUpdateSearch }) {
  // TODO: figure out best UX to set trip length. Currently, esp annoying if the trip is long. User has to click on -/+ a ton of times
  // TODO: figure out context/satte flow for this

  const [origin, setOrigin] = useState(trip.cityFrom);
  const [destinations, setDestinations] = useState(trip.destinations);
  const [startDate, setStartDate] = useState(trip.startDate);

  return (
    <div className="filters-container">
      <div className="filters-header">
        <IconButton onClick={onClose} size="large">
          <CloseIcon />
        </IconButton>
      </div>
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

        {destinations.map((destination, destinationIdx) =>
          <CityPicker
            key={`destination-picker-${destinationIdx}`}
            initialCity={destination.city}
            cityOptions={allCities.filter(c => c !== origin)}
            onCityPicked={(cityPicked) => {
              setDestinations([
                ...destinations.slice(0, destinationIdx),
                {...destinations[destinationIdx], city: cityPicked},
                ...destinations.slice(destinationIdx + 1),
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
              {city: cityPicked, numberOfDays: 0},
            ]);
          }}
          isNewCity={true}
        />
      </div>

      <div className="filter-option">
        <div className="filter-title">
        When to start?
        </div>

        <div className="date-container">
          <DatePicker
            value={dayjs(startDate)}
            onAccept={(newStartDate) => {
              setStartDate(newStartDate.format('YYYY-MM-DD'));
            }}
          />
        </div>
      </div>

      <div className="filter-option">
        <div className="filter-title">
        Days at each destination?
        </div>

        <div className="num-days-container">
          {destinations.map((destination, destinationIdx) =>
              <div key={`number-of-days-${destinationIdx}`} className="destination-num-days-container">
                <div className="destination-num-days-city">
                {destination.city}
                </div>

                <div className="destination-num-days-number-container">
                  <IconButton
                    size="small"
                    disabled={destination.numberOfDays < 1}
                    onClick={(e) => {
                      setDestinations([
                        ...destinations.slice(0, destinationIdx),
                        {...destinations[destinationIdx], numberOfDays: destination.numberOfDays - 1},
                        ...destinations.slice(destinationIdx + 1),
                      ]);
                    }}
                  >
                    <RemoveIcon />
                  </IconButton>

                  <div className="destination-num-days-number">
                    {destination.numberOfDays}
                  </div>

                  <IconButton
                    size="small"
                    onClick={(e) => {
                      setDestinations([
                        ...destinations.slice(0, destinationIdx),
                        {...destinations[destinationIdx], numberOfDays: destination.numberOfDays + 1},
                        ...destinations.slice(destinationIdx + 1),
                      ]);
                    }}
                  >
                    <AddIcon />
                  </IconButton>
                </div>
              </div>
          )}
        </div>
      </div>

      <div className="footer">
        <div
          className="footer-button"
          onClick={() => onUpdateSearch({
            cityFrom: origin,
            startDate: startDate,
            destinations: destinations,
          })}
        >
        Search
        </div>
      </div>
    </div>
    );
}

function Trip() {
  const { tripId, } = useParams();
  const { trips, isLoading, patchTripItinerary } = useTrips();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleUpdate = (updatedData) => {
    patchTripItinerary(tripId, updatedData);
    setOpen(false);
  }
  
  const trip = trips.find(({ _id }) => _id === tripId);

  return (
      <div className="trip">
        {
          !!isLoading ?
          <div>Loading...</div>
          :
          <>
            <div className="header">
            { tripTitle(trip) }
            </div>

            <div className="page">
              <div className="search-query" onClick={handleOpen}>
                {destinationCitiesString(trip)} • {tripDateString(trip)} • {numberOfPeopleString(trip)}
              </div>

              <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                scroll="body"
              >
                <>
                  <SearchModal trip={trip} onClose={handleClose} onUpdateSearch={handleUpdate} />
                </>
              </Dialog>

              <div className="itinerary-contaner">
                {trip.itinerary.map((dayItinerary, dayIdx) =>
                  <div className="day-itinerary" key={`day-${dayIdx}`}>
                    <div className="date">
                    {dayItineraryDate(trip, dayIdx)}
                    </div>

                    <div className="day-itinerary-items">
                      {dayItinerary.map((itineraryItem, itineraryItemIdx) =>
                        <div className="day-itinerary-item" key={`day-${dayIdx}-item-${itineraryItemIdx}`}>
                          {itineraryItemSummaryDescription(itineraryItem)}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </>
        }
      </div>
  );
}

export default Trip;
