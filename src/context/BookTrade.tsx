import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState
} from 'react'

import { useRouter } from 'next/navigation'
import { Book } from '@/types/book'
import api from '@/services/api'

interface BookTradeContextType {
  createBook: (values: Book) => Promise<void>
  availableBooks: () => Promise<Book[]>
}

export const BookTradeContext = createContext<BookTradeContextType>(
  {} as BookTradeContextType
)

export function BookTradeProvider({ children }: { children: React.ReactNode }) {
  const createBook = async (values: Book) => {
    await api.post('/books', values)
  }

  const availableBooks = async () => {
    const getBooks = await api.get('/books/available?search=')
    return getBooks.data
  }

  return (
    <BookTradeContext.Provider value={{ createBook, availableBooks }}>
      {children}
    </BookTradeContext.Provider>
  )
}

export function useBookTrade() {
  const context = useContext(BookTradeContext)
  const { createBook, availableBooks } = context
  return { createBook, availableBooks }
}
