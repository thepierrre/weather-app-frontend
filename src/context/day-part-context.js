import { createContext } from "react";

const DayPartContext = createContext({
  isNight: undefined,
  setIsNight: () => {},
});

export default DayPartContext;
