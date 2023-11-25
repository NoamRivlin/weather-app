import { Flex } from "@chakra-ui/layout";
import Header from "../layout/Header";
import Favorites from "../components/forecast/Favorites";

const FavoritesPage: React.FC = () => {
  return (
    <>
      <Flex flexDir={"column"}>
        <Header />
        <Favorites />
      </Flex>
    </>
  );
};

export default FavoritesPage;
