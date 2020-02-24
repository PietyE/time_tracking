import { fetchApi } from './fetchApi'

class Api {
  /** @param url -- string
   *  @param token -- string
   *
   */
  users = url =>
    fetchApi({
      url,
    })

  login = (url, token) => {
    const formData = new FormData()
    formData.append('token', token)
    return fetchApi({
      url,
      method: 'post',
      body: formData,
      authenticated: false,
    })
  }

  logout = url => {
    return fetchApi({
      url,
      method: 'post',
    })
  }

  developerProjects = url => {
    return fetchApi({
      url,
    })
  }

  getWorkItems = url => {
    return fetchApi({
      url,
    })
  }

  addWorkItem = (url, body) => {
    return fetchApi({
      url,
      method: 'post',
      body,
    })
  }

  deleteWorkItem = url => {
    return fetchApi({
      url,
      method: 'delete',
    })
  }
}

export default new Api()
