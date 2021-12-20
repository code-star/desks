import { List, Stack } from "@mui/material";
import { useState, FC, useEffect } from "react";
import { DeskType, Booking } from "../types";
import { DeskItemCheckIn } from "./DeskItem";
import { isBetween } from "../utils";

type Props = {
  deskId: string;
};
const OFFSET_AVAILABLE_DESKS = 2

const isBookedNow = (booking: Booking) => {
  return (
    isBetween(Date.now() / 1000, booking.start_time, booking.end_time)
  );
};

export const CheckinDeskList: FC<Props> = ({ deskId }) => {
  const [currentDeskList, setCurrentDeskList] = useState<DeskType[]>([]);

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
      const getDeskForBooking = (booking:Booking) => allDesks.find((desk) => desk.desk_id === booking.booked_desk); 
      const currentBookedDesks = bookings.filter(isBookedNow).map(getDeskForBooking);

      if(currentBookedDesks.find((bookedDesk) => bookedDesk?.desk_id === deskId)){
        const nearbyDesks = allDesks.filter((otherDesk, otherdDeskIndex) => {
          const isCurrentlyBooked = currentBookedDesks.find((bookedDesk) => bookedDesk?.desk_id === otherDesk.desk_id)
          const isSameDesk = deskIndex === otherdDeskIndex;
          const distance = deskIndex - otherdDeskIndex;
          const isInRange = distance >= -OFFSET_AVAILABLE_DESKS && distance <= OFFSET_AVAILABLE_DESKS;
          return !isSameDesk && isInRange && !isCurrentlyBooked;  
        });
        setCurrentDeskList(nearbyDesks);
      }
    };
    setDeskList();
  }, [deskId]);

  return (
    <Stack>
       {currentDeskList.length <= 0? "" : "Dit bureau is niet beschikbaar, u kan wel naar deze bureaus gaan:"}
      <List style={{ maxHeight: 200, overflow: "auto" }}>
        {currentDeskList.map((desk) => (
          <DeskItemCheckIn key={desk.desk_id} desk={desk}></DeskItemCheckIn>
        ))}
      </List>
    </Stack>
  );
};
