import { useState } from "react";

import DayPartContext from "./context/day-part-context";

const DayPartContextProvider = (props) => {
  const { children } = props;
  const [isNight, setIsNight] = useState(undefined);

  return (
    <DayPartContext.Provider value={{ isNight, setIsNight }}>
      {children}
    </DayPartContext.Provider>
  );
};

export default DayPartContextProvider;
