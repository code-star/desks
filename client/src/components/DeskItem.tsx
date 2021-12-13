import { ListItem } from "@mui/material";
import { FC } from "react";
import { DeskType } from "../types";

type Props = {
  desk: DeskType;
};
export const DeskItemCheckIn: FC<Props> = ({ desk }) => {
  return <ListItem key={desk.desk_id}>{desk.desk_id}</ListItem>;
};
