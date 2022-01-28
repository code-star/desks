import { List, ListItem, Stack, Typography } from "@mui/material";
import { useState, FC, useEffect, useContext } from "react";
import { DeskType, Booking } from "../types";
import { isBetween } from "../utils";
import { FormContext } from "../FormContext";

type Props = {
  deskId: string;
};
const OFFSET_AVAILABLE_DESKS = 2;
const UNIX_HALF_HOUR = 1800000;

const isBookedNow = (booking: Booking) => {
  return isBetween(
    Date.now() / 1000,
    booking.start_time - UNIX_HALF_HOUR,
    booking.end_time
  );
};

export const CheckinDeskList: FC<Props> = ({ deskId }) => {
  const [currentDeskList, setCurrentDeskList] = useState<DeskType[]>([]);
  const {
    isBookedByUser: [isDeskUser, setDeskUser],
  } = useContext(FormContext);

  useEffect(() => {
    const setDeskList = async () => {
      const desks = await fetch(
        `${process.env.REACT_APP_ROOT_URL}api/desk/list`
      );
      const desksJson = await desks.json();
      const allDesks: DeskType[] = desksJson.deskList;

      const bookingList = await fetch(
        `${process.env.REACT_APP_ROOT_URL}api/bookinglist`
      );
      const jsonBookingList = await bookingList.json();
      const bookings: Booking[] = jsonBookingList.bookingList;

      const deskIndex = allDesks.findIndex((desk) => desk.desk_id === deskId);
      const getDeskForBooking = (booking: Booking) =>
        allDesks.find((desk) => desk.desk_id === booking.booked_desk);
      const currentBookings = bookings.filter(isBookedNow);
      const currentBookedDesks = currentBookings.map(getDeskForBooking);

      if (
        currentBookedDesks.find((bookedDesk) => bookedDesk?.desk_id === deskId)
      ) {
        const user = sessionStorage.getItem("activeUser");
        const jsonUser = user ? JSON.parse(user) : null;
        const currentBooking = currentBookings.find(
          (booking) => booking.booked_desk === deskId
        );
        if (currentBooking?.user_name !== jsonUser.name) {
          setDeskUser(false);
        }
        const nearbyDesks = allDesks.filter((otherDesk, otherdDeskIndex) => {
          const isCurrentlyBooked = currentBookedDesks.find(
            (bookedDesk) => bookedDesk?.desk_id === otherDesk.desk_id
          );
          const isSameDesk = deskIndex === otherdDeskIndex;
          const distance = deskIndex - otherdDeskIndex;
          const isInRange =
            distance >= -OFFSET_AVAILABLE_DESKS &&
            distance <= OFFSET_AVAILABLE_DESKS;
          return !isSameDesk && isInRange && !isCurrentlyBooked;
        });
        setCurrentDeskList(nearbyDesks);
      }
    };
    setDeskList();
  }, [deskId, setDeskUser]);

  return (
    <>
      {currentDeskList.length <= 0 || isDeskUser ? (
        ""
      ) : (
        <Stack>
          <Typography>This desk is not available, but these are:</Typography>
          <List style={{ maxHeight: 200, overflow: "auto" }}>
            {currentDeskList.map((desk) => (
              <ListItem key={desk.desk_id}>{desk.desk_id}</ListItem>
            ))}
          </List>
        </Stack>
      )}
    </>
  );
};
