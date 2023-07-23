import { useState } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { LoadingButton } from '@mui/lab'
import {
  TextField,
  Stack,
  Box,
  InputAdornment,
  IconButton
} from '@mui/material'
import { Visibility, VisibilityOff } from '@material-ui/icons'
import { useUser } from '@/context/User'
import { useSnackbar, SnackbarOrigin } from 'notistack'

const validationSchema = yup.object({
  email: yup
    .string()
    .email('Insira um email válido')
    .required('Email é obrigatório'),
  password: yup.string().required('Senha é obrigatório')
})

const anchorOrigin: SnackbarOrigin = {
  vertical: 'top',
  horizontal: 'right'
}

const LoginForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const { enqueueSnackbar } = useSnackbar()

  const { login } = useUser()

  const handleClickShowPassword = () => setShowPassword(show => !show)

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: validationSchema,
    onSubmit: async values => {
      const { email, password } = values
      setLoading(true)
      await login(email, password)
        .finally(() => {
          setLoading(false)
        })
        .catch(() => {
          enqueueSnackbar('Usuário não cadastrado ou palavra passe errada ', {
            variant: 'error',
            anchorOrigin
          })
        })
    }
  })

  return (
    <Box sx={{ width: '100%', mt: '16px' }}>
      <form style={{ display: 'flex' }} onSubmit={formik.handleSubmit}>
        <Stack sx={{ width: '100%' }} gap="24px">
          <TextField
            size="small"
            fullWidth
            label="Seu email"
            id="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            fullWidth
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            label="Sua senha"
            size="small"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowPassword} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          <LoadingButton
            loading={loading}
            color="primary"
            variant="contained"
            fullWidth
            type="submit"
          >
            Entrar
          </LoadingButton>
        </Stack>
      </form>
    </Box>
  )
}

export default LoginForm
