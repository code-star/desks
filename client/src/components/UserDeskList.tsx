import { List, ListItem, Stack } from "@mui/material";
import { useState, FC, useEffect } from "react";
import { Booking } from "../types";

export const UserDeskList: FC = () => {
  const [userDeskList, setUserDeskList] = useState<Booking[]>([]);
  const userName = "test";

  useEffect(() => {
    const setDeskList = async () => {
        const desks = await fetch(
            `${process.env.REACT_APP_ROOT_URL}api/user/list/${userName}`
          );
      const desksJson = await desks.json();
      const allUserDesks: Booking[] = desksJson.userDeskList;
      setUserDeskList(allUserDesks);
    };
    setDeskList();
  }, []);

  return (
    <Stack>
      {userDeskList.length <= 0
        ? "You haven't booked any desks"
        : "These are your booked desks:"}
      <List style={{ maxHeight: 200, overflow: "auto" }}>
        {userDeskList.map((userDesk) => (
          <ListItem key={userDesk.booking_id}>{userDesk.booked_desk}</ListItem>
        ))}
      </List>
    </Stack>
  );
};