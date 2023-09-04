import '../../assets/app.css';
import {
  ItineraryType,
  tripDateString,
  destinationCitiesString,
  numberOfPeopleString,
  dayItineraryDate,
  itineraryItemSummaryDescription,
} from '../../utils';

const trip = {
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
    };

function Trip() {
  return (
      <div className="trip">
        <div className="header">
        A week with family in Brazil
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
