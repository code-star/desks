import {
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Typography,
  TextField,
  Stack,
  Button,
  Box
} from "@mui/material";
import { FC,useState } from "react";
import { User } from "../types";
import { useHistory } from "react-router-dom";
import { USER_ROUTE_URL, REGISTER_ROUTE_URL } from "../routeUrls";

const LoginPage: FC = () => {

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();
        const getUser = async () => {
            const user = await fetch(
                `${process.env.REACT_APP_ROOT_URL}api/user/${userName}`
              );
          const userJson = await user.json();
          const currentUser: User = userJson.user;
          if(currentUser.password === password){
          history.push(USER_ROUTE_URL);
          }
          
        };
        const areFieldsEmpty = ()=>{
            return userName.length === 0 || password.length === 0;
        }
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
            <TextField label="Email address" onChange={(event) =>setUserName(event.target.value)} sx={{ width: "25rem" }} />
            <TextField
              label="Password"
              onChange={(event)=> setPassword(event.target.value)}
              sx={{ width: "25rem" }}
              type="password"
            />
            <Button disabled={areFieldsEmpty()} onClick={getUser} variant="contained">Sign in</Button>
          </Stack>
        </CardContent>
        <CardActions sx={{justifyContent: "flex-end"}}>
                <Typography> dont have an account? </Typography>
                <Button color="primary" href={REGISTER_ROUTE_URL}> Register</Button>
          </CardActions>
      </Card>
    </Box>
  );
};

export default LoginPage;
