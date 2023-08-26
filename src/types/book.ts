import { User } from './user'

export type Book = {
  _id?: string
  title: string
  author: string
  description: string
  avatar?: string
  owner: User | string
}
