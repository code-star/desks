import { Stack, Button, Snackbar } from "@mui/material";
import { useState, FC, useEffect } from "react";
import { CheckinDeskList } from "../components/CheckinDeskList";

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
    <div className="CheckinPage">
      <Stack spacing={2}>
        <Button
          variant="contained"
          color="secondary"
          disabled={currentDeskState === "unavailable"}
          onClick={handleToggleChecked}
        >
          {currentDeskState === "free" ? "Check in" : "Check uit"}
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
          message={currentDeskState === "free" ? "uitgechecked" : "ingechecked"}
        />
    </div>
  );
};

export default CheckinPage;
