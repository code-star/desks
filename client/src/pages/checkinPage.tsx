import { Stack } from "@mui/material";
import Button from "@mui/material/Button";
import { useState, FC, useEffect } from "react";
import { CheckinDeskList } from "../components/CheckinDeskList";

const CheckinPage: FC = () => {
  const deskId = document.location.search.substr(1);
  const [currentDeskState, setCurrentDeskState] = useState("free");

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
          check in/ uit
        </Button>
        {currentDeskState === "free" ? "uitgechecked" : "ingechecked"}
        <CheckinDeskList deskId={deskId} />
      </Stack>
    </div>
  );
};

export default CheckinPage;
