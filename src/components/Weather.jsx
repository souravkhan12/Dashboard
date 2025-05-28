import styled from "styled-components";
import { useWeather } from "../context/useWeather";
import ShowData from "./ShowData";

const Container = styled.div`
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 4rem;
  color: #fff;

  @media (max-width: 768px) {
    padding: 20px;
    gap: 3rem;
  }

  @media (max-width: 480px) {
    padding: 15px;
    gap: 2rem;
  }
`;

const SearchSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2.8rem;
  font-weight: 700;
  color: #f0f0f0;
  text-shadow: 1px 1px 6px rgba(0, 0, 0, 0.6);

  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

const SearchBar = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const Input = styled.input`
  padding: 12px 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  width: 30rem;
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.05);
  color: #fff;
  font-size: 1rem;
  outline: none;
  transition: border 0.3s ease, box-shadow 0.3s ease;

  &::placeholder {
    color: #ccc;
  }

  &:focus {
    border: 1px solid #eddd53;
    box-shadow: 0 0 8px rgba(237, 221, 83, 0.4);
  }

  @media (max-width: 768px) {
    width: 20rem;
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`;

const Button = styled.button`
  padding: 12px 22px;
  border: none;
  border-radius: 8px;
  background-color: rgb(87, 104, 131);
  color: white;
  cursor: pointer;
  font-size: 1rem;
  margin-left: 12px;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: rgba(237, 221, 83, 0.8);
    color: #111;
    transform: translateY(-1px);
  }

  @media (max-width: 480px) {
    margin-left: 0;
    width: 100%;
  }
`;

const CityInfo = styled.p`
  font-size: 1.1rem;
  color: #ccc;
  margin-top: 10px;

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

function Weather() {
  const { city, handleCity, checkWeather, setCheckWeather, weatherData } =
    useWeather();

  return (
    <Container>
      <SearchSection>
        <Title>🌤️ Weather Finder</Title>
        <SearchBar>
          <Input
            type="text"
            placeholder="Enter city name"
            value={city}
            onChange={handleCity}
          />
          <Button onClick={() => setCheckWeather(!checkWeather)}>Search</Button>
        </SearchBar>
        {city && <CityInfo>Weather data for: {city}</CityInfo>}
      </SearchSection>

      <ShowData weatherData={weatherData} />
    </Container>
  );
}

export default Weather;
