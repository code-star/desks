import Button from '@mui/material/Button';
import React, { useState } from 'react';

function Checkin_page() {
    const deskId = document.location.search.substr(1);
    const [currentDeskState, setCurrentDeskState] = useState(false);
    //is it usefull to also store the state here?
  
    const handleToggleChecked = ()=>{
      fetch(`http://localhost:3001/api/desk/${deskId}`,{
        //can also be a PUT method
        method: 'PATCH',
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify({
          deskState : !currentDeskState,
          deskId : deskId
        })
      })
      .then((data) => data.json())
      .then((data) => {
      console.log(JSON.stringify(data))
      setCurrentDeskState(data.deskState);
      // document.getElementById(
      //     "text"
      //   ).innerHTML = data.deskState ? 'ingechecked' : 'uitgechecked';
    });
    }
    return (
      <div className="Checkin_page">
        <header className="checkin_header">
          <Button variant = "contained" color="secondary" onClick={handleToggleChecked}>check in/ uit</Button>
          {currentDeskState ? 'ingechecked' : 'uitgechecked'}
        </header>
      </div>
    );
  }
  
  export default Checkin_page;