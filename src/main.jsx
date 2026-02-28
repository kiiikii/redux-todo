import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./apps/index.js";
import { ThemeProvider } from "./libs/ThemeProvider.jsx";
import { registerSW } from "virtual:pwa-register";

registerSW({ immediate: true})

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ThemeProvider>
      <StrictMode>
        <App />
      </StrictMode>
    </ThemeProvider>
  </Provider>,
);
