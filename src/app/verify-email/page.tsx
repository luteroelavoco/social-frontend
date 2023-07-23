'use client'

import { Metadata } from 'next'
import React, { useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { useSnackbar } from 'notistack'
import { useUser } from '@/context/User'
import { LoadingComponent } from '@/components/LoadingComponent'

export const metadata: Metadata = {
  title: 'Validar email'
}

const VerifyEmail: React.FC = () => {
  const { enqueueSnackbar } = useSnackbar()
  const { verifyEmail } = useUser()
  const searchParams = useSearchParams()
  const router = useRouter()
  const token = searchParams.get('token')

  useEffect(() => {
    if (token) {
      verifyEmail(token).catch(() => {
        enqueueSnackbar('Não foi possivel fazer a verificação dessa conta', {
          variant: 'error',
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'right'
          }
        })
        router.push('/login')
      })
    }
  }, [token])

  return <LoadingComponent text="Validando o email..." />
}

export default VerifyEmail
