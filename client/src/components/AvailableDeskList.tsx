import { List } from "@mui/material";
import { useState, FC, useEffect, useContext } from "react";
import { DeskType, Booking } from "../types";
import { DeskItem } from "./DeskItemButton";
import { isBetween, getUnixTime, FormContext } from "../utils";

export const AvailableDeskList: FC = () => {
  const [currentDeskList, setCurrentDeskList] = useState<DeskType[]>([]);
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
          const isBetweenStart  = isBetween(booking.start_time, unixStartTime, unixEndTime);
          const isBetweenEnd = isBetween(booking.end_time, unixStartTime, unixEndTime);
          return isBetweenStart || isBetweenEnd;
        });

      const data = await fetch(
        `${process.env.REACT_APP_ROOT_URL}api/desk/list`
      );
      const json = await data.json();

      const availableDesks = json.deskList.filter((desk: DeskType) => {
        const isBooked = bookingsAtTime.find((booking: Booking) => booking.booked_desk === desk.desk_id);
        return !isBooked;
      });
      setCurrentDeskList(availableDesks);
    };
    setDeskList();
  }, [endTimeValue, startTimeValue, dateValue]);

  return (
    <List style={{ maxHeight: 1000, overflow: "auto" }}>
      {currentDeskList.map((desk) => (
        <DeskItem  key={desk.desk_id} desk={desk}></DeskItem>
      ))}
    </List>
  );
};
