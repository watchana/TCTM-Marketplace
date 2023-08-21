// withAuth.js

import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import { verifyToken } from '../../../../utils/auth' // Your JWT utility function

export const withAuth = WrappedComponent => {
  const AuthComponent = props => {
    const router = useRouter()
    const [verificationComplete, setVerificationComplete] = useState(false)

    useEffect(() => {
      const token = Cookies.get('jwt') // Get token from cookie or local storage

      if (!token) {
        // If not logged in, redirect to login page
        router.push('pages/login/')
      } else {
        // Verify the token
        const decodedToken = verifyToken(token) // Use your verification function

        if (!decodedToken) {
          // Invalid token, redirect to login page
          router.push('pages/login/')
        } else {
          setVerificationComplete(true)
        }
      }
    }, [router])

    if (!verificationComplete) {
      return <div>Loading...</div>
    }

    return <WrappedComponent {...props} />
  }

  return AuthComponent
}
