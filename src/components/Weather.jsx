import  { useEffect, useRef, useState } from "react";
import "./Weather.css";
import search_icon from "../assets/search.png";
import humidity_icon from "../assets/humidity.png";
import wind_icon from "../assets/wind.png";
// import rain_icon from "../assets/rain.png";
// import snow_icon from "../assets/snow.png";

const Weather = () => {

    const inputRef = useRef()
    const [weatherData, setWeatherData] = useState({});

  const search = async (city) => {
    if(city === "") {
        alert("Please enter a city name");
        return;
    };
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
        import.meta.env.VITE_WEATHER_API_KEY
      }`;

      const res = await fetch(url);
      const data = await res.json();

      if(!res.ok){
        alert(data.message);
        return;
      }
      console.log(data);
      console.log(data.weather[0].icon);

      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        // icon: data.weather[0].main,
        iconUrl: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
      })
    } catch (error) {
        setWeatherData(false);
        console.error(error);
    }
  };

  useEffect(() => {
    search("delhi");
  }, []);

  return (
    <div className="weather">
      <div className="search-bar">
        <input ref={inputRef} type="text" placeholder="Search..." />
        <img src={search_icon} alt="" onClick={()=>search(inputRef.current.value)}></img>
      </div>

        {weatherData?<>
        
            <img src={weatherData.iconUrl} alt="" className="weather-icon"></img>
      <p className="temperature">{weatherData.temperature}°c</p>
      <p className="location">{weatherData.location}</p>
      <div className="weather-data">
        <div className="col">
          <img src={humidity_icon}></img>
          <div>
            <p>{weatherData.humidity}%</p>
            <span>Humidity</span>
          </div>
        </div>
        <div className="col">
          <img src={wind_icon}></img>
          <div>
            <p>{weatherData.windSpeed} Km/hr</p>
            <span>wind speed</span>
          </div>
        </div>
      </div>
        </>:<></>}

      
    </div>
  );
};

export default Weather;
