import { CircularProgress, Container, Typography } from '@mui/material'

export function LoadingComponent({ text = '' }) {
  return (
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        height: '90vh',
        my: '32px'
      }}
    >
      <CircularProgress />
      <Typography mt="8px">{text}</Typography>
    </Container>
  )
}
