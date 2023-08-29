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
import BookCard from '@/components/BookCard'

const AvailableBooks: React.FC = () => {
  const { books } = useBookTrade()

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
          {books.reverse().map(book => (
            <BookCard key={book._id} book={book}></BookCard>
          ))}
        </Grid>
      </Container>
    </AuthAdminPage>
  )
}

export default AvailableBooks
