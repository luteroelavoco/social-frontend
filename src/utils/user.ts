const checkWindow = () => typeof window !== 'undefined'

export const saveToken = (token: string) => {
  if (checkWindow()) {
    localStorage.setItem('token', token)
  }
}

export const removeToken = () => {
  if (checkWindow()) {
    localStorage.removeItem('token')
  }
}

export const getToken = () => {
  if (checkWindow()) {
    return localStorage.getItem('token')
  }
  return undefined
}
