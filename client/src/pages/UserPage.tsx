import {
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import { BOOKING_ROUTE_URL, CHECKIN_ROUTE_URL } from "../routeUrls";
import { Booking } from "../types";
import { getDateFromNumber } from "../utils";

const UserPage: FC = () => {
  const [userDeskList, setUserDeskList] = useState<Booking[]>([]);
  const [recentBooking, setRecentBooking] = useState<Booking>();
  const user = sessionStorage.getItem("activeUser");

  useEffect(() => {
    const setDeskList = async () => {
      if (user) {
        const jsonUser = JSON.parse(user);
        const desks = await fetch(
          `${process.env.REACT_APP_ROOT_URL}api/user/list/${jsonUser.name}`
        );
        const desksJson = await desks.json();
        const allUserDesks: Booking[] = desksJson.userDeskList;
        setRecentBooking(allUserDesks[allUserDesks.length - 1]);
        allUserDesks.sort((desk1, desk2) => {
          if (desk1.start_time > desk2.start_time) {
            return 1;
          }

          if (desk1.start_time < desk2.start_time) {
            return -1;
          }

          return 0;
        });
        setUserDeskList(allUserDesks);
      }
    };
    setDeskList();
  }, [user]);

  return (
    <Box sx={{ p: { xs: 1, md: 3 }, pt: { xs: 3, md: 3 } }}>
      <Card
        elevation={6}
        className="basecard"
        sx={{ width: { xs: "100%", md: "900px" } }}
      >
        <CardHeader
          title={
            user ? `bookings for ${JSON.parse(user).name}` : "No user found"
          }
          sx={{ textAlign: "center" }}
        />
        <CardContent>
          {userDeskList.length <= 0 ? (
            "You haven't booked any desks"
          ) : (
            <Stack spacing={2}>
              This is your most recent booking:
              <Card sx={{ width: { xs: "50%" } }}>
                <CardHeader title={recentBooking?.booked_desk} />
                <CardContent>
                  <Typography variant="caption">
                    {` From: ${getDateFromNumber(
                      recentBooking?.start_time
                    )} Till: ${getDateFromNumber(recentBooking?.end_time)}`}
                  </Typography>
                </CardContent>
              </Card>
              <Typography gutterBottom>These are your booked desks:</Typography>
              <List style={{ maxHeight: 400, overflow: "auto" }}>
                {userDeskList.map((userDesk) => (
                  <ListItem key={userDesk.booking_id}>
                    <ListItemText
                      primary={userDesk.booked_desk}
                      secondary={` From: ${getDateFromNumber(
                        userDesk.start_time
                      )} Till: ${getDateFromNumber(userDesk.end_time)}`}
                    />
                  </ListItem>
                ))}
              </List>
            </Stack>
          )}
        </CardContent>
        <CardActions sx={{ justifyContent: "space-between" }}>
          {userDeskList.length > 0 ? (
            <Button
              variant="outlined"
              color="secondary"
              href={`${CHECKIN_ROUTE_URL}?${userDeskList[0].booked_desk}`}
            >
              {`checkin desk ${userDeskList[0].booked_desk}`}
            </Button>
          ) : (
            ""
          )}
          <Button variant="outlined" href={BOOKING_ROUTE_URL}>
            Make new booking
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default UserPage;
