import { Toolbar, IconButton, AppBar, Typography } from "@mui/material";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import React, { FC } from "react";
import "../styles.css";

export const TopBar: FC = () => {
  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        <Typography
          className="headerText"
          color="inherit"
          component="div"
          sx={{ flexGrow: 1 }}
        >
          Ordina
        </Typography>
        <IconButton size="large" color="inherit">
          <AccountBoxIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};
