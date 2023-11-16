import {useEffect, useState, useRef} from 'react';
import axios from 'axios';
import * as tt from '@tomtom-international/web-sdk-maps';
import '@tomtom-international/web-sdk-maps/dist/maps.css';

function App() {
  const [userLocation, setUserLocation] = useState({lon: '', lat: ''});
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const {latitude, longitude} = position.coords;
          setUserLocation({lat: latitude, lon: longitude});
        },
        error => {
          console.error(error.message);
        }
      );
    } else {
      console.error('Geolocation is not supported');
    }
  }, []);
  const [map, setMap] = useState();
  const mapContainer = useRef();
  useEffect(() => {
    const Amsterdam = {lon: 2, lat: 4};
    let map = tt.map({
      key: 'nLGbvV7o3kUqMaiDZ7YHDMwMecBmH3M6',
      container: mapContainer.current.id,
      center: Amsterdam,
      zoom: 10,
      language: 'en-GB',
      basePath: '/lbs/sdk',
    });
    map.addControl(new tt.FullscreenControl());
    map.addControl(new tt.NavigationControl());
    setMap(map);
    return () => {
      map.remove();
    };
  }, []);

  return (
    <div className='container'>
      <div ref={mapContainer} className='map' id='map' />
    </div>
  );
}

export default App;
