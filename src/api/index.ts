import axios from "axios";

export const api = axios.create({
  baseURL: "https://api-to-expoapp.herokuapp.com/",
});
