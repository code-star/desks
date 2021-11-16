import './App.css';
import BookingPage from './BookingPage';
import CheckinPage from './CheckinPage';
import {Route, Link} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Route path="/desks/book" component={BookingPage}/>
      <Route path="/desks/checkin" component={CheckinPage}/>
    </div>
  );
}

export default App;
