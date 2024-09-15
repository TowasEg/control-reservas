import axios from "axios";

axios.defaults.baseURL = 'http://localhost:8080/api'

axios.defaults.headers.post["Content-Type"] = 'application/json';

export const request = (method, url, data, headers, responseType) => {

    const axiosConfig = {
        method: method,
        url: url,
        headers: headers,
        data: data
    };

    if (responseType) {
        axiosConfig.responseType = responseType;
    }

    return axios(axiosConfig);
};