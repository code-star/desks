import { List } from "@mui/material";
import { useState, FC, useEffect } from "react";
import { DeskType } from "../types";
import { DeskItemCheckIn } from "./DeskItem";

type Props = {
  deskId: string;
};
export const CheckinDeskList: FC<Props> = ({ deskId }) => {
  const [currentDeskList, setCurrentDeskList] = useState([] as DeskType[]);

  useEffect(() => {
    const setDeskList = async () => {
      const data = await fetch(
        `${process.env.REACT_APP_ROOT_URL}api/desk/list`
      );
      const json = await data.json();
      const fullList: Array<DeskType> = json.deskList;
      const indexDesk = fullList.findIndex((desk) => desk.desk_id === deskId);

      const closeDesks = fullList.filter((desk) => {
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
