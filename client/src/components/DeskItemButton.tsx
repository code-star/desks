import { ListItemButton } from "@mui/material";
import { FC, useContext } from "react";
import { FormContext } from "../pages/bookingPage";
import { DeskType } from "../types";

type Props = {
  desk: DeskType;
};
export const DeskItem: FC<Props> = ({ desk }) => {
  const {
    desk: [selectedDesk, setSelectedDesk],
  } = useContext(FormContext);
  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    desk: string
  ) => {
    setSelectedDesk(desk);
  };
  return (
    <ListItemButton
      selected={selectedDesk === desk.desk_id}
      onClick={(event) => handleListItemClick(event, desk.desk_id)}
      key={desk.desk_id}
    >
      {desk.desk_id}
    </ListItemButton>
  );
};
