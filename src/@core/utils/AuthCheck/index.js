// withAuth.js

import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import { verifyToken } from '../auth' // Your JWT utility function

export const withAuth = WrappedComponent => {
  const AuthComponent = props => {
    const router = useRouter()
    const [verificationComplete, setVerificationComplete] = useState(false)
    const [token, setToken] = useState(Cookies.get('jwt'))

    useEffect(() => {
      // When token changes, update the state
      setToken(Cookies.get('jwt'))
    }, [])

    useEffect(() => {
      if (!token) {
        // If not logged in, redirect to login page
        router.push('pages/login/')
      } else {
        // Verify the token
        const decodedToken = verifyToken(token) // Use your verification function

        if (!decodedToken) {
          // Invalid token, redirect to login page
          router.push('pages/login/')
          alert('แตกไปซะ')
          Cookies.remove('jwt') // Remove the token
        } else {
          setVerificationComplete(true)
        }
      }
    }, [token, router])

    if (!verificationComplete) {
      return <div>Loading...</div>
    }

    return <WrappedComponent {...props} />
  }

  return AuthComponent
}
