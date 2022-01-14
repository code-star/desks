import { ThemeProvider } from '@mui/material/styles';
import BookingPage from './pages/BookingPage';
import CheckinPage from './pages/CheckinPage';
import LoginPage from './pages/LoginPage';
import UserPage from './pages/UserPage';
import RegisterPage from './pages/RegisterPage';
import { TopBar } from './components/TopBar';
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import HomePage from './pages/HomePage';
import { CssBaseline } from '@mui/material';
import { theme } from './theme';
import "./App.css"
import { BOOKING_ROUTE_URL, CHECKIN_ROUTE_URL, LOGIN_ROUTE_URL, USER_ROUTE_URL, REGISTER_ROUTE_URL } from './routeUrls';

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <CssBaseline />
          <TopBar />
          <Switch>
            <Route path={BOOKING_ROUTE_URL} component={BookingPage} />
            <Route path={CHECKIN_ROUTE_URL} component={CheckinPage} />
            <Route path={LOGIN_ROUTE_URL} component={LoginPage}/>
            <Route path={USER_ROUTE_URL} component={UserPage}/>
            <Route path={REGISTER_ROUTE_URL} component={RegisterPage}/>
            <Route component={HomePage} />
          </Switch>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
