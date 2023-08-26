import React from 'react'
import ChangeCircleOutlinedIcon from '@mui/icons-material/ChangeCircleOutlined'
import { theme } from '@/styles/theme'
import {
  Typography,
  Button,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions
} from '@mui/material'
import { Book } from '@/types/book'
import { useUser } from '@/context/User'
import { User } from '@/types/user'

interface props {
  book: Book
}

const FALLBACK_AVATAR =
  'https://www.f-pak.com.au/static/0b0a311a4cce20e8a88d06460e44c441/5a7c3/fallback-gallery.jpg'

const BookCard: React.FC<props> = ({ book }) => {
  const { user } = useUser()
  const disableTradeButton = user?._id == (book.owner as User)._id

  const handleImageError = (e: any) => {
    e.target.onerror = null
    e.target.src = FALLBACK_AVATAR
  }

  return (
    <Grid item xs={6} sm={4} md={3} lg={2}>
      <Card>
        <CardMedia
          component="img"
          alt={book.title}
          height="320"
          image={book.avatar || FALLBACK_AVATAR}
          onError={handleImageError}
        />
        <CardContent sx={{ height: '100px' }}>
          <Typography
            sx={{
              color: theme.palette.primary.main,
              fontWeight: 'bold',
              fontSize: '18px',
              lineHeight: '20px',
              mb: 1
            }}
          >
            {book.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Autor: <strong> {book.author} </strong>
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            disabled={disableTradeButton}
            fullWidth
            startIcon={<ChangeCircleOutlinedIcon />}
            variant="contained"
          >
            Trocar
          </Button>
        </CardActions>
      </Card>
    </Grid>
  )
}

export default BookCard
