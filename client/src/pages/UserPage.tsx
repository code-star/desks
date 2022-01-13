import { Card, CardContent, CardHeader, Box } from "@mui/material";
import { FC } from "react";
import { UserDeskList } from "../components/UserDeskList";

const UserPage: FC = () => {
  return (
    <Box sx={{ p: { xs: 1, md: 3 }, pt: { xs: 3, md: 3 } }}>
      <Card
        elevation={6}
        className="basecard"
        sx={{ width: { xs: "100%", md: "900px" } }}
      >
        <CardHeader title="Username" sx={{ textAlign: "center" }} />
        <CardContent>
            <UserDeskList/>
        </CardContent>
      </Card>
    </Box>
  );
};

export default UserPage;
