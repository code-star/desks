import { Stack, Button, Snackbar, Typography, IconButton } from "@mui/material";
import { useState, FC, useEffect } from "react";
import { CheckinDeskList } from "../components/CheckinDeskList";
import CloseIcon from "@mui/icons-material/Close";
import "../styles.css"

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
    <div>
      <Stack spacing={2}>
        {/* TODO issue 58 better MUI styling */}
        <Typography className="headerText">{deskId}</Typography>
        <Button
          variant="contained"
          color="secondary"
          disabled={currentDeskState === "unavailable"}
          onClick={handleToggleChecked}
        >
          {currentDeskState === "free" ? "Check in" : "Check out"}
        </Button>
        <CheckinDeskList deskId={deskId} />
      </Stack>
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
    </div>
  );
};

export default CheckinPage;
