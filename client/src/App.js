import MapContainer from './Map/Map';
import './App.css';
import ColorBar from './Map/data/ColorBar'

function App() {
  return (
    <div className="App">
      <ColorBar />
      <MapContainer />
    </div>
  );
}

export default App;
