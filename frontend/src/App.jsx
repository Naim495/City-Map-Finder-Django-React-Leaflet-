import { useState } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function App() {
  const [city, setCity] = useState("");
  const [coords, setCoords] = useState(null);

  const searchCity = async () => {
    try {
      const res = await axios.get(`http://127.0.0.1:8000/api/city/${city}/`);
      setCoords([res.data.lat, res.data.lon]);
    } catch {
      alert("City not found");
    }
  };

  return (
    <div className="p-5">
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={searchCity}>Search</button>

      {coords && (
        <MapContainer center={coords} zoom={12} style={{ height: "500px" }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={coords}>
            <Popup>{city}</Popup>
          </Marker>
        </MapContainer>
      )}
    </div>
  );
}

export default App;
