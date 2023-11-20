import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
// import { ColorModeScript } from "@chakra-ui/color-mode";
import { Provider } from "react-redux";
import store from "../src/features/store";
import { chakraCustomTheme } from "./layout/theme.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider theme={chakraCustomTheme}>
      <ColorModeScript
        initialColorMode={chakraCustomTheme.config.initialColorMode}
      />
      <Provider store={store}>
        <App />
      </Provider>
    </ChakraProvider>
  </React.StrictMode>
);
