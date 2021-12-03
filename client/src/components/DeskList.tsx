import { List } from "@mui/material";
import { useState, FC, useEffect } from "react";
import { DeskType } from "../types";
import { DeskItem } from "./DeskItem";

export const DeskList: FC = () => {
  const [currentDeskList, setCurrentDeskList] = useState([] as DeskType[]);
  useEffect(() => {
    const setDeskList = async () => {
      const data = await fetch(`http://localhost:3001/api/desk/list`);
      const json = await data.json();
      setCurrentDeskList(json.deskList);
    };
    setDeskList();
  }, []);

  return (
    <List>
      {currentDeskList.map((desk) => (
        <DeskItem desk={desk}></DeskItem>
      ))}
    </List>
  );
};
