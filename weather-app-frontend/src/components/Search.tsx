import React, { useEffect, useState } from "react";
import { Container, FormControl } from "@chakra-ui/react";
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

const Search: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { cities, loading } = useSelector((state: RootState) => state.search);

  const debouncedDispatch = debounce((value: string) => {
    dispatch(getCity(value));
  }, 1000);

  const onChangeHandler = (value: string) => {
    if (value.length >= 3) {
      debouncedDispatch(value);
    }
  };

  return (
    <Container mb={5}>
      <FormControl>
        {/* <AsyncSelect
          name="City Search"
          placeholder="Search Weather By City Name"
          components={asyncComponents}
          // loadOptions={loadOptions}
        /> */}
        <Select
          name="colors"
          options={cities || []}
          isLoading
          placeholder=" ..."
          closeMenuOnSelect={true}
          onChange={(value) => {
            console.log("value", value);
          }}
          onInputChange={(value) => {
            onChangeHandler(value);
          }}
          // value={}
        />
      </FormControl>
    </Container>
  );
};

export default Search;
