import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (postData) => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(baseUrl, postData, config)
  return response.data
}

const update = async (postData) => {
  const response = await axios.put(`${baseUrl}/${postData.id}`, postData)
  return response.data
}

const remove = async (postId) => {
  const response = await axios.delete(`${baseUrl}/${postId}`)
  return response.data
}

export default { getAll, create, setToken, update, remove }