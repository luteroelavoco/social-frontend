import React, { createContext, useContext, useState, useEffect } from 'react'

import { Book } from '@/types/book'
import api from '@/services/api'
import { useUser } from './User'
import { User } from '@/types/user'
import { BookTrade } from '@/types/bookTrade'

interface BookTradeContextType {
  booksTrade: BookTrade[]
  books: Book[]
  createBook: (values: Book) => Promise<void>
  createTradeBook: ({
    offeredBook,
    desiredBook
  }: {
    offeredBook: string
    desiredBook: string
  }) => Promise<void>
  availableBooks: () => Promise<Book[]>
  getUserBooks: () => Book[]
  acceptBookTrade: (proposalId: string) => Promise<void>
  rejectBookTrade: (proposalId: string) => Promise<void>
}

export const BookTradeContext = createContext<BookTradeContextType>(
  {} as BookTradeContextType
)

export function BookTradeProvider({ children }: { children: React.ReactNode }) {
  const [books, setBooks] = useState<Book[]>([])
  const [booksTrade, setBooksTrade] = useState<BookTrade[]>([])
  const { user } = useUser()

  const createBook = async (values: Book) => {
    await api.post('/books', values)
  }

  const acceptBookTrade = async (proposalId: string) => {
    const { data } = await api.put(`/trade-proposals/${proposalId}/accept`)
    updateBooksTrade(data)
  }

  const rejectBookTrade = async (proposalId: string) => {
    const { data } = await api.put(`/trade-proposals/${proposalId}/reject`)
    updateBooksTrade(data)
  }

  const createTradeBook = async ({
    offeredBook,
    desiredBook
  }: {
    offeredBook: string
    desiredBook: string
  }) => {
    await api.post('/trade-proposals', { offeredBook, desiredBook })
  }

  const availableBooks = async () => {
    const getBooks = await api.get('/books/available?search=')
    return getBooks.data
  }

  const getUserBooksTrade = async () => {
    const getTradeBooks = await api.get(`/trade-proposals/user/${user?._id}`)
    return getTradeBooks.data
  }

  const handleGetAvailableBooks = async () => {
    setBooks(await availableBooks())
  }

  const handleGetBooksTrade = async () => {
    setBooksTrade(await getUserBooksTrade())
  }

  const getUserBooks = () => {
    return books.filter(book => (book.owner as User)._id === user?._id)
  }

  const updateBooksTrade = (newBookTrade: BookTrade) => {
    setBooksTrade(oldBooksTrade =>
      oldBooksTrade.map(oldBookTrade =>
        oldBookTrade._id == newBookTrade._id ? newBookTrade : oldBookTrade
      )
    )
  }

  useEffect(() => {
    handleGetAvailableBooks()
    handleGetBooksTrade()
  }, [])

  return (
    <BookTradeContext.Provider
      value={{
        createBook,
        availableBooks,
        books,
        getUserBooks,
        createTradeBook,
        booksTrade,
        acceptBookTrade,
        rejectBookTrade
      }}
    >
      {children}
    </BookTradeContext.Provider>
  )
}

export function useBookTrade() {
  const context = useContext(BookTradeContext)
  const {
    createBook,
    availableBooks,
    books,
    getUserBooks,
    createTradeBook,
    booksTrade,
    acceptBookTrade,
    rejectBookTrade
  } = context
  return {
    createBook,
    availableBooks,
    books,
    getUserBooks,
    createTradeBook,
    booksTrade,
    acceptBookTrade,
    rejectBookTrade
  }
}
