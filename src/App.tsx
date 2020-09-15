import React from 'react';
import logo from './logo.svg';
import './App.css';
import OpenHouseSearch from "./OpenHouseSearch";
import ScrollComponent from "./InfiniteLoading";

function App() {
  return (
    <div className="App">
      {/* <OpenHouseSearch /> */}
      <ScrollComponent />
    </div>
  );
}

export default App;
