import { ThemeProvider} from '@mui/material/styles';
import BookingPage from './pages/BookingPage';
import CheckinPage from './pages/CheckinPage';
import { TopBar } from './components/TopBar';
import { Route } from 'react-router-dom'
import HomePage from './pages/HomePage';
import { CssBaseline } from '@mui/material';
import {theme} from './theme'

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <TopBar />
        <Route path="/desks/book" component={BookingPage} />
        <Route path="/desks/checkin" component={CheckinPage} />
        <Route exact path="/" component={HomePage} />
      </ThemeProvider>
    </div>
  );
}

export default App;
