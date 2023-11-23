import Search from "../components/Search";
import Header from "../layout/Header";

const HomePage: React.FC = () => {
  // add background gif if currentCity is sunny or cloudy
  return (
    <>
      <Header />
      <Search />
      {/* weather gallery made of weather cards
       if mobile: a slider of weather cards
        if desktop: a grid of weather cards
      */}
    </>
  );
};

export default HomePage;
