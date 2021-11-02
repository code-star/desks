import './App.css';
import Booking_page from './Booking_page';
import Checkin_page from './Checkin_page';
import {Route, Link} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Route path="/desks/book" component={Booking_page}/>
      <Route path="/desks/checkin" component={Checkin_page}/>
    </div>
  );
}

export default App;
