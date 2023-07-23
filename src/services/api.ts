'use client'

import axios from 'axios'

export const url = 'https://desolate-forest-43262-ac0e0645cc68.herokuapp.com/'

if (typeof window !== 'undefined') {
  axios.defaults.headers.common[
    'Authorization'
  ] = `Bearer ${localStorage.getItem('token')}`
}

const api = axios.create({
  baseURL: url
})

export default api
