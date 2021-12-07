import { List } from "@mui/material";
import { useState, FC, useEffect, useContext } from "react";
import { DeskType, Booking } from "../types";
import { DeskItem } from "./DeskItem";
import { FormContext, getUnixTime } from "../pages/bookingPage";

export const DeskList: FC = () => {
  const [currentDeskList, setCurrentDeskList] = useState([] as DeskType[]);
  const {
    startTime: [startTimeValue, setStartTimeValue],
  } = useContext(FormContext);
  const {
    endTime: [endTimeValue, setEndTimeValue],
  } = useContext(FormContext);
  const {
    date: [dateValue, setDateValue],
  } = useContext(FormContext);
  useEffect(() => {
    const setDeskList = async () => {
      const bookingList = await fetch(`${process.env.REACT_APP_ROOT_URL}api/bookinglist`);
      const jsonBookingList= await bookingList.json();
      const bookings: Booking[] = jsonBookingList.bookingList;
      const bookingsAtTime = bookings.filter((booking: Booking ) => {
        if(booking.start_time < getUnixTime(dateValue, startTimeValue) && booking.end_time > getUnixTime(dateValue, endTimeValue)){
          return false;
        } 
        return true;
      });
      //TODO: remove before PR
      //console.log(bookingsAtTime);
      const data = await fetch(`${process.env.REACT_APP_ROOT_URL}api/desk/list`);
      const json = await data.json();
      const availableDesks = json.deskList.filter((desk:DeskType) =>{
        const isBooked = bookingsAtTime.find((booking:Booking)=>{
          return (booking.booked_desk === desk.desk_id)
        })
        return !isBooked;
      })
      console.log(availableDesks)
      setCurrentDeskList(availableDesks);
    };
    setDeskList();
  }, [endTimeValue, startTimeValue, dateValue]);

  return (
    <List>
      {currentDeskList.map((desk) => (
        <DeskItem desk={desk}></DeskItem>
      ))}
    </List>
  );
};
