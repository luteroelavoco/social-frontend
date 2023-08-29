import { Book } from './book'
import { User } from './user'

export interface BookTrade {
  _id: string
  fromUser: User
  toUser: User
  offeredBook: Book
  desiredBook: Book
  status: 'pending' | 'accepted' | 'rejected'
  createdAt: Date
  updatedAt: Date
}
