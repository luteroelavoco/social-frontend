import * as yup from 'yup'

export const createBookValidationSchema = yup.object({
  title: yup.string().required('O título é obrigatório'),
  author: yup.string().required('O Autor é obrigatório')
})
