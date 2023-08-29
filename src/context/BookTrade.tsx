import React, { createContext, useContext, useState, useEffect } from 'react'

import { Book } from '@/types/book'
import api from '@/services/api'
import { useUser } from './User'
import { User } from '@/types/user'

interface BookTradeContextType {
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
}

export const BookTradeContext = createContext<BookTradeContextType>(
  {} as BookTradeContextType
)

export function BookTradeProvider({ children }: { children: React.ReactNode }) {
  const [books, setBooks] = useState<Book[]>([])
  const { user } = useUser()

  const createBook = async (values: Book) => {
    await api.post('/books', values)
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

  const getBooks = async () => {
    setBooks(await availableBooks())
  }

  const getUserBooks = () => {
    return books.filter(book => (book.owner as User)._id === user?._id)
  }

  useEffect(() => {
    getBooks()
  }, [])

  return (
    <BookTradeContext.Provider
      value={{
        createBook,
        availableBooks,
        books,
        getUserBooks,
        createTradeBook
      }}
    >
      {children}
    </BookTradeContext.Provider>
  )
}

export function useBookTrade() {
  const context = useContext(BookTradeContext)
  const { createBook, availableBooks, books, getUserBooks, createTradeBook } =
    context
  return { createBook, availableBooks, books, getUserBooks, createTradeBook }
}
