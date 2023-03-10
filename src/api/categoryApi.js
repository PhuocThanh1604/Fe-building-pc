const { default: axiosClient } = require('./axiosClient')

const categoryApi = {
  getAll(params) {
    const url = 'url'
    return axiosClient.get(url, { params })
  },

  get(id) {
    const url = `/category/${id}`
    return axiosClient.get(url)
  },
  add(data) {
    const url = `/categories`
    return axiosClient.post(url, data)
  },
  update(data) {
    const url = `/category/${data.id}`
    return axiosClient.pacth(url, data)
  },
  remove(id) {
    const url = `/categories/${id}`
    return axiosClient.delete(url)
  },
}
export default categoryApi
