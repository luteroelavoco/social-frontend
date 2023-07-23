'use client'

import Image from 'next/image'
import { Box, Container, Typography, Stack, Button } from '@mui/material'
import UserForm from '@/components/UserForm'
import { useRouter } from 'next/navigation'
import AuthAdminPage from '@/wrapper/AuthAdmin'

const Register: React.FC = () => {
  const router = useRouter()

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
            <Image
              src="/social-logo.svg"
              alt="socialsa Logo"
              width={200}
              height={60}
              priority
            />
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
            <Button
              fullWidth
              variant="outlined"
              onClick={() => router.push('/update-user')}
            >
              Alterar meus dados
            </Button>
          </Stack>
        </Box>
      </Container>
    </AuthAdminPage>
  )
}

export default Register
