import './App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import BookingPage from './pages/BookingPage';
import CheckinPage from './pages/CheckinPage';
import {TopBar} from './components/TopBar';
import {Route} from 'react-router-dom'

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#ff9800',
      },
      secondary: {
        main: '#bf360c',
      },
    },
  });
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
      <TopBar/>
      <Route path="/desks/book" component={BookingPage}/>
      <Route path="/desks/checkin" component={CheckinPage}/>
      </ThemeProvider>
    </div>
  );
}

export default App;
