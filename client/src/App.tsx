import './App.css';
import BookingPage from './BookingPage';
import CheckinPage from './CheckinPage';
import TopBar from './TopBar';
import {Route, Link} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <TopBar/>
      <Route path="/desks/book" component={BookingPage}/>
      <Route path="/desks/checkin" component={CheckinPage}/>
    </div>
  );
}

export default App;
