'use client'

import axios from 'axios'

const userUrl = 'https://desolate-forest-43262-ac0e0645cc68.herokuapp.com/'
const tradeBookUrl = 'https://social-nest-backend-66c80c825493.herokuapp.com/'

if (typeof window !== 'undefined') {
  axios.defaults.headers.common[
    'Authorization'
  ] = `Bearer ${localStorage.getItem('token')}`
}

export const userApi = axios.create({
  baseURL: userUrl
})

export const tradeBookApi = axios.create({
  baseURL: tradeBookUrl
})
