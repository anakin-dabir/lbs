import {useEffect, useState, useRef} from 'react';
import axios from 'axios';
import * as tt from '@tomtom-international/web-sdk-maps';
import '@tomtom-international/web-sdk-maps/dist/maps.css';
import * as turf from '@turf/turf';

function App() {
  const api_key = '8heklGGF5vF1b9RMUZZ2Rg2rlHTPB2ms';
  const admin_key = 'WWppeLthzPxP5UjKbXipqxKKoQ4O348tS2NDdp6QkgM7s4we';
  const project_id = '3a603903-ca43-462f-b4cc-f78e7389f5eb';
  const [userLocation, setUserLocation] = useState({lat: 0, lon: 0});
  const [fence_id, set_fence_id] = useState('');
  const [geofenceData] = useState({
    object: 'my_driver',
    fenceName: 'my_fence',
    time: new Date().toISOString(),
  });
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
  const mapContainer = useRef();
  async function createGeofence(lng, lat) {
    const request = await axios({
      method: 'post',
      url: `https://api.tomtom.com/geofencing/1/projects/${project_id}/fence?adminKey=${admin_key}&key=${api_key}`,
      headers: {'Content-Type': 'application/json'},
      data: JSON.stringify({
        name: `Area ${Math.floor(Math.random() * 10000)}`,
        type: 'Feature',
        geometry: {
          radius: 200,
          type: 'Point',
          shapeType: 'Circle',
          coordinates: [lng, lat],
        },
      }),
    });
    const response = await request.data;
    console.log({response});
    return response.id;
  }
  useEffect(() => {
    const AMSTERDAM = {
      lon: 4.896029,
      lat: 52.371807,
    };
    let map = tt.map({
      key: api_key,
      container: mapContainer.current.id,
      center: AMSTERDAM,
      zoom: 10,
      language: 'en-GB',
    });
    map.addControl(new tt.FullscreenControl());
    map.addControl(new tt.NavigationControl());
    map.on('click', e => {
      const {lng, lat} = e.lngLat;
      const sourceID = `circleData ${Math.floor(Math.random() * 10000)}`;
      let center = turf.point([lng, lat]);
      let radius = 10;
      let options = {
        steps: 15,
        units: 'kilometers',
      };
      let circle = turf.circle(center, radius, options);
      map.addSource(sourceID, {
        type: 'geojson',
        data: circle,
      });

      Promise.all([createGeofence(lng, lat)]).then(result => {
        axios({
          method: 'get',
          url: `https://api.tomtom.com/geofencing/1/fences/${result[0]}?key=${api_key}`,
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then(response => response.data)

          .then(result => {
            map.addLayer({
              id: `circle ${Math.floor(Math.random() * 10000)}`,
              type: 'fill',
              source: sourceID,
              paint: {
                'fill-color': 'blue',
                'fill-opacity': 0.6,
              },
            });
            console.log({result});
            set_fence_id(result.id);
          });
      });
    });

    function addMarker(lnglat) {
      const marker = new tt.Marker({
        draggable: true,
      })
        .setLngLat(lnglat)
        .addTo(map);
      function onDragEnd() {
        var lngLat = marker.getLngLat();
        new tt.Popup({
          closeOnClick: false,
        })

          .setLngLat(lngLat)
          .setHTML(
            `<div>
            <p> The object "
${geofenceData.object}
" crossed "
${geofenceData.fenceName}
" at 
${geofenceData.time}
</p>
          </div>
`
          )

          .addTo(map);

        marker.on('dragend', onDragEnd);
      }
    }

    map.on('click', e => {
      addMarker(e.lngLat);
    });
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
