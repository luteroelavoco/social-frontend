'use client'

import { Box, Container, Typography, Stack, Button } from '@mui/material'
import UserForm from '@/components/UserForm'
import { useUser } from '@/context/User'
import { useRouter } from 'next/navigation'
import AuthPage from '@/wrapper/Auth'

const UpdateUser: React.FC = () => {
  const router = useRouter()
  const { user, logout } = useUser()
  const isAdmin = user?.role === 'admin'

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
              Atualizar informações do Usuário
            </Typography>
            <Typography sx={{ fontSize: '14px', my: '8px' }}>
              Preencha todos os campos para atualizar as informações do usuário.
            </Typography>
            <UserForm user={user} />
            {isAdmin && (
              <Button
                fullWidth
                variant="outlined"
                onClick={() => router.push('/register')}
              >
                Cadastrar usuário
              </Button>
            )}
          </Stack>
        </Box>
      </Container>
    </AuthPage>
  )
}

export default UpdateUser
