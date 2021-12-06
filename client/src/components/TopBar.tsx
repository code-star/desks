import { Toolbar, IconButton, AppBar, Typography } from "@mui/material";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import React, { FC } from "react";

export const TopBar: FC = () => {
  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        <Typography
          variant="h6"
          color="inherit"
          component="div"
          sx={{ flexGrow: 1 }}
        >
          Username
        </Typography>
        <IconButton size="large" color="inherit">
          <AccountBoxIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};
