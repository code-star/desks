import { List, ListItem, Stack, Typography } from "@mui/material";
import { useState, FC, useEffect } from "react";
import { DeskType } from "../types";

export const DeskList: FC = () => {
  const [deskList, setDeskList] = useState<DeskType[]>([]);

  useEffect(() => {
    const getDeskList = async () => {
      const deskList = await fetch(
        `${process.env.REACT_APP_ROOT_URL}api/desk/list`
      );
      const jsonDeskList = await deskList.json();
      const desks: DeskType[] = jsonDeskList.deskList;
      setDeskList(desks);
    };
    getDeskList();
  }, []);

  return (
    <List style={{ height: "calc(100vh - 260px)", overflow: "auto" }}>
      {deskList.map((desk) => (
        <ListItem key={desk.desk_id}>
          <Stack>
            <Typography
              color={desk.desk_state === "free" ? "inherit" : "red"}
              variant="subtitle2"
            >
              Desk: {desk.desk_id}
            </Typography>
            <Typography
              color={desk.desk_state === "free" ? "inherit" : "red"}
              variant="body2"
            >
              State: {desk.desk_state}
            </Typography>
          </Stack>
        </ListItem>
      ))}
    </List>
  );
};
