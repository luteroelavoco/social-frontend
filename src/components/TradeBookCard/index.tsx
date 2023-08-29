import { useBookTrade } from '@/context/BookTrade'
import { useUser } from '@/context/User'
import { BookTrade } from '@/types/bookTrade'
import { User } from '@/types/user'
import { Avatar, Box, Button, Stack, Typography, Divider } from '@mui/material'
import { useSnackbar, SnackbarOrigin } from 'notistack'
import moment from 'moment'

const anchorOrigin: SnackbarOrigin = {
  vertical: 'top',
  horizontal: 'right'
}

interface props {
  bookTrade: BookTrade
}
const TradeBookCard: React.FC<props> = ({ bookTrade }) => {
  const { fromUser, toUser, status, offeredBook, desiredBook, updatedAt } =
    bookTrade
  const { enqueueSnackbar } = useSnackbar()
  const { user } = useUser()
  const { acceptBookTrade, rejectBookTrade } = useBookTrade()
  const isUserRequest = user?._id === (bookTrade.fromUser as User)._id

  const userRequestPending = isUserRequest && status == 'pending'
  const userRequestAnswered = isUserRequest && status != 'pending'
  const requestedUserPending = !isUserRequest && status == 'pending'
  const requestedUserAnswered = !isUserRequest && status != 'pending'

  const statusSituation = {
    pending: 'solicitou',
    accepted: 'aceitou',
    rejected: 'rejeitou'
  }

  const handleRejectSolicitation = async () => {
    rejectBookTrade(bookTrade._id)
      .then(() => {
        enqueueSnackbar('Solicitação rejeitada com sucesso.', {
          variant: 'success',
          anchorOrigin
        })
      })
      .catch(() => {
        enqueueSnackbar(
          'Não foi possivel rejeitar a solicitação da troca deste livro.',
          {
            variant: 'error',
            anchorOrigin
          }
        )
      })
  }

  const handleAcceptSolicitation = async () => {
    acceptBookTrade(bookTrade._id)
      .then(() => {
        enqueueSnackbar('Solicitação aceite com sucesso.', {
          variant: 'success',
          anchorOrigin
        })
      })
      .catch(() => {
        enqueueSnackbar(
          'Não foi possivel aceitar a solicitação da troca deste livro.',
          {
            variant: 'error',
            anchorOrigin
          }
        )
      })
  }

  const currentAvatarUser = () => {
    if (userRequestPending || requestedUserAnswered) return user
    if (userRequestAnswered) return bookTrade.toUser
    return bookTrade.fromUser
  }

  return (
    <>
      <Stack direction="row" gap={2} my={2} px="24px">
        <Box>
          <Avatar
            sx={{ width: '50px', height: '50px' }}
            alt={currentAvatarUser()?.firstName}
            src={currentAvatarUser()?.avatar}
          />
        </Box>
        <Stack direction="column" gap="4px">
          <Typography>
            {(userRequestPending || requestedUserAnswered) && (
              <>
                <strong>Você</strong> {statusSituation[status]}{' '}
              </>
            )}
            {userRequestAnswered && (
              <>
                <strong>
                  {toUser.firstName} {toUser.lastName}
                </strong>{' '}
                {statusSituation[status]}{' '}
              </>
            )}
            {requestedUserPending && (
              <>
                <strong>
                  {fromUser.firstName} {fromUser.lastName}
                </strong>{' '}
                {statusSituation[status]}{' '}
              </>
            )}
            uma troca do livro
            <strong>
              {' '}
              {offeredBook.title} ({offeredBook.author})
            </strong>{' '}
            para o livro
            <strong>
              {' '}
              {desiredBook.title} ({desiredBook.author})
            </strong>
            .
          </Typography>
          <Typography>{moment(updatedAt).fromNow()}</Typography>
          {!isUserRequest && status == 'pending' && (
            <Stack direction="row" gap="8px" mt={2}>
              <Button onClick={handleAcceptSolicitation} variant="contained">
                Aceitar
              </Button>
              <Button variant="outlined" onClick={handleRejectSolicitation}>
                {' '}
                Rejeitar{' '}
              </Button>
            </Stack>
          )}
        </Stack>
      </Stack>
      <Divider />
    </>
  )
}

export default TradeBookCard
