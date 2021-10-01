import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
function App() {
  const deskId = document.location.search.substr(1);
  const [currentDeskState, setCurrentDeskState] = useState(false);
  //is it usefull to also store the state here?

  const handleToggleChecked = ()=>{
    fetch(`http://0.0.0.0:3001/api/desk/${deskId}`,{
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
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <button id="button" onClick={handleToggleChecked}>check in/ uit</button>
        {currentDeskState ? 'ingechecked' : 'uitgechecked'}
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
