import { useState } from 'react'
import { useFormik } from 'formik'
import { useSnackbar, SnackbarOrigin } from 'notistack'
import { LoadingButton } from '@mui/lab'
import { TextField, Stack, Box } from '@mui/material'
import { useBookTrade } from '@/context/BookTrade'
import { createBookValidationSchema } from '@/validations/bookForm'
import { useUser } from '@/context/User'

const anchorOrigin: SnackbarOrigin = {
  vertical: 'top',
  horizontal: 'right'
}

const BookForm: React.FC = () => {
  const { enqueueSnackbar } = useSnackbar()
  const [loading, setLoading] = useState(false)
  const { createBook } = useBookTrade()
  const { user } = useUser()

  const formik = useFormik({
    initialValues: {
      title: '',
      author: '',
      description: '',
      avatar: '',
      owner: ''
    },
    validationSchema: createBookValidationSchema,
    onSubmit: async (values, { resetForm }) => {
      setLoading(true)
      await createBook({
        ...values,
        owner: `${user?._id}`
      })
        .then(() => {
          resetForm()
          enqueueSnackbar('Livro cadastrado com sucesso.', {
            variant: 'success',
            anchorOrigin
          })
        })
        .catch(() => {
          enqueueSnackbar(
            'Não foi possivel cadastrar este livro, por favor tente mais tarde',
            {
              variant: 'error',
              anchorOrigin
            }
          )
        })
      setLoading(false)
    }
  })

  return (
    <Box sx={{ width: '100%', my: '16px' }}>
      <form style={{ display: 'flex' }} onSubmit={formik.handleSubmit}>
        <Stack sx={{ width: '100%' }} gap={{ xs: '16px', sm: '24px' }}>
          <TextField
            InputLabelProps={{ shrink: true }}
            size="small"
            fullWidth
            placeholder="Título"
            label="Título"
            id="title"
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
          />
          <TextField
            InputLabelProps={{ shrink: true }}
            size="small"
            fullWidth
            placeholder="Autor"
            label="Autor"
            id="author"
            name="author"
            value={formik.values.author}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.author && Boolean(formik.errors.author)}
            helperText={formik.touched.author && formik.errors.author}
          />
          <TextField
            InputLabelProps={{ shrink: true }}
            size="small"
            fullWidth
            placeholder="Descrição"
            label="Descrição"
            id="description"
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.description && Boolean(formik.errors.description)
            }
            helperText={formik.touched.description && formik.errors.description}
          />
          <TextField
            InputLabelProps={{ shrink: true }}
            size="small"
            fullWidth
            placeholder="Url da imagem (Opcional)"
            label="Url da imagem (Opcional)"
            id="avatar"
            name="avatar"
            value={formik.values.avatar}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.avatar && Boolean(formik.errors.avatar)}
            helperText={formik.touched.avatar && formik.errors.avatar}
          />
          <LoadingButton
            loading={loading}
            color="primary"
            variant="contained"
            fullWidth
            type="submit"
          >
            Salvar
          </LoadingButton>
        </Stack>
      </form>
    </Box>
  )
}

export default BookForm
