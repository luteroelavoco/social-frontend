import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState
} from 'react'

import { useRouter } from 'next/navigation'
import { User } from '@/types/user'
import { userApi } from '@/services/api'
import { getToken, removeToken, saveToken } from '@/utils/user'
import { UserFormDTO } from '@/types/userFormDTO'

interface UserContextType {
  user: User | undefined
  setUser: Dispatch<SetStateAction<User | undefined>>
  login: (email: string, password: string) => Promise<void>
  verifyEmail: (token: string) => Promise<void>
  logout: () => void
  updateUser: (values: UserFormDTO) => Promise<void>
  registerUser: (values: UserFormDTO) => Promise<void>
  getUser: () => Promise<void>
}

export const UserContext = createContext<UserContextType>({} as UserContextType)

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>()
  const router = useRouter()

  const handleLogin = (user: User, token: string) => {
    updateApiToken(token)
    setUser(user)
    saveToken(token)
    router.push('/available-books')
  }
  const login = async (email: string, password: string) => {
    return userApi.post('/auth', { email, password }).then(response => {
      const { data } = response
      handleLogin(data.user, data.token)
    })
  }

  const verifyEmail = async (token: string) => {
    return userApi.put('/users/verify', { token }).then(response => {
      const { data } = response
      handleLogin(data.user, data.token)
    })
  }

  const logout = () => {
    removeToken()
    setUser(undefined)
    router.push('/login')
  }

  const updateUser = async (user: UserFormDTO) => {
    const newUser = {
      firstName: user.firstName,
      lastName: user.lastName,
      password: user.password,
      address: {
        state: user.state,
        city: user.city,
        street: user.street,
        number: user.number,
        complement: user.complement,
        cep: user.cep,
        neighborhood: user.neighborhood
      }
    }

    return userApi.put(`/users/${user._id}`, newUser).then(response => {
      const { data } = response
      setUser(data)
    })
  }

  const registerUser = async (values: UserFormDTO) => {
    const formData = new FormData()
    if (values.file) formData.append('file', values.file)
    formData.append('firstName', values.firstName)
    formData.append('lastName', values.lastName)
    formData.append('email', values.email)
    formData.append('password', `${values.password}`)
    formData.append('role', values.role)
    formData.append('cep', values.cep)
    formData.append('state', values.state)
    formData.append('city', values.city)
    formData.append('neighborhood', values.neighborhood)
    formData.append('street', values.street)
    formData.append('number', `${values.number}`)
    formData.append('complement', `${values.complement}`)
    return userApi.post('/users', formData).then(() => {})
  }

  const getUser = async () => {
    if (user) return
    if (!getToken()) {
      router.push('/login')
      return
    }
    await userApi
      .post('/users/refresh')
      .then(response => {
        const { data } = response
        setUser(data.user)
        saveToken(data.token)
      })
      .catch(() => {
        router.push('/login')
      })
  }

  const updateApiToken = (token: string) => {
    userApi.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        login,
        logout,
        updateUser,
        registerUser,
        verifyEmail,
        getUser
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  const {
    user,
    setUser,
    login,
    logout,
    updateUser,
    registerUser,
    verifyEmail,
    getUser
  } = context
  return {
    user,
    setUser,
    login,
    logout,
    updateUser,
    registerUser,
    verifyEmail,
    getUser
  }
}
