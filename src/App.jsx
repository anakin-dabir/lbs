import {useEffect, useState, useRef} from 'react';
import axios from 'axios';
import * as tt from '@tomtom-international/web-sdk-maps';
import '@tomtom-international/web-sdk-maps/dist/maps.css';

function App() {
  const [map, setMap] = useState();
  const mapContainer = useRef();
  const AMSTERDAM = {
    lon: 4.896029,
    lat: 52.371807,
  };
  useEffect(() => {
    let map = tt.map({
      key: 'nLGbvV7o3kUqMaiDZ7YHDMwMecBmH3M6',
      container: mapContainer.current.id,
      center: AMSTERDAM,
      zoom: 10,
      language: 'en-GB',
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
      <nav className='nav'>
        <h1>Geofencing in React</h1>
      </nav>

      <div ref={mapContainer} className='map' id='map' />
    </div>
  );
}

export default App;
