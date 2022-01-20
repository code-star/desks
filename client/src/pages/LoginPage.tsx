import {
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Typography,
  TextField,
  Stack,
  Button,
  Snackbar,
  IconButton,
  Box,
} from "@mui/material";
import { FC, useState } from "react";
import { REGISTER_ROUTE_URL } from "../routeUrls";
import CloseIcon from "@mui/icons-material/Close";

const LoginPage: FC = () => {
  window.Notification.requestPermission();
  const [logInFail, setLogInFail] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const getUser = async () => {
    const userCheck = await fetch(
      `${process.env.REACT_APP_ROOT_URL}api/user/${userName}/${password}`
    );
    const userCheckJson = await userCheck.json();
    const isValidUser: boolean = userCheckJson.isValid;
    if (isValidUser) {
      const json = `{"name": "${userName}", "role": "user"}`;
      sessionStorage.setItem("activeUser", json);
      // eslint-disable-next-line no-restricted-globals
      location.reload();
      console.log("test1");
      return;
    }
    setLogInFail(true);
    //TODO warning fields incorrect
  };
  const areFieldsEmpty = () => {
    return userName.length === 0 || password.length === 0;
  };
  return (
    <Box sx={{ p: { xs: 1, md: 3 }, pt: { xs: 3, md: 3 } }}>
      <Card
        elevation={6}
        className="basecard"
        sx={{ width: { xs: "100%", md: "900px" } }}
      >
        <CardHeader title="Sign in" sx={{ textAlign: "center" }} />
        <CardContent>
          <Stack alignItems="center" spacing={4}>
            <TextField
              label="Email address"
              onChange={(event) => setUserName(event.target.value)}
              sx={{ width: "25rem" }}
            />
            <TextField
              label="Password"
              onChange={(event) => setPassword(event.target.value)}
              sx={{ width: "25rem" }}
              type="password"
            />
            <Button
              disabled={areFieldsEmpty()}
              onClick={getUser}
              variant="contained"
            >
              Sign in
            </Button>
          </Stack>
        </CardContent>
        <CardActions sx={{ justifyContent: "flex-end" }}>
          <Typography> dont have an account? </Typography>
          <Button color="primary" href={REGISTER_ROUTE_URL}>
            {" "}
            Register
          </Button>
        </CardActions>
      </Card>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={logInFail}
        action={
          <IconButton
            onClick={() => {
              setLogInFail(false);
            }}
          >
            <CloseIcon color={"primary"} />
          </IconButton>
        }
        autoHideDuration={6000}
        onClose={() => {
          setLogInFail(false);
        }}
        message={`password or username is incorrect`}
      />
    </Box>
  );
};

export default LoginPage;
