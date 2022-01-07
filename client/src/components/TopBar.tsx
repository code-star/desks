import { Toolbar, IconButton, AppBar, Typography } from "@mui/material";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { FC } from "react";
import img from "../images/ordina_logo.png"

export const TopBar: FC = () => {
  return (
    <AppBar position="static">
      <Toolbar variant="dense" sx={{ gap:"10px"}} >
        <img src={img} alt="logo" style={{height:"2.5rem"}}/>
        <Typography
          variant="h5"
          color="inherit"
          component="div"
          sx={{ flexGrow: 1, fontSize:{xs:"10px", md: "inherit"}}}
        >
          Smart office management
        </Typography>
        <IconButton size="large" color="inherit">
          <AccountBoxIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};
