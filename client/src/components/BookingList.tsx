import { List, ListItemButton, Stack, Typography } from "@mui/material";
import { useState, FC, useEffect, useContext } from "react";
import { Booking } from "../types";
import { getDateFromNumber } from "../utils";
import { FormContext } from "../FormContext";

export const BookingList: FC = () => {
  const [bookingList, setBookingList] = useState<Booking[]>([]);

  const {
    sortVariant: [sortVariant],
  } = useContext(FormContext);

  useEffect(() => {
    const getBookingList = async () => {
      const bookingList = await fetch(
        `${process.env.REACT_APP_ROOT_URL}api/bookinglist`
      );
      const jsonBookingList = await bookingList.json();
      const bookings: Booking[] = jsonBookingList.bookingList;
      bookings.sort((booking1, booking2) => {
        switch (sortVariant) {
          case "name": {
            return booking1.user_name.localeCompare(booking2.user_name);
          }
          case "nTime": {
            if (booking1.start_time > booking2.start_time) return 1;
            if (booking1.start_time < booking2.start_time) return -1;
            return 0;
          }
          case "fTime": {
            if (booking1.start_time < booking2.start_time) return 1;
            if (booking1.start_time > booking2.start_time) return -1;
            return 0;
          }
          default: {
            return booking1.booked_desk.localeCompare(booking2.booked_desk);
          }
        }
      });
      setBookingList(bookings);
    };
    getBookingList();
  }, [sortVariant]);

  return (
    <List style={{ height: "calc(100vh - 280px)", overflow: "auto" }}>
      {bookingList.map((desk) => (
        <ListItemButton key={desk.booking_id}>
          <Stack>
            <Typography variant="subtitle2">
              Desk: {desk.booked_desk}
            </Typography>
            <Typography variant="body2">User: {desk.user_name}</Typography>
            <Typography variant="body2">
              From:{getDateFromNumber(desk.start_time)} - to:
              {getDateFromNumber(desk.end_time)}
            </Typography>
          </Stack>
        </ListItemButton>
      ))}
    </List>
  );
};
