'use client'

import { Box, Container, Typography, Stack } from '@mui/material'
import UserForm from '@/components/UserForm'
import AuthAdminPage from '@/wrapper/AuthAdmin'

const Register: React.FC = () => {
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
              Cadastrar um novo usuário
            </Typography>
            <Typography sx={{ fontSize: '14px', my: '8px' }}>
              Preencha todos os campos para cadastrar novo usuario.
            </Typography>
            <UserForm />
          </Stack>
        </Box>
      </Container>
    </AuthAdminPage>
  )
}

export default Register
