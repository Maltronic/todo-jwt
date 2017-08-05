import axios from 'axios';

const API_URL_BASE = 'http://localhost:8080/api';

export const api = {
    get: (path) => {
        let headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };

        if (localStorage.getItem('jwt_token')) {
            headers['Authorization'] = 'Bearer ' + localStorage.getItem('jwt_token');
        }

        return axios({
                method: 'get',
                url: API_URL_BASE + path,
                headers
            }
        ).then((response) => {
            return response;
        }).catch((response) => {
            return response;
        });
    },

    post: (path, payload) => {
        let headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };

        if (localStorage.getItem('jwt_token')) {
            headers['Authorization'] = 'Bearer ' + localStorage.getItem('jwt_token');
        }

        return axios({
                method: 'post',
                url: API_URL_BASE + path,
                headers,
                data: JSON.stringify(payload)
            }
        ).then((response) => {
            if (response.data.token) {
                localStorage.setItem('jwt_token', response.data.token);
            }
            return response;
        }).catch((response) => {
            return response;
        });
    },

    put: (path, payload) => {
        let headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };

        if (localStorage.getItem('jwt_token')) {
            headers['Authorization'] = 'Bearer ' + localStorage.getItem('jwt_token');
        }

        return axios({
                method: 'put',
                url: API_URL_BASE + path,
                headers,
                data: JSON.stringify(payload)
            }
        ).then((response) => {
            return response;
        }).catch((response) => {
            return response;
        });
    }
};
