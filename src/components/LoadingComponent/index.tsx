import { CircularProgress, Container } from '@mui/material'

export function LoadingComponent() {
  return (
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '90vh',
        my: '32px'
      }}
    >
      <CircularProgress />
    </Container>
  )
}
