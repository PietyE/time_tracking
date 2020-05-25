import { fetchApi } from './fetchApi'

class Api {
  /** @param url -- string
   *  @param token -- string
   *
   */
  users = (url) =>
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

  logout = (url) => {
    return fetchApi({
      url,
      method: 'post',
    })
  }

  developerProjects = (url) => {
    return fetchApi({
      url,
    })
  }

  getWorkItems = (url) => {
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

  deleteWorkItem = (url) => {
    return fetchApi({
      url,
      method: 'delete',
    })
  }

  editWorkItem = (url, body) => {
    return fetchApi({
      url,
      method: 'patch',
      body,
    })
  }

  consolidateReportApi = (url) => {
    return fetchApi({
      url,
      method: 'get',
    })
  }

  exportCsv = (url) => {
    return fetchApi({
      url,
    })
  }

  saveNewSalary = (url, body) => {
    return fetchApi({
      url,
      method: 'post',
      body,
    })
  }
}

export default new Api()
