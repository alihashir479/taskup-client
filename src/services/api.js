import axios from 'axios'
const axiosInstance = axios.create({
    baseURL: "https://taskup-server-alihashir479.vercel.app/api/",
    withCredentials: true
})

export default axiosInstance