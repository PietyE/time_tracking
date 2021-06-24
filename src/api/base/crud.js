class CRUD {
  url
  request
  constructor(config) {
    const { request, url } = config
    this.url = url
    this.request = request
  }

  get(params) {
    return this.request({
      url: this.url,
      params,
    })
  }

  one(id, params) {
    return this.request({
      method: 'GET',
      url: `${this.url}/${id}/`,
      params,
    })
  }

  update(id, data) {
    return this.request({
      method: 'PUT',
      url: `${this.url}/${id}/`,
      data,
    })
  }

  create(data) {
    return this.request({
      method: 'POST',
      url: this.url,
      data,
    })
  }

  delete(id) {
    return this.request({
      method: 'DELETE',
      url: `${this.url}/${id}/`,
    })
  }
}

export default CRUD
