import axios from "axios";

// creo mi URL donde buscara en mi api
const clientAxios = axios.create({
  baseURL: "http://localhost:8000/api/tasks"
});
export default clientAxios;
