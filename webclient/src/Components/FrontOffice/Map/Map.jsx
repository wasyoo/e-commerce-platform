import React from 'react';
import MapDirection from './MapDirection';

const Map = () => (
  <div>
    <MapDirection
      googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDIPxGxBA0G6wkta_UytfNztq1sDClv6Vs&v=3.exp&libraries=geometry,drawing,places"
      loadingElement={<div style={{ height: '100%' }} />}
      containerElement={<div style={{ height: '100vh' }} />}
      mapElement={<div style={{ height: '100%' }} />}
    />
  </div>
);

export default Map;
