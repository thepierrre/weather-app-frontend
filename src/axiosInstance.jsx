import axios from "axios";

const instance = axios.create({
  // baseURL: "http://localhost:5014/",
  baseURL: "https://get-my-current-weather-e1a1907797e1.herokuapp.com/",
});

export default instance;
