import { useUser } from '@/context/User'
import { LoadingComponent } from '@/components/LoadingComponent'
import { useEffect } from 'react'

function AuthPage({ children }: { children: JSX.Element }) {
  const { user, getUser } = useUser()

  useEffect(() => {
    getUser()
  }, [])

  if (!user) {
    return <LoadingComponent />
  }

  return <> {children}</>
}

export default AuthPage
