'use client'

import { Box, Container, Typography, Grid } from '@mui/material'
import AuthPage from '@/wrapper/Auth'
import { useBookTrade } from '@/context/BookTrade'
import BookCard from '@/components/BookCard'
import { useEffect } from 'react'
import { useUser } from '@/context/User'

const AvailableBooks: React.FC = () => {
  const { books, search, handleGetAvailableBooks, user } = useBookTrade()
  const { user } = useUser()

  useEffect(() => {
    if (!user) return
    handleGetAvailableBooks()
  }, [user])
  return (
    <AuthPage>
      <Container
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          alignContent: 'center',
          flexDirection: 'column',
          my: '32px'
        }}
      >
        <Grid container spacing={2}>
          {books.map(book => (
            <BookCard key={book._id} book={book}></BookCard>
          ))}
        </Grid>
        {books.length === 0 && search && (
          <Box>
            <Typography>
              Infelizmente não encontramos o livro &quot;{search}&quot;.
            </Typography>
          </Box>
        )}
      </Container>
    </AuthPage>
  )
}

export default AvailableBooks
