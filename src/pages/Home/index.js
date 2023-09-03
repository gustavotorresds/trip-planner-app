import '../../assets/app.css';
import { tripDateString } from '../../utils';

const trips = [
    {
      title: 'A week with family in the U.S.',
      startDate: '2023-08-20',
      endDate: '2023-08-27',
      cityFrom: 'São Paulo',
      destinationCities: [
          { city: 'Miami', numberOfDays: 4 },
          { city: 'San Francisco', numberOfDays: 3 }
      ],
      numberOfPeople: 4,
    },
    {
      title: 'A week with family in Brazil',
      startDate: '2023-08-20',
      endDate: '2023-11-20',
      cityFrom: 'San Francisco',
      destinationCities: [
          { city: 'São Paulo', numberOfDays: 4 },
          { city: 'Rio de Janeiro', numberOfDays: 3 }
      ],
      numberOfPeople: 1,
    },
  ];

function Home() {
  return (
      <div className="page home">
        <h1>My trips</h1>
        
        <div className="upcoming">
          <h2>Upcoming</h2>

          <div className="trips-container">
            {trips.map((trip, index) =>
              <div className="trip-card">
                <div className="trip-title">{trip.title}</div>
                <div className="trip-dates">{tripDateString(trip)}</div>
              </div>
            )}
          </div>
        </div>

        <div className="past">
          <h2>Where you've been</h2>
          <p>Coming soon...</p>
        </div>
      </div>
  );
}

export default Home;
