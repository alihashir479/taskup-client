import axios from 'axios'
const axiosInstance = axios.create({
    baseURL: "https://taskup-server-1rh155t3e-alihashir479.vercel.app",
    withCredentials: true
})

export default axiosInstance