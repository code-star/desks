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
      const Bookings: Booking[] = jsonBookingList.bookingList;
      const unavailableDesks = Bookings.filter((booking: Booking ) => {
        if(booking.startTime < getUnixTime(dateValue, startTimeValue) && booking.endTime > getUnixTime(dateValue, endTimeValue)){
          return true;
        } 
        return false;
      });
      console.log(unavailableDesks);
      const data = await fetch(`${process.env.REACT_APP_ROOT_URL}api/desk/list`);
      const json = await data.json();
      setCurrentDeskList(json.deskList);
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
