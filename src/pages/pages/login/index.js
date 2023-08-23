// ** React Imports
import { useState, useEffect } from 'react'

// ** Next Imports
import Link from 'next/link'
import { useRouter } from 'next/router'

// ** MUI Components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled, useTheme } from '@mui/material/styles'
import MuiCard from '@mui/material/Card'
import InputAdornment from '@mui/material/InputAdornment'
import MuiFormControlLabel from '@mui/material/FormControlLabel'

// ** Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import FooterIllustrationsV1 from 'src/views/pages/auth/FooterIllustration'

// ** Axios Import
import axios from 'axios'

// ** jwt
import { createToken, verifyToken } from '../../../../utils/auth'
import Cookies from 'js-cookie'

// ** Switch Alert Import
const Swal = require('sweetalert2')

// ** Styled Components
const Card = styled(MuiCard)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' }
}))

const LinkStyled = styled('a')(({ theme }) => ({
  fontSize: '0.875rem',
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

const FormControlLabel = styled(MuiFormControlLabel)(({ theme }) => ({
  '& .MuiFormControlLabel-label': {
    fontSize: '0.875rem',
    color: theme.palette.text.secondary
  }
}))

const LoginPage = () => {
  // ประกาศตัวแปรเพื่อเก็บค่า
  const [user, setUser] = useState('') //เก็บค่า User
  const [password, setPassword] = useState('') //เก็บค่า Password
  const [responsedata, setResponseData] = useState('') // เก็บค่า data ที่จะเอาไปฝังใน local Storage

  // ** State
  const [values, setValues] = useState({
    password: '',
    showPassword: false
  })

  // ** Hook
  const theme = useTheme()
  const router = useRouter()

  // เช็คค่า Cookie
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

  // ฟังก์ชันเก็บค่าตัวแปร
  const handleSetUser = event => {
    setUser(event.target.value)

    // console.log('User input:', event.target.value)
  }

  const handleSetPassword = prop => event => {
    setPassword(event.target.value)
    setValues({ ...values, [prop]: event.target.value })

    // console.log(event.target.value)
  }

  const handleSubmitData = event => {
    event.preventDefault()

    const data = {
      username: user,
      password: password
    }

    console.log('ข้อมูลที่ส่งไป Server', data)

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

            console.log('userData: ', resNameData)
            setResponseData(userData)

            const Roledata = {
              Role: userData
            }

            console.log('ข้อมูล Role', Roledata)

            // Create a JWT
            const token = createToken(Roledata)

            // Store the token in local storage
            localStorage.setItem('jwt', token)
            localStorage.setItem('name', resNameData)
            localStorage.setItem('Email', EmailData)

            // Store the token in a cookie
            Cookies.set('jwt', token)
            Swal.fire({
              icon: 'success',
              title: 'Login Success',
              showConfirmButton: false,
              timer: 1000
            }).then(router.push(`/`))
          } else if (receivedStatus === 'Banned') {
            Swal.fire({
              icon: 'error',
              title: 'คุณโดนแบน',
              text: 'คุณถูกแบนการเข้าใช้งาน'
            })
          } else if (receivedStatus === 'Wait approve') {
            Swal.fire({
              icon: 'info',
              title: 'กรุณารอการดำเนินการ',
              text: 'บัญชีของคุณกำลังรอการอนุมัติ'
            })
          } else {
            Swal.fire({
              icon: 'error',
              title: 'ไม่พบข้อมูล',
              text: 'คุณกรอก User หรือ รหัสผ่านผิด'
            })
          }
        }
      })
      .catch(error => {
        console.error(error)

        Swal.fire({
          icon: 'error',
          title: 'Log in ล้มเหลว...',
          text: 'มีข้อผิดพลาดในการเรียก API'
        })
      })
  }

  return (
    <Box className='content-center' sx={{ display: 'flex', flexDirection: 'column' }}>
      <img src='/images/cards/TCTM_Group_3 (1).png' alt='logo' width='80px' />
      <Typography variant='h4' sx={{ fontWeight: 'bold', marginTop: 2 }}>
        TCTM
      </Typography>
      <Card sx={{ zIndex: 1, marginTop: 3 }}>
        <CardContent sx={{ padding: theme => `${theme.spacing(12, 9, 7)} !important` }}>
          <form noValidate autoComplete='off' onSubmit={e => e.preventDefault()}>
            <TextField
              autoFocus
              fullWidth
              id='email'
              label='Email address'
              sx={{ marginBottom: 4 }}
              onChange={handleSetUser}
            />
            <FormControl fullWidth>
              <InputLabel htmlFor='auth-login-password'>Password</InputLabel>
              <OutlinedInput
                label='Password'
                value={values.password}
                id='auth-login-password'
                onChange={handleSetPassword('password')}
                type={values.showPassword ? 'text' : 'password'}
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
              />
            </FormControl>
            <Box
              sx={{ mb: 4, display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-between' }}
            >
              <FormControlLabel control={<Checkbox />} label='Remember Me' />
              <Link passHref href='/'>
                <LinkStyled onClick={e => e.preventDefault()}>Forgot Password?</LinkStyled>
              </Link>
            </Box>
            <Button fullWidth size='large' variant='contained' sx={{ marginBottom: 7 }} onClick={handleSubmitData}>
              Login
            </Button>
            <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
              <Typography variant='body2' sx={{ marginRight: 2 }}>
                New on our platform?
              </Typography>
              <Typography variant='body2'>
                <Link passHref href='/pages/register'>
                  <LinkStyled>Create an account</LinkStyled>
                </Link>
              </Typography>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Box>
  )
}
LoginPage.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default LoginPage
