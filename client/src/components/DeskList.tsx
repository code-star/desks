import { List, ListItemButton } from "@mui/material";
import { useState, FC, useEffect, useContext } from "react";
import { FormContext } from "../pages/bookingPage";
import { DeskType } from "../types";

function DeskItem() {
  const [currentDeskList, setCurrentDeskList] = useState([] as DeskType[]);
  const {
    desk: [selectedDesk, setSelectedDesk],
  } = useContext(FormContext);
  useEffect(() => {
    const setDeskList = async () => {
      const data = await fetch(`http://localhost:3001/api/desk/list`);
      const json = await data.json();
      setCurrentDeskList(json.deskList);
    };
    setDeskList();
  }, []);

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    desk: string
  ) => {
    setSelectedDesk(desk);
  };
  return currentDeskList.map((desk) => (
    <ListItemButton
      selected={selectedDesk === desk.desk_id}
      onClick={(event) => handleListItemClick(event, desk.desk_id)}
      key={desk.desk_id}
    >
      {desk.desk_id}
    </ListItemButton>
  ));
}

export const DeskList: FC = () => {
  return <List>{DeskItem()}</List>;
};
