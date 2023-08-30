'use client'

import { useEffect } from 'react'
import { Box, Container, Typography, Divider } from '@mui/material'
import AuthPage from '@/wrapper/Auth'
import { useBookTrade } from '@/context/BookTrade'
import TradeBookCard from '@/components/TradeBookCard'
import { useUser } from '@/context/User'

const TradeBooks: React.FC = () => {
  const { booksTrade, handleGetBooksTrade } = useBookTrade()
  const { user } = useUser()

  useEffect(() => {
    if (!user) return
    handleGetBooksTrade()
  }, [user])

  return (
    <AuthPage>
      <Container
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          my: 4
        }}
      >
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            maxWidth: '650px',
            background: 'white',
            py: { xs: '8px', sm: '16px' },
            borderRadius: '8px'
          }}
        >
          <Typography
            sx={{
              fontSize: '24px',
              fontWeight: 'bold',
              px: { xs: '8px', sm: '24px' },
              mb: '8px'
            }}
          >
            Solicitações de troca
          </Typography>
          <Divider sx={{ borderWidth: 1 }} />
          {booksTrade.map(bookTrade => (
            <TradeBookCard key={bookTrade._id} bookTrade={bookTrade} />
          ))}
        </Box>
      </Container>
    </AuthPage>
  )
}

export default TradeBooks
