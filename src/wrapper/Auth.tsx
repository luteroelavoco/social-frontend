import { useUser } from '@/context/User'
import { LoadingComponent } from '@/components/LoadingComponent'

function AuthPage({ children }: { children: JSX.Element }) {
  const { user } = useUser()

  if (!user) {
    return <LoadingComponent />
  }

  return <> {children}</>
}

export default AuthPage
