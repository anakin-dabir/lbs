import {useEffect, useState, useRef} from 'react';
import axios from 'axios';
import * as tt from '@tomtom-international/web-sdk-maps';
import '@tomtom-international/web-sdk-maps/dist/maps.css';

function App() {
  const [userLocation, setUserLocation] = useState({lat: 0, lon: 0});
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const {latitude, longitude} = position.coords;
          setUserLocation({lat: latitude + 10, lon: longitude + 10});
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
    const AMSTERDAM = {
      lon: 4.896029,
      lat: 52.371807,
    };
    let map = tt.map({
      key: 'nLGbvV7o3kUqMaiDZ7YHDMwMecBmH3M6',
      container: mapContainer.current.id,
      center: AMSTERDAM,
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
