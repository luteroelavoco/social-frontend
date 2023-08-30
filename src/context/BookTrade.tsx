import React, { createContext, useContext, useState, useEffect } from 'react'

import { Book } from '@/types/book'
import { tradeBookApi } from '@/services/api'
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
  getUserBooks: () => Book[]
  acceptBookTrade: (proposalId: string) => Promise<void>
  rejectBookTrade: (proposalId: string) => Promise<void>
  handleSearch: (search: string) => void
  handleGetAvailableBooks: (search?: string) => Promise<void>
  handleGetBooksTrade: (search?: string) => Promise<void>
  search: string
}

export const BookTradeContext = createContext<BookTradeContextType>(
  {} as BookTradeContextType
)

export function BookTradeProvider({ children }: { children: React.ReactNode }) {
  const [search, setSearch] = useState('')
  const [books, setBooks] = useState<Book[]>([])
  const [booksTrade, setBooksTrade] = useState<BookTrade[]>([])
  const { user } = useUser()

  const createBook = async (values: Book) => {
    await tradeBookApi.post('/books', values)
  }
  const createTradeBook = async ({
    offeredBook,
    desiredBook
  }: {
    offeredBook: string
    desiredBook: string
  }) => {
    await tradeBookApi.post('/trade-proposals', { offeredBook, desiredBook })
  }

  const availableBooks = async (search: string) => {
    const getBooks = await tradeBookApi.get(`/books/available?search=${search}`)
    return getBooks.data
  }

  const getUserBooksTrade = async () => {
    const getTradeBooks = await tradeBookApi.get(
      `/trade-proposals/user/${user?._id}`
    )
    return getTradeBooks.data
  }

  const handleGetAvailableBooks = async (search: string = '') => {
    setBooks(await availableBooks(search))
  }

  const handleGetBooksTrade = async () => {
    setBooksTrade(await getUserBooksTrade())
  }
  const acceptBookTrade = async (proposalId: string) => {
    await tradeBookApi.put(`/trade-proposals/${proposalId}/accept`)
    handleGetBooksTrade()
  }

  const rejectBookTrade = async (proposalId: string) => {
    await tradeBookApi.put(`/trade-proposals/${proposalId}/reject`)
    handleGetBooksTrade()
  }

  const getUserBooks = () => {
    return books.filter(book => (book.owner as User)._id === user?._id)
  }

  const handleSearch = (search: string) => {
    setSearch(search)
    handleGetAvailableBooks(search)
  }

  useEffect(() => {
    if (!user) return
    handleGetAvailableBooks()
    handleGetBooksTrade()
  }, [user])

  return (
    <BookTradeContext.Provider
      value={{
        createBook,
        books,
        getUserBooks,
        createTradeBook,
        booksTrade,
        acceptBookTrade,
        rejectBookTrade,
        handleSearch,
        search,
        handleGetAvailableBooks,
        handleGetBooksTrade
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
    books,
    getUserBooks,
    createTradeBook,
    booksTrade,
    acceptBookTrade,
    rejectBookTrade,
    handleSearch,
    search,
    handleGetAvailableBooks,
    handleGetBooksTrade
  } = context
  return {
    createBook,
    books,
    getUserBooks,
    createTradeBook,
    booksTrade,
    acceptBookTrade,
    rejectBookTrade,
    handleSearch,
    search,
    handleGetAvailableBooks,
    handleGetBooksTrade
  }
}
