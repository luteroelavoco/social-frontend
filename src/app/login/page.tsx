'use client'

import Image from 'next/image'
import { Box, Container, Typography, Stack } from '@mui/material'
import LoginForm from '@/components/LoginForm'
import { MailOutline } from '@material-ui/icons'
import { useRouter } from 'next/navigation'
import { useUser } from '@/context/User'

const Login: React.FC = () => {
  const router = useRouter()
  const { user } = useUser()

  if (user) {
    router.push('/update-user')
  }

  return (
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: '90%',
          maxWidth: '500px',
          height: '500px',
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
            sx={{ fontSize: '28px', fontWeight: '700', marginTop: '16px' }}
          >
            Entrar na sua conta
          </Typography>
          <Typography sx={{ fontSize: '14px', my: '8px' }}>
            Faça login na sua conta para alterar seus dados.
          </Typography>
          <LoginForm />
        </Stack>
        <Stack
          sx={{ position: 'absolute', bottom: 10, gap: '5px' }}
          direction="row"
        >
          <MailOutline color="primary" fontSize="small" />{' '}
          <Typography sx={{ fontSize: '14px' }}>help@socialsa.com</Typography>
        </Stack>
      </Box>
    </Container>
  )
}

export default Login
