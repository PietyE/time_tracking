import axios from 'axios'

import usersCRUD from './routes/users'

// eslint-disable-next-line no-undef
const _baseURL = process.env.REACT_APP_BASE_URL

class Client {
  constructor(baseURL) {
    this.instanse = axios.create({
      baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    })

    this.instanse.interceptors.request.use((config) => {
      if (!this.token) {
        return config
      }

      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${this.token}`,
      }

      return config
    })

    this.users = usersCRUD(this.instanse)
  }

  setToken(token) {
    this.token = token
  }
  deleteToken() {
    delete this.token
  }
}

const api = new Client(_baseURL)

export const { users } = api

export default api

// const handleError = (error) => {
//   if (error.response) {
//     // The request was made and the server responded with a status code
//     // that falls out of the range of 2xx
//     console.log("1", error.response.data);
//     console.log("2", error.response.status);
//     console.log("3", error.response.headers);
//   } else if (error.request) {
//     // The request was made but no response was received
//     // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
//     // http.ClientRequest in node.js
//     console.log("4", error.request);
//   } else {
//     // Something happened in setting up the request that triggered an Error
//     console.log("Error", error.message);
//   }
//   console.log("5", error.config);
//   console.log("6", error.toJSON());
// };
