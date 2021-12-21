import { Toolbar, Drawer, Divider, List, ListItem, ListItemText, ListItemButton, Card, CardContent, Typography, CardHeader, Box, CardActions, Button } from "@mui/material";
import { FC } from "react";

const DRAWER_WIDTH = 240;
const BOOKING_ROUTE_URL = "/desks/book";
const BOOKING_LABEL = "Make a new booking";
const CHECKIN_ROUTE_URL = "/desks/checkin/?b2.1";
const CHECKIN_LABEL = "Check in at desk b2.1";

const HomePage: FC = () => {
    return <Box sx={{ display: "flex" }}>
        <Drawer variant="permanent" anchor="left" sx={{
            width: DRAWER_WIDTH,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
                width: DRAWER_WIDTH,
                boxSizing: 'border-box',
            },
        }}>
            <Toolbar />
            <Divider />
            <List>
                <ListItem>
                    <ListItemButton component="a" href={BOOKING_ROUTE_URL}>
                        <ListItemText primary={BOOKING_LABEL} />
                    </ListItemButton>
                </ListItem>
                <ListItem>
                    <ListItemButton component="a" href={CHECKIN_ROUTE_URL}>
                        <ListItemText primary={CHECKIN_LABEL} />
                    </ListItemButton>
                </ListItem>
            </List>
        </Drawer>
        <Box component="main"
            sx={{ flexGrow: 1, p: 3 }}>
            <Card>
                <CardHeader title="Smart desk booking" subheader="Ordina" />
                <CardContent>
                    <Typography variant="h6" gutterBottom>Booking a desk</Typography>
                    <Typography gutterBottom>Here you can book a desk for you and your team. Keep in mind ...</Typography>
                    <Typography variant="h6" gutterBottom>Checking in</Typography>
                    <Typography>To check in ...</Typography>
                </CardContent>
                <CardActions>
                    <Button component="a" href={BOOKING_ROUTE_URL}>{BOOKING_LABEL}</Button>
                    <Button component="a" href={CHECKIN_ROUTE_URL} color="secondary">{CHECKIN_LABEL}</Button>
                </CardActions>
            </Card>
        </Box>
    </Box>
}

export default HomePage;
