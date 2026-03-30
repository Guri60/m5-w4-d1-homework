import { faMapMarkerAlt, faTemperatureHigh, faTemperatureLow } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "bootstrap/dist/css/bootstrap.min.css";
import countries from "i18n-iso-countries";
import { useEffect, useState } from "react";
import "./App.css";

countries.registerLocale(require("i18n-iso-countries/langs/en.json"));

function App() {
  const [apiData, setApiData] = useState({});
  const [getState, setGetState] = useState("Irvine, USA");
  const [state, setState] = useState("Irvine, USA");

  const apiKey = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${state}&appid=${apiKey}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setApiData(data));
  }, [state, apiKey]);

  const inputHandler = (event) => {
    setGetState(event.target.value);
  };

  const submitHandler = () => {
    setState(getState);
  };

  const kelvinToFahrenheit = (k) => {
    return ((k - 273.15) * 1.8 + 32).toFixed(0);
  };

  return (
    <div className="App">
      <header className="d-flex justify-content-center align-items-center">
        <h2>React Weather App</h2>
      </header>

      <div className="container">
        <div className="mt-3 d-flex flex-column justify-content-center align-items-center">
          <div className="col-auto">
            <label htmlFor="location-name" className="col-form-label">
              Enter Location :
            </label>
          </div>

          <div className="auto">
            <input
              type="text"
              id="location-name"
              className="form-control"
              onChange={inputHandler}
              value={getState}
            />
            <button
              className="btn btn-primary mt-2"
              onClick={submitHandler}
            >
              Search
            </button>
          </div>
        </div>

        <div className="card mt-3 mx-auto">
          {apiData.main ? (
            <div className="card-body text-center">
              <img
                src={`http://openweathermap.org/img/w/${apiData.weather[0].icon}.png`}
                alt="weather status icon"
                className="weather-icon"
              />

              <p className="h2">
                {kelvinToFahrenheit(apiData.main.temp)}&deg; F
              </p>

              <p className="h5">
                <FontAwesomeIcon
                  icon={faMapMarkerAlt}
                  className="mr-2 text-dark"
                />{" "}
                <strong>{apiData.name}</strong>
              </p>

              <div className="row mt-4">
                {/* Min Temp */}
                <div className="col-md-6">
                  <p>
                    <FontAwesomeIcon
                      icon={faTemperatureLow}
                      className="mr-2 text-primary"
                    />
                    <strong>
                      {kelvinToFahrenheit(apiData.main.temp_min)}&deg; F
                    </strong>
                  </p>
                </div>

                {/* Max Temp + Weather Info */}
                <div className="col-md-6">
                  <p>
                    <FontAwesomeIcon
                      icon={faTemperatureHigh}
                      className="mr-2 text-danger"
                    />
                    <strong>
                      {kelvinToFahrenheit(apiData.main.temp_max)}&deg; F
                    </strong>
                  </p>

                  <p>
                    <strong>{apiData.weather[0].main}</strong>
                  </p>

                  <p>
                    <strong>
                      {countries.getName(
                        apiData.sys.country,
                        "en",
                        { select: "official" }
                      )}
                    </strong>
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <h1 className="text-center p-3">Loading...</h1>
          )}
        </div>
      </div>

      <footer className="footer text-center mt-4">
        &copy; React Weather App
      </footer>
    </div>
  );
}

export default App;