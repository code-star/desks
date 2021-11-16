import Button from '@mui/material/Button';
import React, { useState } from 'react';

function Checkin_page() {
    const deskId = document.location.search.substr(1);
    const [currentDeskState, setCurrentDeskState] = useState('free');
  
    const handleToggleChecked = ()=>{
      fetch(`http://localhost:3001/api/desk/${deskId}`,{
        //can also be a PUT method
        method: 'PATCH',
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify({
          deskState : currentDeskState,
          deskId : deskId
        })
      })
      .then((data) => data.json())
      .then((data) => {
      console.log(JSON.stringify(data))
      setCurrentDeskState(data.deskState);
    });
    }
    return (
      <div className="CheckinPage">
        <header className="checkinHeader">
          <Button variant = "contained" color="secondary" onClick={handleToggleChecked}>check in/ uit</Button>
          {currentDeskState === 'free' ? 'uitgechecked' : 'ingechecked' }
        </header>
      </div>
    );
  }
  
  export default Checkin_page;