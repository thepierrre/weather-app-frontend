import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import Credits from "./components/authorship/Credits.jsx";
import DayPartContextProvider from "./DayPartContextProvider.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/credits",
    element: <Credits />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <DayPartContextProvider>
      <RouterProvider router={router} />
    </DayPartContextProvider>
  </React.StrictMode>
);

// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App.jsx";
// import "./index.css";
// import DayPartContextProvider from "./DayPartContextProvider.jsx";

// ReactDOM.createRoot(document.getElementById("root")!).render(
//   <React.StrictMode>
//     <DayPartContextProvider>
//       <App />
//     </DayPartContextProvider>
//   </React.StrictMode>
// );
