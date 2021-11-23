import Button from "@mui/material/Button";
import React, { useState, FC, useEffect } from "react";

const CheckinPage: FC = () => {
  const deskId = document.location.search.substr(1);
  const [currentDeskState, setCurrentDeskState] = useState("free");

  
  useEffect(() => {
    const setInitialDeskState = async () => {
      const data = await fetch(`http://localhost:3001/api/desk/${deskId}`);
      const json = await data.json();
      setCurrentDeskState(json.deskState);
    };
    setInitialDeskState();
  }, [deskId]);

  const handleToggleChecked = async () => {
    const data = await fetch(`http://localhost:3001/api/desk/${deskId}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        deskState: currentDeskState,
        deskId: deskId,
      }),
    });
    const json = await data.json();
    setCurrentDeskState(json.deskState);
  };

  return (
    <div className="CheckinPage">
      <header className="checkinHeader">
        <Button
          variant="contained"
          color="secondary"
          disabled={currentDeskState === "unavailable"}
          onClick={handleToggleChecked}
        >
          check in/ uit
        </Button>

        {currentDeskState === "free" ? "uitgechecked" : "ingechecked"}
      </header>
    </div>
  );
};

export default CheckinPage;
