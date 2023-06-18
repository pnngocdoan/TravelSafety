import React, { useState, useEffect, useCallback } from 'react'
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import SearchBar from './SearchBar.js'
import "./Map.css"
import colors from "./data/ColorRange.js"
import {
  faBuildingCircleXmark,
  faBuildingCircleExclamation,
  faBuildingCircleCheck,
  faTrafficCone
} from '@fortawesome/free-solid-svg-icons'
import InfoWindowContent from './InfoWindowContent.js'

const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY
const MAP_ID = process.env.REACT_APP_GOOGLE_MAPS_ID


// make it into user's location
const center = {
  lat: 33.56,
  lng: -117.72
};

function MapContainer() {
  const [libraries] = useState(['places']);
  const [map, setMap] = useState(null);
  const [location, setLocation] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);

  const onLoad = useCallback((map) => {
    setMap(map)
  });
  useEffect(() => {
    if (location) {
      // safety score
      const level = Math.floor(Math.random() * 100) + 1;
      let icon;
      if (level < 40) {
        icon = faBuildingCircleXmark.icon[4]
      }
      else if (level < 60) {
        icon = faBuildingCircleExclamation.icon[4]
      }
      else {
        icon = faBuildingCircleCheck.icon[4]
      }
      const newMarker = {
        position: location,
        icon: {
          path: icon,
          fillColor: colors.normalColors[level],
          fillOpacity: 1,
          strokeWeight: 1.25,
          strokeColor: "black",
          scale: 0.05,
        },
        content: {
          "overall": 44,
          "lgbtq": 37,
          "medical": 69,
          "physicalHarm": 34,
          "politicalFreedom": 50,
          "theft": 42,
          "women": 33
        }
      }
      console.log("The safety level of this place is ", level)
      setMarkers((prevMarkers) => [...prevMarkers, newMarker])
    }
  }, [location])
  const handleDrag = () => {
    const center = map.getCenter()
    const bounds = map.getBounds()
    console.log("Center:", center);
    console.log("Bounds:", bounds);
  }
  return (
    <LoadScript
      googleMapsApiKey={API_KEY}
      libraries={libraries}
    >
      <div className="map-container">
        <div className="search-bar-container">
          <SearchBar setLocation={setLocation} />
          {console.log(location)}
        </div>
        <div className="map">
          {console.log("how many times you are repeatibf")}
          <GoogleMap
            mapContainerClassName="map-inner"
            center={center}
            zoom={10}
            options={{ mapId: MAP_ID }}
            onLoad={onLoad}
            onDragEnd={handleDrag}
          >
            {markers && markers.map((marker) => (
              <Marker
                position={marker.position}
                icon={marker.icon}
                onClick={() => setSelectedMarker(marker)}
              />
            ))}
            {selectedMarker && (
              <InfoWindow position={selectedMarker.position}>
                <InfoWindowContent content={selectedMarker.content} />
              </InfoWindow>
            )}
          </GoogleMap>
        </div>
      </div>
    </LoadScript>
  )
}

export default MapContainer;

