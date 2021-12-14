import './App.css';
import BookingPage from './pages/BookingPage';
import CheckinPage from './pages/CheckinPage';
import {TopBar} from './components/TopBar';
import {Route} from 'react-router-dom'

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
