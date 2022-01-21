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
import { LOGIN_ROUTE_URL, USER_ROUTE_URL } from "../routeUrls";

export const TopBar: FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const user = sessionStorage.getItem("activeUser");

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (user) {
      setAnchorEl(event.currentTarget);
    }
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogOut = () => {
    setAnchorEl(null);
    sessionStorage.clear();
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
        {user ? (
          <Typography variant="body1">{JSON.parse(user).name}</Typography>
        ) : (
          ""
        )}
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
        <Link href={USER_ROUTE_URL}>
            To account
          </Link>
        </MenuItem>
        <MenuItem>
          <Link href={LOGIN_ROUTE_URL} onClick={handleLogOut}>
            Log out
          </Link>
        </MenuItem>
      </Menu>
    </AppBar>
  );
};
