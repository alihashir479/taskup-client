import axios from 'axios'

export const getBaseUrl = () => {
    let url;
    switch (process.env.NODE_ENV) {
        case "production":
            url = 'https://taskup-server.vercel.app/api/'
            break;
        case 'development':
            url = 'http://localhost:5000/api/'
            break;
    }
    return url
}

const axiosInstance = axios.create({
    baseURL: getBaseUrl(),
    withCredentials: true
})

export default axiosInstance