export type User = {
  _id?: string
  firstName: string
  lastName: string
  email: string
  role: 'admin' | 'user'
  avatar?: string
  password?: string
  address: {
    state: string
    city: string
    street: string
    number?: string
    complement?: string
    cep: string
    neighborhood: string
  }
  verified?: boolean
}
