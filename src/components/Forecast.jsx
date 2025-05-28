import React from "react";
import styled from "styled-components";

const ForecastContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
`;

const Card = styled.div`
  background: linear-gradient(145deg, #2c334d, #1c1f35);
  border-radius: 16px;
  padding: 20px;
  color: #f5f5f5;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  width: 140px;

  &:hover {
    transform: translateY(-8px) scale(1.05);
    box-shadow: 0 6px 16px rgba(237, 221, 83, 0.5);
  }
`;

const WeatherIcon = styled.img`
  width: 60px;
  height: 60px;
  margin-bottom: 8px;
`;

const Day = styled.p`
  font-size: 16px;
  font-weight: 600;
  margin: 8px 0 4px;
  color: #ededed;
`;

const Time = styled.p`
  font-size: 14px;
  margin: 4px 0;
  color: #b3b3b3;
`;

const Temp = styled.p`
  font-size: 18px;
  font-weight: 600;
  color: #ffdb58;
  margin: 8px 0 0;
`;

function Forecast({ data }) {
  return (
    <ForecastContainer>
      {data.map((item, index) => (
        <Card key={index}>
          {item?.weather[0]?.icon && (
            <WeatherIcon
              src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
              alt={item.weather[0].description}
            />
          )}
          <Day>
            {new Date(item.dt * 1000).toLocaleDateString(undefined, {
              weekday: "short",
            })}
          </Day>
          <Time>
            {new Date(item.dt * 1000).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Time>
          <Temp>{(item.main.temp - 273.15).toFixed(1)} °C</Temp>
        </Card>
      ))}
    </ForecastContainer>
  );
}

export default Forecast;
