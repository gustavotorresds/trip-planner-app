import { Link } from 'react-router-dom';

import '../../assets/app.css';
import { useTrips } from '../../context/TripsContext.js';
import { tripTitle, tripDateString } from '../../utils';

function Home() {
  const { trips, isLoading } = useTrips();

  return (
      <div className="page home">
        <h1>My trips</h1>
        
        <div className="upcoming">
          <h2>Upcoming</h2>

          <div className="trips-container">
            {!!isLoading ?
              <div>Loading...</div>
              :
              trips.map((trip, index) =>
              <Link to={`/trip/${trip._id}`} key={`trip-${index}`}>
                <div className="trip-card">
                  <div className="trip-title">{tripTitle(trip)}</div>
                  <div className="trip-dates">{tripDateString(trip)}</div>
                </div>
              </Link>
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
