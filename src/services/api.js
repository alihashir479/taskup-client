import axios from 'axios'
const axiosInstance = axios.create({
    baseURL: "https://taskup-server.vercel.app/",
    withCredentials: true
})

export default axiosInstance