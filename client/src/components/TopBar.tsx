import {
  Toolbar,
  IconButton,
  AppBar,
  Typography,
  Menu,
  MenuItem,
  Link,
} from "@mui/material";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { FC, useState } from "react";
import img from "../images/ordina_logo.png";
import { LOGIN_ROUTE_URL } from "../routeUrls";

export const TopBar: FC = () => {
  const myStorage = window.sessionStorage;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (myStorage.getItem("activeUser")) {
      setAnchorEl(event.currentTarget);
    }
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogOut = () => {
    setAnchorEl(null);
    myStorage.clear();
  };

  return (
    <AppBar position="static">
      <Toolbar variant="dense" sx={{ gap: "10px" }}>
        <img src={img} alt="logo" style={{ height: "2.5rem" }} />
        <Typography
          variant="h5"
          color="inherit"
          component="div"
          sx={{ flexGrow: 1, fontSize: { xs: "10px", md: "inherit" } }}
        >
          Smart office management
        </Typography>
        <Typography>{myStorage.getItem("activeUser")}</Typography>
        <IconButton size="large" color="inherit" onClick={handleClick}>
          <AccountBoxIcon />
        </IconButton>
      </Toolbar>
      <Menu
        id="user-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem>
          <Link href={LOGIN_ROUTE_URL} onClick={handleLogOut}>
            Log out
          </Link>
        </MenuItem>
      </Menu>
    </AppBar>
  );
};
