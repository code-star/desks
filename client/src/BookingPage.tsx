import React from "react";
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import AppBar from '@mui/material/AppBar';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import StaticDatePicker from '@mui/lab/StaticDatePicker';
import TextField from '@mui/material/TextField';
import TimePicker from '@mui/lab/TimePicker';



function Booking_page(){
    const [dateValue, setDateValue] = React.useState<Date | null>(new Date());
    const [startTimeValue, setStartTimeValue] = React.useState<Date | null>(null);
    const [endTimeValue, setEndTimeValue] = React.useState<Date | null>(null);
    return(
        <div>
            <AppBar position="static">
                <Toolbar variant="dense">
                    <Typography variant="h6" color="inherit" component="div" sx={{ flexGrow: 1 }}>
                        Username
                    </Typography>
                    <IconButton
                        size="large"
                        color="inherit"
                    >
                        <AccountBoxIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
           <Grid container spacing={2}>
            	<Grid item xs={4}>
                    <h3>list desks</h3>
                </Grid>
                <Grid item xs={8}>
                    <h3>layout picture</h3>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <h3>date picker</h3>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <StaticDatePicker<Date>
                                        orientation="portrait"
                                        openTo="day"
                                        value={dateValue}
                                        onChange={(newValue) => {
                                            setDateValue(newValue);
                                        }}
                                        renderInput={(params) => <TextField {...params} />}
                            />
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={6}>
                            <h3>time pickers and button</h3>
                            <Card>
                                <CardContent>
                                    <Typography variant="body2">
                                        Start time
                                    </Typography>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <TimePicker
                                            value={startTimeValue}
                                            onChange={(newValue) => {
                                                setStartTimeValue(newValue);
                                            }}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </LocalizationProvider>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent>
                                    <Typography variant="body2">
                                        End time
                                    </Typography>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <TimePicker
                                            value={endTimeValue}
                                            onChange={(newValue) => {
                                                setEndTimeValue(newValue);
                                            }}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </LocalizationProvider>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>

                </Grid>
            </Grid>
        </div>
    );
}
export default Booking_page;