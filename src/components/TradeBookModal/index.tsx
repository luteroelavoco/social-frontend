import * as React from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  InputLabel,
  MenuItem,
  FormControl
} from '@mui/material'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { useBookTrade } from '@/context/BookTrade'
import { useSnackbar, SnackbarOrigin } from 'notistack'

const anchorOrigin: SnackbarOrigin = {
  vertical: 'top',
  horizontal: 'right'
}

interface props {
  open: boolean
  handleClose: () => void
  desiredBook: string
}

export default function TradeBookModal({
  open,
  handleClose,
  desiredBook
}: props) {
  const { enqueueSnackbar } = useSnackbar()
  const [offeredBook, setOfferedBook] = React.useState('')
  const { getUserBooks, createTradeBook } = useBookTrade()
  const userBooks = getUserBooks()

  const handleCreateTradeBook = async () => {
    createTradeBook({ offeredBook, desiredBook })
      .then(() => {
        enqueueSnackbar('Solicitação de troca feita com sucesso.', {
          variant: 'success',
          anchorOrigin
        })
      })
      .catch(() => {
        enqueueSnackbar(
          'Não foi possivel solicitar troca deste livro, possivelmente você já solicitou essa troca.',
          {
            variant: 'error',
            anchorOrigin
          }
        )
      })
      .finally(() => {
        handleClose()
      })
  }

  const handleSelectBookChange = (event: SelectChangeEvent) => {
    setOfferedBook(event.target.value as string)
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Solicitar troca </DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ mb: 2 }}>
          Por favor , selecione qual dos seus livros , você deseja trocar.
        </DialogContentText>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">
            Selecione o livro
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={offeredBook}
            label="Selecione o livro"
            onChange={handleSelectBookChange}
          >
            {userBooks.map(book => (
              <MenuItem key={book._id} value={book._id}>
                {book.title} ({book.author})
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancelar</Button>
        <Button onClick={handleCreateTradeBook}>Solicitar</Button>
      </DialogActions>
    </Dialog>
  )
}
