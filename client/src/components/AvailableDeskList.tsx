import { List } from "@mui/material";
import { useState, FC, useEffect, useContext } from "react";
import { DeskType, Booking } from "../types";
import { DeskItem } from "./DeskItemButton";
import { FormContext, getUnixTime } from "../pages/bookingPage";
import { isBetween } from "../helperFunctions";

export const AvailableDeskList: FC = () => {
  const [currentDeskList, setCurrentDeskList] = useState([] as DeskType[]);
  const {
    startTime: [startTimeValue],
  } = useContext(FormContext);
  const {
    endTime: [endTimeValue],
  } = useContext(FormContext);
  const {
    date: [dateValue],
  } = useContext(FormContext);

  useEffect(() => {
    const setDeskList = async () => {
      const bookingList = await fetch(
        `${process.env.REACT_APP_ROOT_URL}api/bookinglist`
      );
      const jsonBookingList = await bookingList.json();
      const bookings: Booking[] = jsonBookingList.bookingList;

      const bookingsAtTime = bookings.filter((booking: Booking) => {
        const unixStartTime = getUnixTime(dateValue, startTimeValue);
        const unixEndTime = getUnixTime(dateValue, endTimeValue);
        if (
          isBetween(booking.start_time, unixStartTime, unixEndTime) ||
          isBetween(booking.end_time, unixStartTime, unixEndTime)
        ) {
          return true;
        }
        return false;
      });

      const data = await fetch(
        `${process.env.REACT_APP_ROOT_URL}api/desk/list`
      );
      const json = await data.json();

      const availableDesks = json.deskList.filter((desk: DeskType) => {
        const isBooked = bookingsAtTime.find((booking: Booking) => {
          return booking.booked_desk === desk.desk_id;
        });
        return !isBooked;
      });
      setCurrentDeskList(availableDesks);
    };
    setDeskList();
  }, [endTimeValue, startTimeValue, dateValue]);

  return (
    <List style={{ maxHeight: 1000, overflow: "auto" }}>
      {currentDeskList.map((desk) => (
        <DeskItem desk={desk}></DeskItem>
      ))}
    </List>
  );
};
