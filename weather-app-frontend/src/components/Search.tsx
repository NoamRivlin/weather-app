import React, { useEffect, useState } from "react";
import {
  Container,
  FormControl,
  FormLabel,
  useMediaQuery,
} from "@chakra-ui/react";
import { Select } from "chakra-react-select";
import { useDispatch } from "react-redux";
import { getCity, setCurrentCity } from "../features/search/searchSlice";
import { AppDispatch, RootState } from "../features/store";
import { useSelector } from "react-redux";
import { debounce, set } from "lodash";

const Search: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { cities, loading, currentCity } = useSelector(
    (state: RootState) => state.search
  );
  const [isSmallerThan600px] = useMediaQuery("(max-width: 600px)");

  const debouncedDispatch = debounce((value: string) => {
    dispatch(getCity(value));
  }, 1000);

  const onChangeHandler = (value: string) => {
    if (value.length >= 3) {
      debouncedDispatch(value.toLocaleLowerCase());
    }
  };

  return (
    <Container mt={"130px"} width={isSmallerThan600px ? "300px" : "700px"}>
      <FormLabel>Search Weather By City Name</FormLabel>
      <FormControl>
        <Select
          size={isSmallerThan600px ? "sm" : "md"}
          name="colors"
          options={cities || []}
          isLoading={loading}
          closeMenuOnSelect={true}
          onChange={(value) => {
            dispatch(setCurrentCity(value));
          }}
          onInputChange={(value) => {
            onChangeHandler(value);
          }}
          value={currentCity}
        />
      </FormControl>
    </Container>
  );
};

export default Search;
