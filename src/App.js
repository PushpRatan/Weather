import "./App.css";
import { useState } from "react";

const api = {
  key: "HE5nrJluaH23TKOfR3Pws3pJyFyLMgiB",
  base: "https://api.tomorrow.io/v4/weather/",
};

function App() {
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState({});
  const [load, setLoad] = useState(false);

  /*
    Search button is pressed. Make a fetch call to the Open Weather Map API.
  */
  const searchPressed = () => {
    setLoad(true);
    fetch(`${api.base}forecast?location=${search}&apikey=${api.key}`)
      .then((res) => res.json())
      .then((result) => {
        setWeather(result);
        console.log(weather.location.name);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        {/* HEADER  */}
        <h1>Weather App</h1>

        {/* Search Box - Input + Button  */}
        <div>
          <input
            type="text"
            placeholder="Enter city/town..."
            onChange={(e) => setSearch(e.target.value)}
          />
          <button onClick={searchPressed}>Search</button>
        </div>

        {/* If weather is not undefined display results from API */}
        {typeof weather.location !== "undefined" ? (
          <div>
            {/* Location  */}
            <p>{weather.location.name}</p>

            {/* Temperature Celsius  */}
            <p>{weather?.timelines?.daily[0]?.values?.temperatureAvg}°C</p>
          </div>
        ) : load === true ? (
          <div>Loading...</div>
        ) : (
          ""
        )}
      </header>
    </div>
  );
}

export default App;
