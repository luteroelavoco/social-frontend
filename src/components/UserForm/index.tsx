import { useState } from 'react'
import { useFormik } from 'formik'
import { useSnackbar, SnackbarOrigin } from 'notistack'
import { LoadingButton } from '@mui/lab'
import {
  TextField,
  Stack,
  Box,
  InputAdornment,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Avatar,
  SelectChangeEvent
} from '@mui/material'
import { Visibility, VisibilityOff } from '@material-ui/icons'
import { User } from '@/types/user'
import api from '@/services/api'
import { useUser } from '@/context/User'
import { STATIC_INITIAL_VALUE } from '@/utils/formUser'
import { UserFormDTO } from '@/types/userFormDTO'
import {
  registerValidationSchema,
  updateValidationSchema
} from '@/validations/userForm'

const anchorOrigin: SnackbarOrigin = {
  vertical: 'top',
  horizontal: 'right'
}

type props = {
  user?: User
}

const UserForm: React.FC<props> = ({ user }) => {
  const { enqueueSnackbar } = useSnackbar()
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const isEditing = !!user
  const { updateUser, registerUser } = useUser()
  const INITIAL_VALUES = isEditing ? { ...user.address, ...user } : {}

  const handleClickShowPassword = () => setShowPassword(show => !show)

  const formik = useFormik({
    initialValues: {
      ...STATIC_INITIAL_VALUE,
      ...INITIAL_VALUES
    },
    validationSchema: isEditing
      ? updateValidationSchema
      : registerValidationSchema,
    onSubmit: async (values, { resetForm }) => {
      setLoading(true)
      if (isEditing) {
        await updateUser(values as UserFormDTO)
          .then(() => {
            enqueueSnackbar('Usuário actualizado com sucesso', {
              variant: 'success',
              anchorOrigin
            })
          })
          .catch(() => {
            enqueueSnackbar(
              'Não foi possivel atualizar suas informações tente mais tarde!',
              {
                variant: 'error',
                anchorOrigin
              }
            )
          })
        setLoading(false)
        return
      }
      await registerUser(values as UserFormDTO)
        .then(() => {
          resetForm()
          enqueueSnackbar(
            'Usuário foi cadastrado com sucesso, um email foi enviado para o usuário.',
            {
              variant: 'success',
              anchorOrigin
            }
          )
        })
        .catch(() => {
          enqueueSnackbar(
            'Não foi possivel cadastrar este usuário, tente um email diferente',
            {
              variant: 'error',
              anchorOrigin
            }
          )
        })
      setLoading(false)
    }
  })

  const handleChangeRole = (event: SelectChangeEvent) => {
    formik.setFieldValue('role', event.target.value as string)
  }

  const handleChangeInputFile = (e: any) => {
    formik.setFieldValue('avatar', URL.createObjectURL(e.target.files[0]))
    formik.setFieldValue('file', e.target.files[0])
  }

  const handleOnCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cep = e.target.value
    formik.setFieldValue('cep', cep)
    if (cep.length > 6) {
      api.get(`https://brasilapi.com.br/api/cep/v1/${cep}`).then(response => {
        const { data } = response
        formik.setFieldValue('state', data.state)
        formik.setFieldValue('city', data.city)
        formik.setFieldValue('neighborhood', data.neighborhood)
        formik.setFieldValue('street', data.street)
      })
    }
  }

  return (
    <Box sx={{ width: '100%', my: '16px' }}>
      <form style={{ display: 'flex' }} onSubmit={formik.handleSubmit}>
        <Stack sx={{ width: '100%' }} gap={{ xs: '16px', sm: '24px' }}>
          <Stack gap="8px">
            <Avatar src={formik.values.avatar} sx={{ width: 100, height: 100 }}>
              Foto
            </Avatar>
            {!isEditing && (
              <input
                type="file"
                title="Escolher foto"
                accept="image/*"
                onChange={handleChangeInputFile}
              />
            )}
          </Stack>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            gap={{ xs: '16px', sm: '8px' }}
          >
            <TextField
              InputLabelProps={{ shrink: true }}
              required
              size="small"
              fullWidth
              label="Primeiro nome"
              placeholder="Primeiro nome"
              id="firstName"
              name="firstName"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.firstName && Boolean(formik.errors.firstName)
              }
              helperText={formik.touched.firstName && formik.errors.firstName}
            />
            <TextField
              InputLabelProps={{ shrink: true }}
              required
              size="small"
              fullWidth
              label="Ultimo nome"
              placeholder="Ultimo nome"
              id="lastName"
              name="lastName"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
            />
          </Stack>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            gap={{ xs: '16px', sm: '8px' }}
          >
            <FormControl fullWidth>
              <InputLabel id="select-label-role">Nível</InputLabel>
              <Select
                required
                disabled={isEditing}
                size="small"
                placeholder="Nível"
                labelId="select-label-role"
                id="select-role"
                value={formik.values.role}
                label="Nível"
                onChange={handleChangeRole}
              >
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="user">Usuário</MenuItem>
              </Select>
            </FormControl>
            <TextField
              InputLabelProps={{ shrink: true }}
              size="small"
              fullWidth
              required
              placeholder="Email"
              disabled={isEditing}
              label="Email"
              id="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </Stack>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            gap={{ xs: '16px', sm: '8px' }}
          >
            <TextField
              required
              InputLabelProps={{ shrink: true }}
              size="small"
              fullWidth
              label="Cep"
              placeholder="Cep"
              id="cep"
              name="cep"
              value={formik.values.cep}
              onChange={handleOnCepChange}
              onBlur={formik.handleBlur}
              error={formik.touched.cep && Boolean(formik.errors.cep)}
              helperText={formik.touched.cep && formik.errors.cep}
            />
            <TextField
              InputLabelProps={{ shrink: true }}
              size="small"
              fullWidth
              label="Estado"
              placeholder="Estado"
              id="state"
              name="state"
              value={formik.values.state}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.state && Boolean(formik.errors.state)}
              helperText={formik.touched.state && formik.errors.state}
            />
          </Stack>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            gap={{ xs: '16px', sm: '8px' }}
          >
            <TextField
              InputLabelProps={{ shrink: true }}
              size="small"
              fullWidth
              label="Cidade"
              placeholder="Cidade"
              id="city"
              name="city"
              value={formik.values.city}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.city && Boolean(formik.errors.city)}
              helperText={formik.touched.city && formik.errors.city}
            />
            <TextField
              InputLabelProps={{ shrink: true }}
              size="small"
              fullWidth
              label="Bairro"
              placeholder="Bairro"
              id="neighborhood"
              name="neighborhood"
              value={formik.values.neighborhood}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.neighborhood &&
                Boolean(formik.errors.neighborhood)
              }
              helperText={
                formik.touched.neighborhood && formik.errors.neighborhood
              }
            />
          </Stack>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            gap={{ xs: '16px', sm: '8px' }}
          >
            <TextField
              InputLabelProps={{ shrink: true }}
              size="small"
              fullWidth
              label="Rua"
              placeholder="Rua"
              id="street"
              name="street"
              value={formik.values.street}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.street && Boolean(formik.errors.street)}
              helperText={formik.touched.street && formik.errors.street}
            />
            <TextField
              InputLabelProps={{ shrink: true }}
              size="small"
              fullWidth
              label="Número"
              placeholder="Número"
              id="number"
              name="number"
              value={formik.values.number}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.number && Boolean(formik.errors.number)}
              helperText={formik.touched.number && formik.errors.number}
            />
          </Stack>
          <TextField
            InputLabelProps={{ shrink: true }}
            size="small"
            fullWidth
            placeholder="Complemento"
            label="Complemento"
            id="complement"
            name="complement"
            value={formik.values.complement}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.complement && Boolean(formik.errors.complement)
            }
            helperText={formik.touched.complement && formik.errors.complement}
          />
          <TextField
            InputLabelProps={{ shrink: true }}
            fullWidth
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            label="Senha"
            placeholder="senha"
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
            {isEditing ? 'Atualizar' : 'Cadastrar'}
          </LoadingButton>
        </Stack>
      </form>
    </Box>
  )
}

export default UserForm
