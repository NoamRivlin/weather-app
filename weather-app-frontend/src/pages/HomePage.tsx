import { Flex } from "@chakra-ui/layout";
import Search from "../components/Search";
import Forecast from "../components/forecast/Forecast";
import Header from "../layout/Header";

const HomePage: React.FC = () => {
  return (
    <>
      <Flex flexDir={"column"}>
        <Header />
        <Search />
        <Forecast />
      </Flex>
    </>
  );
};

export default HomePage;
