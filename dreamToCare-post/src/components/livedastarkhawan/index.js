/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import { useDispatch, useSelector } from 'react-redux';
import 'mapbox-gl/dist/mapbox-gl.css';
import { CreateLocation } from '../../actions/locationsActions';

const Dastarkhuan = () => {
  const dispatch = useDispatch();
  const MAP_TOKEN = 'pk.eyJ1Ijoibm9yYWl6IiwiYSI6ImNrd241emhjNDJpamgyc280cmc1NGo5bnAifQ.MT8NS7rW9ZalF9GJdz1Fhg';
  const { auth, locations } = useSelector((state) => ({
    auth: state.auth,
    locations: state.locations,
  }));
  const [location, setLocation] = useState({ longitude: 74.35650138437623, latitude: 31.5821157735562 });
  const [viewport, setViewport] = useState({
    width: '100%',
    height: 800,
    latitude: 31.5821157735562,
    longitude: 74.35650138437623,
    zoom: 8,
  });

  useEffect(() => {
    if (locations) {
      const myLocation = locations.find((e) => e.creator._id === auth.id);
      if (navigator.geolocation && !myLocation) {
        navigator.geolocation.getCurrentPosition((loc) => {
          setLocation({ latitude: loc.coords.latitude, longitude: loc.coords.longitude });
          setViewport({ ...viewport, latitude: loc.coords.latitude, longitude: loc.coords.longitude });
        });
      } else {
        setLocation({ latitude: myLocation.latitude, longitude: myLocation.longitude });
        setViewport({ ...viewport, latitude: myLocation.latitude, longitude: myLocation.longitude });
      }
    }
  }, [locations]);

  const submitLocation = () => {
    dispatch(CreateLocation(location));
  };

  const otherLocations = locations.length && locations.filter((e) => e.creator._id !== auth.id);

  return (
    <div className='container py-5'>
      <div className='col-md-12'>
        <ReactMapGL
          {...viewport}
          mapboxApiAccessToken={MAP_TOKEN}
          onViewportChange={(nextViewport) => setViewport(nextViewport)}
        >
          <Marker
            latitude={location.latitude}
            longitude={location.longitude}
            offsetLeft={-20}
            offsetTop={-10}
            draggable
            onDragEnd={(loc) => setLocation({ longitude: loc.lngLat[0], latitude: loc.lngLat[1] })}
          >
            <i className='fas fa-map-marker text-danger' style={{ fontSize: '30px' }}></i>
          </Marker>
          {otherLocations.length &&
            otherLocations.map((e) => (
              <Marker key={e._id} latitude={e.latitude} longitude={e.longitude} offsetLeft={-20} offsetTop={-10}>
                <i className='fas fa-map-marker text-success' style={{ fontSize: '30px' }}></i>
              </Marker>
            ))}
        </ReactMapGL>
        <div className='d-flex justify-content-center my-3'>
          <button data-toggle='modal' data-target='#donationModal' className='theme-btn' onClick={submitLocation}>
            Add Location
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dastarkhuan;
