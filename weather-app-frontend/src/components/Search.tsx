import React from "react";
import { Container, FormControl } from "@chakra-ui/react";
import {
  AsyncSelect,
  chakraComponents,
  LoadingIndicatorProps,
} from "chakra-react-select";

const asyncComponents = {
  LoadingIndicator: (props: LoadingIndicatorProps) => {
    return (
      <chakraComponents.LoadingIndicator
        speed="1s"
        spinnerSize="md"
        thickness="3px"
        {...props}
      />
    );
  },
};

const citiesArr = [
  "New York",
  "Los Angeles",
  "Chicago",
  "Houston",
  "Phoenix",
  "Philadelphia",
  "San Antonio",
  "San Diego",
];

const Search: React.FC = () => (
  <Container mb={5}>
    <FormControl>
      <AsyncSelect
        name="City Search"
        placeholder="Search Weather By City Name"
        components={asyncComponents}
        loadOptions={(inputValue, callback) => {
          setTimeout(() => {
            callback(
              citiesArr
                .filter((i) => i.includes(inputValue))
                .map((i) => ({ label: i, value: i }))
            );
          }, 1000);
        }}
      />
    </FormControl>
  </Container>
);

export default Search;
