import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import NavBar from './components/Navbar';
import RegionPicker from './components/RegionPicker';
import Countries from './components/Countries';
import AllCountries from './components/AllCountries';
import CountriesByPopulation from './components/CountriesByPopulation';
import CountriesByLanguage from './components/CountriesByLanguage';
import IconMenu from './components/IconMenu';

const App = () => {
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [viewAll, setViewAll] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [sortByPopulation, setSortByPopulation] = useState(false);
  const [sortByLanguage, setSortByLanguage] = useState (false);
  const menuRef = useRef(null);

  const onRegionPickHandler = (region) => {
    setSelectedRegion(region);
    setViewAll(false);
    setSortByPopulation(false);
    setSortByLanguage(false);
  };

  const clearSelectedRegionHandler = () => {
    setSelectedRegion(null);
    setViewAll(false);
    setSortByPopulation(false);
    setSortByLanguage(false);
  };

  const handleViewAll = () => {
    setViewAll(true);
    setSelectedRegion(null);
    setSortByPopulation(false);
    setSortByLanguage(false);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSortByPopulation = () => {
    setSortByPopulation(true);
    setSortByLanguage(false);
    setViewAll(false);
    setSelectedRegion(null);
    handleMenuClose();
  };

  const handleSortByLanguage = () => {
    setSortByLanguage(true);
    setSortByPopulation(false);
    setViewAll(false);
    setSelectedRegion(null);
    handleMenuClose();
  };

  // Close menu if clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target) && anchorEl) {
        handleMenuClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [anchorEl]);

  return (
    <div className="App">
      <NavBar onMenuOpen={handleMenuOpen} />

      {anchorEl && (
        <IconMenu
          anchorEl={anchorEl}
          handleClose={handleMenuClose}
          handleViewAll={handleViewAll}
          handleSortByPopulation={handleSortByPopulation}
          handleSortByLanguage={handleSortByLanguage}
          menuRef={menuRef}
        />
      )}

      {sortByLanguage ? (
        <CountriesByLanguage clearSelectedRegionHandler={clearSelectedRegionHandler} />
      ) : viewAll ?
      (
        <AllCountries clearSelectedRegionHandler={clearSelectedRegionHandler} />
      ) : sortByPopulation ? (
        <CountriesByPopulation clearSelectedRegionHandler={clearSelectedRegionHandler} />
      ) : selectedRegion ? (
        <Countries 
          clearSelectedRegionHandler={clearSelectedRegionHandler}
          selectedRegion={selectedRegion}
        />
      ) : (
        <RegionPicker onRegionPickHandler={onRegionPickHandler} />
      )}
    </div>
  );
};

export default App;