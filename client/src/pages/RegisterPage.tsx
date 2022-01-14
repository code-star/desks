import {
    Card,
    CardContent,
    CardHeader,
    CardActions,
    TextField,
    Stack,
    Button,
    Box,
    Typography
  } from "@mui/material";
  import { FC,useState } from "react";
  import { User } from "../types";
  import { useHistory } from "react-router-dom";
  
  const USER_ROUTE_URL = "/desks/user";
  const LOGIN_ROUTE_URL = "/desks/login";
  
  const RegisterPage: FC = () => {
      const [userName, setUserName] = useState("");
      const [password, setPassword] = useState("");
      const [confirmPassword, setConfirmPassword] = useState("");
      const history = useHistory();
          const createUser = async () => {
            if(password === confirmPassword){
                const data = await fetch(`${process.env.REACT_APP_ROOT_URL}api/createUser`, {
                    method: "PATCH",
                    headers: {
                      "Content-type": "application/json; charset=UTF-8",
                    },
                    body: JSON.stringify({
                      name: userName,
                      password,
                    }),
                  });
                  const json = await data.json();
                  if (json.user) {
                      //TODO create alert when account is made
                  }
                  history.push(USER_ROUTE_URL);
                  return
            }
            //TODO alert password doesnt match
          };
          const areFieldsEmpty = ()=>{
              return userName.length === 0 || password.length === 0 || confirmPassword.length === 0;
          }
    return (
      <Box sx={{ p: { xs: 1, md: 3 }, pt: { xs: 3, md: 3 } }}>
        <Card
          elevation={6}
          className="basecard"
          sx={{ width: { xs: "100%", md: "900px" } }}
        >
          <CardHeader title="Register" sx={{ textAlign: "center" }} />
          <CardContent>
            <Stack alignItems="center" spacing={4}>
              <TextField label="Email address" onChange={(event) =>setUserName(event.target.value)} sx={{ width: "25rem" }} />
              <TextField
                label="Password"
                onChange={(event)=> setPassword(event.target.value)}
                sx={{ width: "25rem" }}
                type="password"
              />
               <TextField
                label="Confirm password"
                onChange={(event)=> setConfirmPassword(event.target.value)}
                sx={{ width: "25rem" }}
                type="password"
              />
              <Button disabled={areFieldsEmpty()} onClick={createUser} variant="contained">Register</Button>
            </Stack>
          </CardContent>
          <CardActions sx={{justifyContent: "flex-end"}}>
                <Typography> already an account? </Typography>
                <Button color="primary" href={LOGIN_ROUTE_URL}> Log in</Button>
          </CardActions>
        </Card>
      </Box>
    );
  };
  
  export default RegisterPage;  