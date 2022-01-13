import {
  Card,
  CardContent,
  CardHeader,
  TextField,
  Stack,
  Button,
  Box
} from "@mui/material";
import { FC } from "react";

const BOOKING_ROUTE_URL = "/desks/book";

const LoginPage: FC = () => {
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
            <TextField label="Email address" sx={{ width: "25rem" }} />
            <TextField
              label="Password"
              sx={{ width: "25rem" }}
              type="password"
            />
            <Button href={BOOKING_ROUTE_URL} variant="contained">Sign in</Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default LoginPage;
