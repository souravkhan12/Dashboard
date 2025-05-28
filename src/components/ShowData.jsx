import styled from "styled-components";
import Forecast from "./Forecast";
import { useWeather } from "../context/useWeather";
import Loader from "./Loader";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px;
  gap: 32px;
  margin: 0 auto;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(8px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
`;

const WeatherInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  color: #f0f0f0;
  text-align: center;
`;

const Icon = styled.img`
  width: 110px;
  height: 110px;
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.08);
  }
`;

const Temp = styled.h2`
  font-size: 32px;
  margin: 0;
`;

const Description = styled.p`
  font-size: 20px;
  text-transform: capitalize;
  margin: 0;
`;

const DateText = styled.p`
  font-size: 18px;
  color: #ddd;
  margin: 0;
`;

const Message = styled.p`
  color: #ccc;
  font-size: 18px;
`;

const ErrorMessage = styled.div`
  color: #ff4d4f;
  font-size: 1.2rem;
`;

function ShowData() {
  const { weatherData, loading } = useWeather();
  if (loading) {
    return <Loader />;
  }
  const data = weatherData || [];

  if (!weatherData || !weatherData[0]) {
    return <ErrorMessage>Please Enter Valid City Name</ErrorMessage>;
  }

  return (
    <Container>
      <WeatherInfo>
        {weatherData[0].weather[0].icon && (
          <Icon
            src={`https://openweathermap.org/img/wn/${weatherData[0].weather[0].icon}@2x.png`}
            alt={weatherData[0].weather[0].description}
          />
        )}
        <Temp>{(weatherData[0].main.temp - 273.15).toFixed(1)} °C</Temp>
        <DateText>
          {new Date(weatherData[0].dt * 1000).toLocaleDateString(undefined, {
            weekday: "long",
          })}
        </DateText>
        <Description>{weatherData[0].weather[0].description}</Description>
      </WeatherInfo>

      {data.length > 1 ? (
        <Forecast />
      ) : (
        <Message>No forecast data available</Message>
      )}
    </Container>
  );
}

export default ShowData;
