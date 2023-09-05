import '../../assets/app.css';

import { useTrips } from '../../context/TripsContext.js';
import {
  useParams
} from 'react-router-dom';
import {
  tripTitle,
  tripDateString,
  destinationCitiesString,
  numberOfPeopleString,
  dayItineraryDate,
  itineraryItemSummaryDescription,
} from '../../utils';

function Trip() {
  const { tripId, } = useParams();
  const { trips, } = useTrips();
  
  const trip = trips.find(({ id }) => id == tripId);

  return (
      <div className="trip">
        <div className="header">
        { tripTitle(trip) }
        </div>

        <div className="page">
          <div className="query-summary">
            {destinationCitiesString(trip)} • {tripDateString(trip)} • {numberOfPeopleString(trip)}
          </div>

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
