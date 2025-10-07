import axios from "axios";

const myAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export default myAxios;