import React, { useState } from 'react';
import './App.css';
import NavBar from './components/Navbar';
import RegionPicker from './components/RegionPicker';
import Countries from './components/Countries';

const App = () => {
  const [selectedRegion, setSelectedRegion] = useState(null);


  const onRegionPickHandler = (region) => {
    setSelectedRegion(region);
  };

  const clearSelectedRegionHandler = () => {
    setSelectedRegion(null);
  };

  return (
    <div className="App">
      <NavBar />

      {selectedRegion ? (
        <Countries clearSelectedRegionHandler={clearSelectedRegionHandler}
        selectedRegion={selectedRegion}
        />
      ) : (
        <RegionPicker onRegionPickHandler={onRegionPickHandler}
        /> )}
      
    </div>
  );
};

export default App;
