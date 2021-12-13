import { List } from "@mui/material";
import { useState, FC, useEffect } from "react";
import { DeskType, Booking } from "../types";
import { DeskItemCheckIn } from "./DeskItem";
import { isBetween } from "../helperFunctions";

type Props = {
  deskId: string;
};
export const CheckinDeskList: FC<Props> = ({ deskId }) => {
  const [currentDeskList, setCurrentDeskList] = useState([] as DeskType[]);

  const isBooked = (booking: Booking, currentDeskId: string) => {
    return (
      booking.booked_desk === currentDeskId &&
      isBetween(Date.now() / 1000, booking.start_time, booking.end_time)
    );
  };

  useEffect(() => {
    const setDeskList = async () => {
      const desks = await fetch(
        `${process.env.REACT_APP_ROOT_URL}api/desk/list`
      );
      const desksJson = await desks.json();
      const fullList: DeskType[] = desksJson.deskList;
      const indexDesk = fullList.findIndex((desk) => desk.desk_id === deskId);

      const bookingList = await fetch(
        `${process.env.REACT_APP_ROOT_URL}api/bookinglist`
      );
      const jsonBookingList = await bookingList.json();
      const bookings: Booking[] = jsonBookingList.bookingList;

      if (
        bookings.find((booking) => {
          return isBooked(booking, deskId);
        })
      ) {
        const closeDesks = fullList.filter((desk) => {
          if (
            bookings.find((booking) => {
              return isBooked(booking, desk.desk_id);
            })
          ) {
            return false;
          }
          if (
            indexDesk - fullList.indexOf(desk) > 2 ||
            indexDesk - fullList.indexOf(desk) < -2
          ) {
            return false;
          }
          if (fullList.indexOf(desk) === indexDesk) {
            return false;
          }
          return true;
        });
        setCurrentDeskList(closeDesks);
      }
    };
    setDeskList();
  }, [deskId]);

  return (
    <List style={{ maxHeight: 200, overflow: "auto" }}>
      {currentDeskList.map((desk) => (
        <DeskItemCheckIn desk={desk}></DeskItemCheckIn>
      ))}
    </List>
  );
};
