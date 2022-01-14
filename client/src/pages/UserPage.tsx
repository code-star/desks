import { Card, CardContent, CardHeader, CardActions, Box, Button } from "@mui/material";
import { FC} from "react";
import { UserDeskList } from "../components/UserDeskList";
import { BOOKING_ROUTE_URL } from "../routeUrls";

const UserPage: FC = () => {

  return (
    <Box sx={{ p: { xs: 1, md: 3 }, pt: { xs: 3, md: 3 } }}>
      <Card
        elevation={6}
        className="basecard"
        sx={{ width: { xs: "100%", md: "900px" } }}
      >
        <CardHeader title="username" sx={{ textAlign: "center" }} />
        <CardContent>
            <UserDeskList/>
        </CardContent>
        <CardActions sx={{justifyContent: "flex-end"}}>
            <Button variant="outlined" href={BOOKING_ROUTE_URL}>Make new booking</Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default UserPage;
