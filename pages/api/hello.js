import axios from "axios";

const api = axios.create({
  baseURL: "https://api.openweathermap.org/",
});

export { api };
