'use client'

import {
  Box,
  Container,
  Typography,
  Stack,
  Button,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions
} from '@mui/material'
import AuthAdminPage from '@/wrapper/AuthAdmin'
import { useBookTrade } from '@/context/BookTrade'
import { useEffect, useState } from 'react'
import { Book } from '@/types/book'
import BookCard from '@/components/BookCard'

const AvailableBooks: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([])
  const { availableBooks } = useBookTrade()

  const getBooks = async () => {
    setBooks(await availableBooks())
  }
  useEffect(() => {
    getBooks()
  }, [])
  return (
    <AuthAdminPage>
      <Container
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          my: '32px'
        }}
      >
        <Grid container spacing={2}>
          {books.map(book => (
            <BookCard key={book._id} book={book}></BookCard>
          ))}
        </Grid>
      </Container>
    </AuthAdminPage>
  )
}

export default AvailableBooks
