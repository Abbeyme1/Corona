import React, { useState , useEffect} from 'react';
import ReactMapGL ,{Marker, Popup} from 'react-map-gl';
import * as coronaMarker from './data.json';
import './app.css';


function App() {

    const markerStyle = {
        background: 'none',
        border: 'none',
        cursor: 'pointer'
    }

    const [viewport, setViewport] = useState({
        latitude: 45.467134581917357,
        longitude: -75.546518086577947,
        height: '100vh',
        width: '100vw',
        zoom: 10
    });

    useEffect(() => {
        const listener = e => {
            if(e.key === 'Escape')
            {
                setSelectedMarker(null);
            }
        };
        window.addEventListener('keydown',listener);

        return () => {
            window.removeEventListener('keydown',listener);
        }
    } , [])

    const [selectedMarker,setSelectedMarker] = useState(null);

    return (
            <ReactMapGL {...viewport} 
            maxZoom={20}
            mapStyle='mapbox://styles/abbeyme/ckalkqt1g3x5q1iqh3ixrgsus'
            onViewportChange = {(viewport) => { setViewport(viewport)}}
            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}>

            {coronaMarker.data.map((mark) => (
                
                <Marker key={mark.id}
                latitude={mark.latitude}
                longitude={mark.longitude}
                >
                    <button style={markerStyle}
                    onClick={e => {
                        e.preventDefault();
                        setSelectedMarker(mark);
                    }}
                    >
                        <img src='radar.svg' alt="sk" style={{width: (mark.infected)%20}}></img>
                    </button>
                </Marker>
            ))}

            {selectedMarker ? (
                <Popup
                onClose={() => {
                    setSelectedMarker(null)
                }}
                latitude={selectedMarker.latitude}
                longitude={selectedMarker.longitude}>
                    <div>
                        <h2>{selectedMarker.name},{selectedMarker.country}</h2>
                        <p>Infected : {selectedMarker.infected}</p>
                        <p>Recovered : {selectedMarker.recovered}</p>
                        <p>Dead : {selectedMarker.dead}</p>
                        <p>Sick : {selectedMarker.sick}</p>
                    </div>
                </Popup>
            ) : null}
            
            </ReactMapGL>   
  );
}

export default App;

