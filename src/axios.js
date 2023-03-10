import axios from 'axios'

const baseURL = 'http://localhost:3000'

const instance = axios.create({
  baseURL: baseURL,
  headers: { 'Content-Type': 'application/json' },
})

export default instance
