import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState
} from 'react'

import { useRouter } from 'next/navigation'
import { User } from '@/types/user'
import api from '@/services/api'
import { getToken, removeToken, saveToken } from '@/utils/user'
import { UserFormDTO } from '@/types/userFormDTO'

interface UserContextType {
  user: User | undefined
  setUser: Dispatch<SetStateAction<User | undefined>>
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  updateUser: (values: UserFormDTO) => Promise<void>
  registerUser: (values: UserFormDTO) => Promise<void>
}

export const UserContext = createContext<UserContextType>({} as UserContextType)

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>()
  const router = useRouter()

  const login = async (email: string, password: string) => {
    return api.post('/auth', { email, password }).then(response => {
      const { data } = response
      setUser(data.user)
      saveToken(data.token)
      router.push('/update-user')
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

    return api.put(`/users/${user._id}`, newUser).then(response => {
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
    return api.post('/users', formData).then(() => {})
  }

  const getUser = async () => {
    if (!getToken()) {
      router.push('/login')
    }
    await api
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

  useEffect(() => {
    getUser()
  }, [])
  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        login,
        logout,
        updateUser,
        registerUser
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  const { user, setUser, login, logout, updateUser, registerUser } = context
  return { user, setUser, login, logout, updateUser, registerUser }
}
