import axios from 'axios'
const axiosInstance = axios.create({
    baseURL: "https://taskup-server.vercel.app/api/",
    withCredentials: true
})

export default axiosInstance