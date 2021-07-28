import CRUD from '../base'

class PmCRUD extends CRUD {

  getProjectsReportById(params) {
    const url = `${this.url}/report/${params.year}/${params.month+1}/?project_id=${params.id}`
    return this.request({
      url,
      method: 'GET',
    })
  }

  getProjectReportInExcel(params){
    const url = `${this.url}/${params.payload}/export-excel/${params.year}/${params.month + 1}/`
    return this.request({
      url,
      method: 'GET',
      responseType: 'blob',
    })
  }




}

export default function pmCRUD(request) {
  return new PmCRUD({
    url: '/developer-projects',
    request,
  })
}