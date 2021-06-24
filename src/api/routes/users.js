import CRUD from '../base'

class UsersCRUD extends CRUD {
  googleAuth(data) {
    const url = `${this.url}/auth/social/google/authorize/`
    return this.request({
      url,
      method: 'POST',
      data,
    })
  }

  logInWithCredentials(data) {
    const url = `${this.url}/login/`
    return this.request({
      url,
      method: 'POST',
      data,
    })
  }

  logOut() {
    const url = `${this.url}/auth/logout/`
    return this.request({
      url,
      method: 'POST',
    })
  }

  createUserSalary(data) {
    const url = `${this.url}/salary/`
    return this.request({
      url,
      method: 'POST',
      data,
    })
  }

  createUserRate(data) {
    const url = `${this.url}/rate/`
    return this.request({
      url,
      method: 'POST',
      data,
    })
  }

  toggleProcessedStatus(params) {
    const url = `${this.url}/${params.id}/toggle-processed-status/${params.year}/${params.month}/`
    return this.request({
      url,
      method: 'POST',
    })
  }
}

export default function usersCRUD(request) {
  return new UsersCRUD({
    url: '/users',
    request,
  })
}
