import { List, ListItemButton } from "@mui/material";
import { useState, FC, useEffect } from "react";
import {deskState, DeskType} from "../types"




function DeskItem(){
    const [currentDeskList, setCurrentDeskList] = useState([] as DeskType[]);
    useEffect(() => {
    const setDeskList = async () => {
        const data = await fetch(`${process.env.REACT_APP_ROOT_URL}api/desk/list`);
        const json = await data.json();
        setCurrentDeskList(json.deskList);
    }
    setDeskList();
},[]);
    return(
        currentDeskList.map( desk =>
        <ListItemButton>
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