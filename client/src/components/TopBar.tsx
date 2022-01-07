import { Toolbar, IconButton, AppBar, Typography } from "@mui/material";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { FC } from "react";

export const TopBar: FC = () => {
  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        <Typography
          variant="h5"
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
