import { Toolbar, Drawer, Divider, List, ListItem, ListItemText, ListItemButton, Card, CardContent, Typography, CardHeader, Box, CardActions, Button, LinearProgress, Alert, InputAdornment, TextField } from "@mui/material";
import { FC, useEffect, useState } from "react";
import "../styles.css"

const DRAWER_WIDTH = 240;
const BOOKING_ROUTE_URL = "/desks/book";
const BOOKING_LABEL = "Make a new booking";
const CHECKIN_ROUTE_URL = "/desks/checkin/?b2.";
const CHECKIN_LABEL = "Check in at desk b2.";

const HomePage: FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [deskNr, setDeskNr] = useState<number>(1);

    const getDesks = async () => {
        setIsLoading(true);
        try {
            const data = await fetch(
                `${process.env.REACT_APP_ROOT_URL}api/desk/list`
            );
            const { deskList } = await data.json() as { deskList: object[] };
            if (!Array.isArray(deskList)) {
                throw new Error("No desks in response");
            }
        } catch (error) {
            console.error(error);
            setHasError(true);
        }
        setIsLoading(false);
    }

    useEffect(() => {
        getDesks();
    }, []);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newDeskNr = parseInt(event.target.value, 10);
        if(!isNaN(newDeskNr)) {
            setDeskNr(newDeskNr);
        } else {
            console.error("Error: not a number, might be an intermediate value");
        }
    }

    return <Box sx={{ display: "flex" }}>
        <Drawer variant="permanent" anchor="left" sx={{
            display: { xs: "none", md: "block"},
            width: DRAWER_WIDTH,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
                width: DRAWER_WIDTH,
                boxSizing: 'border-box',
            },
        }}>
            <Toolbar />
            <Divider />
            {!hasError && <List>
                <ListItem>
                    <ListItemButton component="a" href={BOOKING_ROUTE_URL}>
                        <ListItemText primary={BOOKING_LABEL} />
                    </ListItemButton>
                </ListItem>
                <ListItem>
                    <ListItemButton component="a" href={`${CHECKIN_ROUTE_URL}${deskNr}`}>
                        <ListItemText primary={`${CHECKIN_LABEL}${deskNr}`} />
                    </ListItemButton>
                </ListItem>
            </List>}
        </Drawer>
        <Box component="main"
            sx={{ flexGrow: 1, p: { xs: 1, md: 3}, pt: { xs: 3, md: 3} }}>
            {isLoading && <LinearProgress />}
            <Card>
                <CardHeader title="Smart desk booking" subheader="Ordina" />
                <CardContent>
                    {hasError && <Alert severity="error">Error: API not available or failing!</Alert>}
                    <Typography variant="h6" gutterBottom>Booking a desk</Typography>
                    <Typography gutterBottom>Here you can book a desk for you and your team. Keep in mind ...</Typography>
                    <Typography variant="h6" gutterBottom>Checking in</Typography>
                    <Typography>To check in you can scan the QR code on the desk or type in the desk number below. Keep in mind ...</Typography>
                    <TextField
                        label="Desk number"
                        id="outlined-start-adornment"
                        sx={{ m: 1, width: '25ch' }}
                        InputProps={{
                            startAdornment: <InputAdornment position="start">B2.</InputAdornment>,
                        }}
                        value={deskNr}
                        onChange={handleChange}
                        type="number"
                    />
                </CardContent>
                {!hasError && <CardActions>
                    <Button component="a" href={BOOKING_ROUTE_URL}>{BOOKING_LABEL}</Button>
                    <Button component="a" href={`${CHECKIN_ROUTE_URL}${deskNr}`} color="secondary">{`${CHECKIN_LABEL}${deskNr}`}</Button>
                </CardActions>}
            </Card>
        </Box>
    </Box>
}

export default HomePage;
