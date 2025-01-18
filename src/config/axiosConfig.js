import axios from 'axios';

axios.defaults.baseURL = window.clientConfig.url
console.log(window.clientConfig)

axios.interceptors.response.use(
    (response) => response,
    (error) => {
        switch (error.response?.status) {
            case 404:
                console.error(error.response?.data?.message || "Неверные данные");
                break;
            default:
                console.error(
                    error.response?.data?.message || "Ошибка получения данных"
                );
                break;
        }

        return Promise.reject(error);
    }
);

export default axios;