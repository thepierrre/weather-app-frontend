import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5014/",
});

export default instance;
