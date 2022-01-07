import { ThemeProvider } from '@mui/material/styles';
import BookingPage from './pages/BookingPage';
import CheckinPage from './pages/CheckinPage';
import { TopBar } from './components/TopBar';
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import HomePage from './pages/HomePage';
import { CssBaseline } from '@mui/material';
import { theme } from './theme';
import "./App.css"

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <CssBaseline />
          <TopBar />
          <Switch>
            <Route path="/desks/book" component={BookingPage} />
            <Route path="/desks/checkin" component={CheckinPage} />
            <Route component={HomePage} />
          </Switch>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
