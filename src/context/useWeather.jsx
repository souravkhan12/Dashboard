import { createContext, useContext, useState, useEffect } from "react";

const weatherContext = createContext();

function WeatherProvider({ children }) {
  const [city, setCity] = useState("");
  const [checkWeather, setCheckWeather] = useState(false);
  const [weatherData, setWeatherData] = useState(() => {
    const savedData = localStorage.getItem("weatherData");
    return savedData ? JSON.parse(savedData) : [];
  });
  const [loading, setLoading] = useState(false);

  function handleCity(e) {
    setCity(e.target.value);
  }

  useEffect(() => {
    if (!city || !checkWeather) return;
    setCheckWeather(false);
    setLoading(true);
    setWeatherData([]);
    localStorage.setItem("weatherData", []);

    const cityRegex = /^[A-Za-z\s.'-]{2,}$/;
    if (!cityRegex.test(city.trim())) {
      setLoading(false);
      return;
    }

    async function fetchWeather() {
      try {
        const REACT_API_KEY = import.meta.env.VITE_REACT_API_KEY;
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${REACT_API_KEY}`
        );
        console.log(city, checkWeather);

        const data = await res.json();
        if (data.cod !== "200") {
          throw new Error(data.message);
        }

        const filteredData = [];
        const addedDates = new Set();

        data.list.forEach((item) => {
          const date = item.dt_txt.split(" ")[0];
          const time = item.dt_txt.split(" ")[1];

          if (time === "12:00:00" && !addedDates.has(date)) {
            filteredData.push(item);
            addedDates.add(date);
          }
        });

        const today = new Date().toISOString().split("T")[0];
        const todayData = data.list.find((item) =>
          item.dt_txt.startsWith(today)
        );

        if (todayData) {
          filteredData.unshift(todayData);
        }
        setWeatherData(filteredData);
        localStorage.setItem("weatherData", JSON.stringify(filteredData));

        setCity("");
        setCheckWeather(false);
      } catch (error) {
        return;
      } finally {
        setLoading(false);
      }
    }
    if (checkWeather) {
      fetchWeather();
    }
  }, [checkWeather, city]);

  return (
    <weatherContext.Provider
      value={{
        city,
        handleCity,
        checkWeather,
        setCheckWeather,
        weatherData,
        loading,
        setWeatherData,
      }}
    >
      {children}
    </weatherContext.Provider>
  );
}

function useWeather() {
  const context = useContext(weatherContext);
  if (!context) {
    throw new Error("useWeather must be used within a WeatherProvider");
  }
  return context;
}

export { WeatherProvider, useWeather };
