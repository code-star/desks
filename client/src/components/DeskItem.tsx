import { ListItem } from "@mui/material";
import { FC } from "react";
import { DeskType } from "../types";

type Props = {
  desk: DeskType;
};
export const DeskItemCheckIn: FC<Props> = ({ desk }) => {
  return <ListItem>{desk.desk_id}</ListItem>;
};
