import { List, ListItemButton } from "@mui/material";
import { useState, FC, useEffect } from "react";
import { DeskType} from "../types"
let currentDesk:string;

export function getDesk(){
    return currentDesk
}

function DeskItem(){
    const [currentDeskList, setCurrentDeskList] = useState([] as DeskType[]);
    const [selectedDesk, setSelectedDesk] = useState("");
    useEffect(() => {
    const setDeskList = async () => {
        const data = await fetch(`${process.env.REACT_APP_ROOT_URL}api/desk/list`);
        const json = await data.json();
        setCurrentDeskList(json.deskList);
    }
    setDeskList();
    
},[]);

const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    desk: string,
  ) => {
    setSelectedDesk(desk);
    currentDesk = desk;
  };
    return(
        currentDeskList.map( desk =>
        <ListItemButton 
        selected={selectedDesk === desk.desk_id}
        onClick={(event) => handleListItemClick(event, desk.desk_id)}
        key={desk.desk_id}>
            {desk.desk_id}
        </ListItemButton>
        )
    );
}

export const DeskList: FC = () => {
    return (
    <List>
        {DeskItem()}
    </List>
    );
  };