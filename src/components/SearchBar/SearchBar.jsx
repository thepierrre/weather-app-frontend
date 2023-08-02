import { InputAdornment, TextField, IconButton } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SearchIcon from "@mui/icons-material/Search";
import Tooltip from "@mui/material/Tooltip";
import "./SearchBar.css";

const SearchBar = (props) => {
  const { getWeather, getLocation, cityInputChangeHandler, enteredCity } =
    props;

  return (
    <div className="search-container">
      <TextField
        className="search-bar"
        label="City name"
        focused
        style={{ background: "rgba(255, 255, 255)" }}
        value={enteredCity}
        onChange={cityInputChangeHandler}
        InputProps={{
          style: { fontFamily: "Arial" },
          startAdornment: (
            <InputAdornment position="start">
              <Tooltip title="Get my location">
                <IconButton onClick={getLocation}>
                  <LocationOnIcon color="primary" />
                </IconButton>
              </Tooltip>
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <Tooltip title="Get weather">
                <IconButton onClick={getWeather}>
                  <SearchIcon color="primary" />
                </IconButton>
              </Tooltip>
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
};

export default SearchBar;
