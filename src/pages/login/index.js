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
  CardMedia,
  FormControl,
  Grid,
  Hidden,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
  TextField
} from '@mui/material'
import { styled } from '@mui/system'

// ** Material UI Icons Imports

// ** Material Design Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Axios Import
import axios from 'axios'

// ** JSON Web Token
import Cookies from 'js-cookie'
import { createToken, verifyToken } from '../../@core/utils/auth'

// ** Components view Import
import LoadingLogin from 'src/views/login/Loading'

// ** Switch Alert Import
const SwitchAlert = require('sweetalert2')

// ** Styled Components
const Background = styled(Box)(() => ({
  width: '100%',
  height: '100%',
  background: '#EBF3FE',
  background: 'radial-gradient(circle, rgba(172,193,255,1) 0%, rgba(213,224,255,1) 0%, rgba(32,46,90,1) 100%);'
}))

const CardStyled = styled(Card)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '38rem' }
}))

const LinkStyled = styled('a')(({ theme }) => ({
  fontSize: '0.875rem',
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

const LoginPage = () => {
  // ** State
  const [user, setUser] = useState('') // User
  const [password, setPassword] = useState('') // Password
  const [responseData, setResponseData] = useState('') // เก็บค่า Data ที่จะเอาไปฝังใน Local Storage
  const [verificationComplete, setVerificationComplete] = useState(false)

  const [values, setValues] = useState({
    password: '',
    showPassword: false
  })

  // ** Hook
  const router = useRouter()

  // Check value Cookie
  useEffect(() => {
    const token = Cookies.get('jwt')

    if (token) {
      router.push('/')
    } else {
      const decodedToken = verifyToken(token)

      if (decodedToken) {
        router.push('/')
      } else {
        setVerificationComplete(true)
      }
    }
  }, [router])

  // Loading page
  if (!verificationComplete) {
    return <LoadingLogin />
  }

  // ** Function
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const handleMouseDownPassword = event => {
    event.preventDefault()
  }

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
          if (receivedStatus === 'OK') {
            const userData = response.data.message.Data[0].user_role

            const resNameData =
              response.data.message.Data[0].user_first_name + ' ' + response.data.message.Data[0].user_last_name
            const EmailData = response.data.message.Data[0].user_email
            const MemberId = response.data.message.Data[0].member_id
            const UserStatus = response.data.message.Data[0].user_status

            setResponseData(userData)

            const RoleData = {
              Role: userData
            }

            // Create a JWT
            const token = createToken(RoleData)

            // Store the token in local storage
            localStorage.setItem('jwt', token)
            localStorage.setItem('name', resNameData)
            localStorage.setItem('Email', EmailData)
            localStorage.setItem('Member_Id', MemberId)
            localStorage.setItem('User_Status', UserStatus)

            // Store the token in a cookie
            Cookies.set('jwt', token)
            SwitchAlert.fire({
              icon: 'success',
              title: 'Login Success',
              showConfirmButton: false,
              timer: 1000
            }).then(router.push(`/`))
          } else if (receivedStatus === 'Banned') {
            SwitchAlert.fire({
              icon: 'error',
              title: 'You are Banned',
              text: 'You have been Banned.'
            })
          } else if (receivedStatus === 'Wait approve') {
            SwitchAlert.fire({
              icon: 'info',
              title: 'Please wait',
              text: 'Your account is waiting for approval.'
            })
          } else {
            SwitchAlert.fire({
              icon: 'error',
              title: 'No information found',
              text: 'You entered the wrong Email or Password.'
            })
          }
        }
      })
      .catch(error => {
        console.error(error)

        SwitchAlert.fire({
          icon: 'error',
          title: 'Log in failed...',
          text: 'Error calling API'
        })
      })
  }

  return (
    <Background className='content-center'>
      <CardStyled sx={{ zIndex: 1 }}>
        <CardContent>
          <Grid container spacing={3} justifyContent='center' alignItems='center'>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <CardMedia
                  component='img'
                  image='https://media.discordapp.net/attachments/1143783715877703833/1152162375529676861/tctm-logo.png?width=711&height=702'
                  alt='logo'
                  sx={{ width: '80px' }}
                />
              </Box>
            </Grid>
            <Hidden only='xs'>
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Typography variant='h4' color='#2D2E81' sx={{ fontWeight: 600 }}>
                    Welcome to <span style={{ color: '#BF1522' }}>TCTM</span> marketplace
                  </Typography>
                </Box>
              </Grid>
            </Hidden>
            <Grid item xs={12}>
              <Box sx={{ width: '100%', marginBottom: 2 }}>
                <Typography variant='h5' textAlign='center' sx={{ fontWeight: 600 }}>
                  Login to your account
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ width: '100%' }}>
                <TextField
                  fullWidth
                  id='email'
                  label='Email'
                  variant='outlined'
                  onChange={handleSetUser}
                  InputProps={{
                    style: {
                      borderRadius: '10px'
                    }
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ width: '100%' }}>
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
                    sx={{ marginBottom: 4, borderRadius: '10px' }}
                  />
                </FormControl>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ width: '100%' }}>
                <Button
                  fullWidth
                  variant='contained'
                  color='primary'
                  onClick={handleSubmitData}
                  sx={{ borderRadius: '10px' }}
                >
                  Sign In
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
                <Typography variant='body2' sx={{ marginRight: 2 }}>
                  Not a member?{' '}
                </Typography>
                <Link href='/member/register' passHref>
                  <LinkStyled> Register</LinkStyled>
                </Link>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </CardStyled>
    </Background>
  )
}
LoginPage.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default LoginPage
