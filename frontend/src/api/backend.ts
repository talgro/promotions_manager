import axios from "axios";

const backendClient = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    headers: {}
});

export default backendClient;