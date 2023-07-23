import * as yup from 'yup'

export const updateValidationSchema = yup.object({
  firstName: yup.string().required('Primeiro nome é obrigatório'),
  lastName: yup.string().required('Ultimo nome é obrigatório'),
  cep: yup
    .string()
    .min(8, 'O Cep tem que ter 8 numeros')
    .required('O Cep é obrigatório')
})

export const registerValidationSchema = yup.object({
  firstName: yup.string().required('Primeiro nome é obrigatório'),
  lastName: yup.string().required('Ultimo nome é obrigatório'),
  role: yup.string().required('Nível é obrigatório'),
  email: yup
    .string()
    .email('Insira um email válido')
    .required('Email é obrigatório'),
  cep: yup
    .string()
    .min(8, 'O Cep tem que ter 8 numeros')
    .required('O Cep é obrigatório'),
  password: yup.string().required('Senha é obrigatório')
})
