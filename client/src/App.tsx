import { ThemeProvider } from "@mui/material/styles";
import BookingPage from "./pages/BookingPage";
import CheckinPage from "./pages/CheckinPage";
import LoginPage from "./pages/LoginPage";
import UserPage from "./pages/UserPage";
import RegisterPage from "./pages/RegisterPage";
import AdminPage from "./pages/AdminPage";
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
  ADMIN_ROUTE_URL,
} from "./routeUrls";
import { useEffect } from "react";

function App() {
  const user = sessionStorage.getItem("activeUser");
  const jsonUser = user ? JSON.parse(user) : null;
  const isUser = jsonUser && jsonUser.role === "user";
  const isAdmin = jsonUser && jsonUser.role === "admin";
  Notification.requestPermission();
  useEffect(() => {
    const checkNotifications = async () => {
      if (isUser) {
        const desks = await fetch(
          `${process.env.REACT_APP_ROOT_URL}api/user/notification/${jsonUser.name}`
        );
        const notificationJson = await desks.json();
        if (notificationJson.notifications.length > 0) {
          if (window.Notification.permission === "granted") {
            new window.Notification(
              notificationJson.notifications
                .map((notification: any) => {
                  return notification.message;
                })
                .join(" ")
            );
          }
        }
      }
    };
    const timer = setInterval(() => {
      checkNotifications();
    }, 10000);
    return () => {
      clearInterval(timer);
    };
  }, [isUser, jsonUser]);
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <CssBaseline />
          <TopBar />
          {isAdmin && (
            <Switch>
              <Route path={ADMIN_ROUTE_URL} component={AdminPage}></Route>

              <Route>
                <Redirect to={ADMIN_ROUTE_URL} />
              </Route>
            </Switch>
          )}
          {isUser && (
            <Switch>
              <Route path={BOOKING_ROUTE_URL} component={BookingPage}></Route>
              <Route path={CHECKIN_ROUTE_URL} component={CheckinPage}></Route>
              <Route path={USER_ROUTE_URL} component={UserPage}></Route>

              <Route>
                <Redirect to={USER_ROUTE_URL} />
              </Route>
            </Switch>
          )}
          {!isUser && !isAdmin && (
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
