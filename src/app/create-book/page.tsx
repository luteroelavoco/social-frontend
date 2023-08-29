'use client'

import { Box, Container, Typography, Stack, Button } from '@mui/material'
import BookForm from '@/components/BookForm'
import AuthPage from '@/wrapper/Auth'

const CreateBook: React.FC = () => {
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
        <Box
          sx={{
            position: 'relative',
            width: '90%',
            maxWidth: '550px',
            background: 'white',
            p: '32px',
            borderRadius: '16px'
          }}
        >
          <Stack sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography
              sx={{
                fontSize: { xs: '22px', sm: '28px' },
                fontWeight: '700',
                marginTop: '16px',
                lineHeight: { xs: '22px', sm: '28px' }
              }}
            >
              Cadastrar livro
            </Typography>
            <Typography sx={{ fontSize: '14px', my: '8px' }}>
              Preencha todos os campos para cadastrar um livro para trocar
            </Typography>
            <BookForm />
          </Stack>
        </Box>
      </Container>
    </AuthPage>
  )
}

export default CreateBook
