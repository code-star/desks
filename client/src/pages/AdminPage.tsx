import {
  CardContent,
  CardHeader,
  CardActions,
  Card,
  Grid,
  Button,
} from "@mui/material";
import { FC, useState } from "react";
import { BookingList } from "../components/BookingList";
import { DeskList } from "../components/DeskList";
import { FormContext } from "../FormContext";

const AdminPage: FC = () => {
  const [sortVariant, setSortVariant] = useState("");
  const store = {
    sortVariant: [sortVariant, setSortVariant],
  };
  return (
    <FormContext.Provider value={store}>
      <Grid container spacing={5} padding={5} direction="row">
        <Grid item>
          <Card elevation={6} sx={{ width: { xs: "100%", md: "900px" } }}>
            <CardHeader title="All bookings" />
            <CardContent>
              <BookingList />
            </CardContent>
            <CardActions sx={{ justifyContent: "space-between" }}>
              <Button variant="outlined" onClick={() => setSortVariant("name")}>
                Sort by name
              </Button>
              <Button variant="outlined" onClick={() => setSortVariant("desk")}>
                Sort by desk
              </Button>
              <Button
                variant="outlined"
                onClick={() => setSortVariant("nTime")}
              >
                Sort by nearest time
              </Button>
              <Button
                variant="outlined"
                onClick={() => setSortVariant("fTime")}
              >
                Sort by furthest time
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item>
          <Card elevation={6} sx={{ width: { xs: "100%", md: "900px" } }}>
            <CardHeader title="All desks" />
            <CardContent>
              <DeskList />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </FormContext.Provider>
  );
};
export default AdminPage;
