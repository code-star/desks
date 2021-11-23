import { Toolbar, IconButton, AppBar, Typography } from "@mui/material";
import AccountBoxIcon from "@mui/icons-material/AccountBox";

function TopBar() {
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
}
export default TopBar;
