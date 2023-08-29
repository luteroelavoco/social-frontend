import React, { useState } from 'react'
import ChangeCircleOutlinedIcon from '@mui/icons-material/ChangeCircleOutlined'
import { theme } from '@/styles/theme'
import {
  Typography,
  Button,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Tooltip
} from '@mui/material'
import { Book } from '@/types/book'
import { useUser } from '@/context/User'
import { User } from '@/types/user'
import TradeBookModal from '../TradeBookModal'

interface props {
  book: Book
}

const FALLBACK_AVATAR =
  'https://www.f-pak.com.au/static/0b0a311a4cce20e8a88d06460e44c441/5a7c3/fallback-gallery.jpg'

const BookCard: React.FC<props> = ({ book }) => {
  const { user } = useUser()
  const [openTradeBookModal, setOpenTradeBookModal] = useState(false)
  const disableTradeButton = user?._id == (book.owner as User)._id

  const handleImageError = (e: any) => {
    e.target.onerror = null
    e.target.src = FALLBACK_AVATAR
  }
  const handleClickOpenTradeBookModal = () => {
    setOpenTradeBookModal(true)
  }

  const handleCloseTradeBookModal = () => {
    setOpenTradeBookModal(false)
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
        <Tooltip title={book.description}>
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
        </Tooltip>
        <CardActions>
          <Button
            disabled={disableTradeButton}
            fullWidth
            startIcon={<ChangeCircleOutlinedIcon />}
            variant="contained"
            onClick={handleClickOpenTradeBookModal}
          >
            Trocar
          </Button>
        </CardActions>
      </Card>
      <TradeBookModal
        open={openTradeBookModal}
        handleClose={handleCloseTradeBookModal}
        desiredBook={book._id as string}
      />
    </Grid>
  )
}

export default BookCard
