// import { ReactNode } from "react";
import { Flex, Heading } from "@chakra-ui/react";
import Navbar from "../components/navbar/Navbar";

// interface RootLayoutHeaderProps {
//   children: ReactNode;
// }
// <RootLayoutHeaderProps>
const RootLayoutHeader: React.FC = () => {
  //{ children }
  return (
    <>
      <Flex
        align="center"
        justify="space-between"
        padding={{ base: "0.5rem", md: "1rem" }}
      >
        <Heading fontSize="4xl">Hello Weather</Heading>

        <Navbar />
      </Flex>

      {/* <Flex>{children}</Flex> */}
    </>
  );
};

export default RootLayoutHeader;
