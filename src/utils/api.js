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

  getAllProjects = (url) => {
    return fetchApi({
      url,
    })
  }

  getSelectedProject = (url) => {
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
      responseType: 'blob',
    })
  }

  saveNewSalary = (url, body) => {
    return fetchApi({
      url,
      method: 'post',
      body,
    })
  }

  saveNewRate = (url, body) => {
    return fetchApi({
      url,
      method: 'post',
      body,
    })
  }

  saveNewCost = (url, body) => {
    return fetchApi({
      url,
      method: 'post',
      body,
    })
  }

  saveEditedCost = (url, body) => {
    return fetchApi({
      url,
      method: 'patch',
      body,
    })
  }

  saveNewComments = (url, body) => {
    return fetchApi({
      url,
      method: 'post',
      body,
    })
  }

  setUsersToProject = (url, body) => {
    return fetchApi({
      url,
      method: 'post',
      body,
    })
  }

  saveEditedComments = (url, body) => {
    return fetchApi({
      url,
      method: 'patch',
      body,
    })
  }

  saveExchangeRate = (url, body) => {
    return fetchApi({
      url,
      method: 'post',
      body,
    })
  }

  toggleProcessedStatus = (url) => {
    return fetchApi({
      url,
      method: 'post',
    })
  }

  getCurrenciesList = (url) => {
    return fetchApi({
      url,
    })
  }

  getRatesList = (url, params) => {
    return fetchApi({
      url,
      params,
    })
  }

  getConsolidatedReport = (url) => {
    return fetchApi({
      url,
    })
  }

  getUsersProjectReports = (url) => {
    return fetchApi({
      url,
    })
  }

  getData = (url) => {
    return fetchApi({
      url,
    })
  }
  getUsersHoursAuthUrl = (url) => fetchApi({ url, method: 'post' })

  getUsersHoursCreateToken = (url, data) =>
    fetchApi({ url, data, method: 'post' })

  syncWithGoogleSheet = (url, data) => fetchApi({ url, data, method: 'post' })

  updateUserPersonalInformation = (url, data) =>
    fetchApi({ url, data, method: 'patch' })
}

export default new Api()

export const getDevelopersByProjectId = (project_id) =>
  fetchApi({
    url: `developer-projects/?project_id=${project_id}`,
  })
