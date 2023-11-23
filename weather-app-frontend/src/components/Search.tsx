import React, { useEffect, useState } from "react";
import { Container, FormControl, useMediaQuery } from "@chakra-ui/react";
import {
  AsyncSelect,
  chakraComponents,
  LoadingIndicatorProps,
  Select,
} from "chakra-react-select";
import { useDispatch } from "react-redux";
import { getCity } from "../features/search/searchSlice";
import { AppDispatch, RootState } from "../features/store";
import { useSelector } from "react-redux";
import { debounce } from "lodash";

const Search: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { cities, loading } = useSelector((state: RootState) => state.search);
  const [isSmallerThan600px] = useMediaQuery("(max-width: 600px)");

  const debouncedDispatch = debounce((value: string) => {
    dispatch(getCity(value));
  }, 1000);

  const onChangeHandler = (value: string) => {
    if (value.length >= 3) {
      debouncedDispatch(value);
    }
  };

  return (
    <Container mt={"130px"} width={isSmallerThan600px ? "300px" : "700px"}>
      <FormControl>
        <Select
          size={isSmallerThan600px ? "sm" : "md"}
          name="colors"
          options={cities || []}
          isLoading={loading}
          placeholder="Search Weather By City Name"
          closeMenuOnSelect={true}
          onChange={(value) => {
            console.log("value", value);
          }}
          onInputChange={(value) => {
            onChangeHandler(value);
          }}
        />
      </FormControl>
    </Container>
  );
};

export default Search;
