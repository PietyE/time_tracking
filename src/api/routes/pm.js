import CRUD from '../base'

class PmCRUD extends CRUD {

  getProjectsReportById(params) {
    const url = `${this.url}/report/${params.year}/${params.month + 1}/?project_id=${params.id}`
    return this.request({
      url,
      method: 'GET',
    })
  }

  getDeveloperProjectsById(params) {
    const url = `${this.url}/report/${params.year}/${params.month + 1}/?user_id=${params.id}`
    return this.request({
      url,
      method: 'GET',
    })
  }

  getProjectReportInExcel(params) {
    const url = `${this.url}/${params.payload}/export-excel/${params.year}/${params.month + 1}/`
    return this.request({
      url,
      method: 'GET',
      responseType: 'blob',
    })
  }

  getAllTeamProjectReportsInExcel(params) {
    const url = `/projects/${params.payload}/export-excel/${params.year}/${params.month + 1}/`
    return this.request({
      url,
      method: 'GET',
      responseType: 'blob',
    })
  }

  getProjectsTotalHours(data) {
    const {year, month, ...params} = data
    const url = `/projects/total_minutes/${year}/${month + 1}`
    
    return this.request({
      url,
      method: 'GET',
      params,
    })
  }

  createProject(data) {
    const url = '/projects/'
    return this.request({
      url,
      method: 'POST',
      data,
    })
  }

  setUsersToProject(data) {
    const url = `${this.url}/create-list/`
    return this.request({
      url,
      method: 'POST',
      data,
    })
  }

  changeProjectName(id, data) {
    const url = `/projects/${id}/`
    return this.request({
      url,
      method: 'PATCH',
      data,
    })
  }

  changeProjectTeam(id, data) {
    const url = `${this.url}/${id}/`
    return this.request({
      url,
      method: 'PATCH',
      data,
    })
  }

  createDeveloperProject(data) {
    const url = `${this.url}/`
    return this.request({
      url,
      method: 'POST',
      data,
    })
  }

  //
  // getProjectsWithReport(params) {
  //   const url = `${this.url}/report/${params.year}/${params.month}`
  //   return this.request({
  //     url,
  //     method: 'GET',
  //   })
  // }


}

export default function pmCRUD(request) {
  return new PmCRUD({
    url: '/developer-projects',
    request,
  })
}