import { Button, Snackbar, Box, IconButton, Card, CardHeader, CardContent, Divider, Stack } from "@mui/material";
import { useState, FC, useEffect } from "react";
import { CheckinDeskList } from "../components/CheckinDeskList";
import CloseIcon from "@mui/icons-material/Close";

const CheckinPage: FC = () => {
  const deskId = document.location.search.substr(1);
  const [currentDeskState, setCurrentDeskState] = useState("free");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const setInitialDeskState = async () => {
      const data = await fetch(
        `${process.env.REACT_APP_ROOT_URL}api/desk/${deskId}`
      );
      const json = await data.json();
      setCurrentDeskState(json.deskState);
    };
    setInitialDeskState();
  }, [deskId]);

  const handleToggleChecked = async () => {
    const data = await fetch(
      `${process.env.REACT_APP_ROOT_URL}api/desk/${deskId}`,
      {
        method: "PATCH",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({
          deskState: currentDeskState,
          deskId: deskId,
        }),
      }
    );
    const json = await data.json();
    setCurrentDeskState(json.deskState);
    setOpen(true);
  };

  return (
    <Box sx={{ p: { xs: 1, md: 3 }, pt: { xs: 3, md: 3 } }}>
      <Card  
      elevation={6}
      className="basecard"
      sx={{ width: { xs: "100%", md: "900px" } }}>
        <CardHeader title={`Desk ${deskId}`}/>
        <CardContent>
          <Stack spacing={2}>
        <Button
          variant="contained"
          sx={{width:"200px"}}
          color="secondary"
          disabled={currentDeskState === "unavailable"}
          onClick={handleToggleChecked}
        >
          {currentDeskState === "free" ? "Check in" : "Check out"}
        </Button>
        <Divider/>
        <CheckinDeskList deskId={deskId} />
        </Stack>
        </CardContent>
        </Card>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        autoHideDuration={6000}
        onClose={() => {
          setOpen(false);
        }}
        action={
          <IconButton onClick={() => setOpen(false)}>
            <CloseIcon color={"primary"} />
          </IconButton>
        }
        message={currentDeskState === "free" ? "checked out" : "checked in"}
      />
    </Box>
  );
};

export default CheckinPage;
