import { ThemeProvider } from "@mui/material/styles";
import BookingPage from "./pages/BookingPage";
import CheckinPage from "./pages/CheckinPage";
import LoginPage from "./pages/LoginPage";
import UserPage from "./pages/UserPage";
import RegisterPage from "./pages/RegisterPage";
import { TopBar } from "./components/TopBar";
import { Route, BrowserRouter, Switch, Redirect } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import { theme } from "./theme";
import "./App.css";
import {
  BOOKING_ROUTE_URL,
  CHECKIN_ROUTE_URL,
  USER_ROUTE_URL,
  REGISTER_ROUTE_URL,
} from "./routeUrls";

function App() {

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <CssBaseline />
          <TopBar />
          {sessionStorage.getItem("activeUser") ? (
            <Switch>
              <Route path={BOOKING_ROUTE_URL} component={BookingPage}></Route>
              <Route path={CHECKIN_ROUTE_URL} component={CheckinPage}></Route>
              <Route path={USER_ROUTE_URL} component={UserPage}></Route>
              <Route>
                <Redirect to={USER_ROUTE_URL} />
              </Route>
            </Switch>
          ) : (
            <Switch>
              <Route path={REGISTER_ROUTE_URL} component={RegisterPage} />
              <Route component={LoginPage} />
            </Switch>
          )}
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
