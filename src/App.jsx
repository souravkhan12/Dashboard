import Weather from "./components/Weather";
import styled from "styled-components";

const AppWrapper = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
`;

function App() {
  return (
    <AppWrapper>
      <Weather />
    </AppWrapper>
  );
}

export default App;
