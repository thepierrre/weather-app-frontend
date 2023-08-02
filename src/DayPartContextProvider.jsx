// import { useState } from "react";

// import DayPartContext from "./context/day-part-context";

// const DayPartContextProvider = (props) => {
//   const { children } = props;
//   const [isNight, setIsNight] = useState(undefined);

//   return (
//     <DayPartContext.Provider value={{ isNight, setIsNight }}>
//       {children}
//     </DayPartContext.Provider>
//   );
// };

// export default DayPartContextProvider;

import { useState, useEffect } from "react";
import DayPartContext from "./context/day-part-context";

const DayPartContextProvider = (props) => {
  const { children, sunrise, sunset } = props;
  const [isNight, setIsNight] = useState(undefined);

  useEffect(() => {
    // Calculate the current UTC time in seconds
    const currentTimeInSeconds = Math.floor(Date.now() / 1000);

    // Check if it is night or day based on sunrise and sunset times
    if (currentTimeInSeconds > sunset || currentTimeInSeconds < sunrise) {
      setIsNight(true);
    } else {
      setIsNight(false);
    }
  }, [sunrise, sunset]);

  return (
    <DayPartContext.Provider value={{ isNight }}>
      {children}
    </DayPartContext.Provider>
  );
};

export default DayPartContextProvider;
