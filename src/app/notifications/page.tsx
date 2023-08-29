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
import AuthPage from '@/wrapper/Auth'
import { useBookTrade } from '@/context/BookTrade'
import BookCard from '@/components/BookCard'

const Notifications: React.FC = () => {
  const { books } = useBookTrade()

  return (
    <AuthPage>
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
    </AuthPage>
  )
}

export default Notifications
