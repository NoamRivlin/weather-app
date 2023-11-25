import { Flex } from "@chakra-ui/layout";
import Search from "../components/Search";
import Forecast from "../components/forecast/Forecast";
import Header from "../layout/Header";
import ForecastCardV2 from "../components/forecast/forecastCardV2";

const HomePage: React.FC = () => {
  // add background gif if currentCity is sunny or cloudy
  return (
    <>
      <Flex flexDir={"column"}>
        <Header />
        <Search />
        {/* weather gallery made of weather cards
       if mobile: a slider of weather cards
       if desktop: a grid of weather cards
      */}
        <Forecast />
      </Flex>
    </>
  );
};

export default HomePage;
