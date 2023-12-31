import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import logo from './logo.svg';
import './App.css';
import './assets/app.scss';
import Home from './pages/Home';
import Trip from './pages/Trip';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route path="/trip/:tripId" element={<Trip/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
