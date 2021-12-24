import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useState, FC, useEffect, useContext } from "react";
import { DeskType, Booking } from "../types";
import { isBetween, getUnixTime } from "../utils";
import { FormContext } from "../FormContext";

export const AvailableDeskList: FC = () => {
  const [currentDeskList, setCurrentDeskList] = useState<DeskType[]>([]);
  const{
    desk: [selectedDesk, setSelectedDesk],
  } = useContext(FormContext);
  const {
    startTime: [startTimeValue],
  } = useContext(FormContext);
  const {
    endTime: [endTimeValue],
  } = useContext(FormContext);
  const {
    date: [dateValue],
  } = useContext(FormContext);

  const handleChange = (event: SelectChangeEvent)=>{
    setSelectedDesk(event.target.value)
  }

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
  }, [endTimeValue, startTimeValue, dateValue, ]);

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }}>
    <InputLabel>Desk</InputLabel>
    <Select
      value={selectedDesk}
      label="Desk"
      onChange={handleChange}
    >
      {currentDeskList.map((desk) => (
        <MenuItem value={desk.desk_id}>{desk.desk_id}</MenuItem>
      ))}
     </Select>
      </FormControl>
  );
};
