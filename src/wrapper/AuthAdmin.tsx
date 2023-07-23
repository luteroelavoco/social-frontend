import React, { useEffect } from 'react'
import { useUser } from '@/context/User'
import { LoadingComponent } from '@/components/LoadingComponent'
import { redirect } from 'next/navigation'

function AuthAdminPage({ children }: { children: JSX.Element }) {
  const { user, getUser } = useUser()

  useEffect(() => {
    getUser()
  }, [])

  if (!user) {
    return <LoadingComponent />
  }

  if (user.role === 'user') return redirect('/update-user')

  return <> {children}</>
}

export default AuthAdminPage
