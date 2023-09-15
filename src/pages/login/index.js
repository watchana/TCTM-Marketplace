// ** React Imports
import { useState, useEffect } from 'react'

// ** Next Imports
import Link from 'next/link'
import { useRouter } from 'next/router'

// ** Material UI Imports
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  FormControl,
  FormControlLabel,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Switch,
  TextField,
  Typography
} from '@mui/material'

// ** Material Design Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Axios Import
import axios from 'axios'

// ** jwt
import { createToken, verifyToken } from '../../@core/utils/auth'
import Cookies from 'js-cookie'

// ** Switch Alert Import
const SAlert = require('sweetalert2')

const LoginPage = () => {
  // State values
  const [user, setUser] = useState('') // User
  const [password, setPassword] = useState('') // Password
  const [responseData, setResponseData] = useState('') // เก็บค่า data ที่จะเอาไปฝังใน local Storage

  const [values, setValues] = useState({
    password: '',
    showPassword: false
  })

  // ** Hook
  const router = useRouter()

  // Check value Cookie
  const [verificationComplete, setVerificationComplete] = useState(false)
  useEffect(() => {
    const token = Cookies.get('jwt') // Get token from cookie or local storage

    if (token) {
      // If not logged in, redirect to login page
      router.push('/')
    } else {
      // Verify the token
      const decodedToken = verifyToken(token) // Use your verification function

      if (decodedToken) {
        // Invalid token, redirect to login page
        router.push('/')
      } else {
        setVerificationComplete(true)
      }
    }
  }, [router])

  if (!verificationComplete) {
    return <div>Loading...</div>
  }

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const handleMouseDownPassword = event => {
    event.preventDefault()
  }

  // Variable storage function
  const handleSetUser = event => {
    setUser(event.target.value)
  }

  const handleSetPassword = prop => event => {
    setPassword(event.target.value)
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleSubmitData = event => {
    event.preventDefault()

    const data = {
      username: user,
      password: password
    }

    axios
      .post(`${process.env.NEXT_PUBLIC_API}TCTM.authen.login`, data)
      .then(response => {
        if (response.data.message) {
          const receivedStatus = response.data.message.Message
          console.log('Data:', response.data.message.Data[0])
          if (receivedStatus === 'OK') {
            const userData = response.data.message.Data[0].user_role

            const resNameData =
              response.data.message.Data[0].user_first_name + ' ' + response.data.message.Data[0].user_last_name
            const EmailData = response.data.message.Data[0].user_email
            const MemberId = response.data.message.Data[0].member_id
            const UserStatus = response.data.message.Data[0].user_status

            setResponseData(userData)

            const Roledata = {
              Role: userData
            }

            // Create a JWT
            const token = createToken(Roledata)

            // Store the token in local storage
            localStorage.setItem('jwt', token)
            localStorage.setItem('name', resNameData)
            localStorage.setItem('Email', EmailData)
            localStorage.setItem('Member_Id', MemberId)
            localStorage.setItem('User_Status', UserStatus)

            // Store the token in a cookie
            Cookies.set('jwt', token)
            SAlert.fire({
              icon: 'success',
              title: 'Login Success',
              showConfirmButton: false,
              timer: 1000
            }).then(router.push(`/`))
          } else if (receivedStatus === 'Banned') {
            SAlert.fire({
              icon: 'error',
              title: 'You are Banned',
              text: 'You have been Banned.'
            })
          } else if (receivedStatus === 'Wait approve') {
            SAlert.fire({
              icon: 'info',
              title: 'Please wait',
              text: 'Your account is waiting for approval.'
            })
          } else {
            SAlert.fire({
              icon: 'error',
              title: 'No information found',
              text: 'You entered the wrong Email or Password.'
            })
          }
        }
      })
      .catch(error => {
        console.error(error)

        SAlert.fire({
          icon: 'error',
          title: 'Log in failed...',
          text: 'Error calling API'
        })
      })
  }

  return (
    <Box
      className='content-center'
      sx={{
        backgroundColor: '#ebf3fe',
        display: 'grid',
        flexDirection: 'column'
      }}
    >
      <Box sx={{ display: 'grid', placeItems: 'center', paddingY: '1rem' }}>
        <img src='/images/logos/LOGO.png' alt='logo' width='260px' />
      </Box>
      <Card
        sx={{
          display: 'grid',
          placeItems: 'center',
          width: '100%',
          maxWidth: '28rem',
          paddingX: { xs: '1rem', sm: '1.5rem' },
          paddingY: '1.5rem',
          borderRadius: '30px'
        }}
      >
        <CardContent>
          <form>
            <TextField
              fullWidth
              id='email'
              label='Email'
              variant='outlined'
              onChange={handleSetUser}
              sx={{ marginBottom: 4 }}
              InputProps={{
                style: {
                  borderRadius: '10px'
                }
              }}
            />
            <FormControl fullWidth variant='outlined'>
              <InputLabel htmlFor='outlined-adornment-password'>Password</InputLabel>
              <OutlinedInput
                id='outlined-adornment-password'
                label='Password'
                value={values.password}
                type={values.showPassword ? 'text' : 'password'}
                onChange={handleSetPassword('password')}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      edge='end'
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      aria-label='toggle password visibility'
                    >
                      {values.showPassword ? <EyeOutline /> : <EyeOffOutline />}
                    </IconButton>
                  </InputAdornment>
                }
                style={{ marginBottom: 4, borderRadius: '10px' }}
              />
            </FormControl>
            <FormControlLabel
              control={<Switch defaultChecked color='primary' />}
              label='Remember me'
              sx={{ marginBottom: 4 }}
            />
            <Button
              variant='contained'
              color='primary'
              fullWidth
              sx={{ marginBottom: 2 }}
              style={{ borderRadius: '10px' }}
              onClick={handleSubmitData}
            >
              Sign in
            </Button>
          </form>
          <Divider sx={{ marginBottom: 3.5 }} />
          <Link href='/member/register' passHref>
            <Button variant='outlined' color='primary' fullWidth style={{ borderRadius: '10px' }}>
              Register
            </Button>
          </Link>
        </CardContent>
      </Card>
    </Box>
  )
}
LoginPage.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default LoginPage
