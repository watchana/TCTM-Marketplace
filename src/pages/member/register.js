// ** React Imports
import { useState, Fragment, useRef } from 'react'

// ** Next Imports
import Link from 'next/link'
import { useRouter } from 'next/router'

// ** MUI X Date picker Imports
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs from 'dayjs'
import ReCAPTCHA from 'react-google-recaptcha'

// ** Material UI Imports
import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Switch,
  TextField,
  Typography
} from '@mui/material'

// ** MUI System Imports
import { styled } from '@mui/material/styles'

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
import Recaptcha from '../recapcha'
import MySeo from '../seo'

// ** Switch Alert Import
const SAlert = require('sweetalert2')

// ** Styled Components
const LinkStyled = styled('a')(({ theme }) => ({
  fontSize: '0.875rem',
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

const RegisterPage = () => {
  // ** States
  const [values, setValues] = useState({
    password: '',
    showPassword: false
  })

  // คอมโพเนนต์ของ reCAPTCHA
  const [recaptchaValue, setRecaptchaValue] = useState(false)

  // สร้างฟังก์ชันเมื่อ reCAPTCHA ถูกยืนยัน

  const handleRecaptchaVerify = async token => {
    const secretKey = process.env.NEXT_RECAPTCHA_KEY

    if (token) {
      setRecaptchaValue(true)
    }
  }

  // ** Hook
  const router = useRouter()

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const handleMouseDownPassword = event => {
    event.preventDefault()
  }

  // State values
  const [user, setUser] = useState('') // ตัวแปรเก็บค่า User
  const [password, setPassword] = useState('') // ตัวแปรเก็บค่า password
  const [firstname, setFirstname] = useState('') // ตัวแปรเก็บค่า firstname
  const [lastname, setLastname] = useState('') // ตัวแปรเก็บค่า lastname
  const [company, setCompany] = useState('') // ตัวแปรเก็บค่า company
  const [address, setAddress] = useState('') // ตัวแปรเก็บค่า address
  const [tel, setTel] = useState('') // ตัวแปรเก็บค่า Tel
  const [date, setDate] = useState(dayjs()) // ตัวแปรเก็บค่า Date
  const [email, setEmail] = useState('') // ตัวแปรเก็บค่า Email

  // ตัวแปรเช็คสถานะการส่งข้อมูล
  const [isSubmitted, setIsSubmitted] = useState(false)

  //**  ฟังก์ชันบัณทึกการเปลี่ยนแปลงค่า Input

  // ฟังก์ชันบัณทึกค่าของ User
  const handleUserSet = event => {
    const userInput = event.target.value
    if (/^[a-zA-Z_0-9.]+$/.test(userInput) || userInput === '') {
      setUser(userInput)
    }
  }

  // ฟังก์ชันบัณทึกค่าของ Password
  const handlePasswordSet = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
    setPassword(event.target.value)
  }

  // ฟังก์ชันบัณทึกค่าของ firstname
  const handleFirstnameSet = event => {
    const firstnameInput = event.target.value
    if (/^[a-zA-Z\s]*$/.test(firstnameInput) || firstnameInput === '') {
      setFirstname(firstnameInput)
    }
  }

  // ฟังก์ชันบัณทึกค่าของ Lastname
  const handleLastnameSet = event => {
    const lastnameInput = event.target.value
    if (/^[a-zA-Z]+$/.test(lastnameInput) || lastnameInput === '') {
      setLastname(lastnameInput)
    }
  }

  // ฟังก์ชันบัณทึกค่าของ company
  const handleCompanySet = event => {
    const companyInput = event.target.value
    if (/^[a-zA-Z\s!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]*$/.test(companyInput) || companyInput === '') {
      setCompany(companyInput)
    }
  }

  // ฟังก์ชันบัณทึกค่าของ Address
  const handleAddressSet = event => {
    setAddress(event.target.value)
  }

  // ฟังก์ชันบัณทึกค่าของ tel
  const handleTelSet = event => {
    const telInput = event.target.value
    if (/^[0-9]*$/.test(telInput) || telInput === '') {
      setTel(telInput)
    }
  }

  // ฟังก์ชันบัณทึกค่าของ date
  const handleDateSet = selectedDate => {
    if (!isNaN(selectedDate) || null) {
      setDate(selectedDate)
    } else {
      setDate('')
    }
  }

  // ฟังก์ชันบัณทึกค่าของ email
  const handleEmailSet = event => {
    const emailInput = event.target.value
    if (/^[a-zA-Z0-9 !@#$%^&*()_+{}\[\]:;<>,.?~\-]+$/.test(emailInput) || emailInput === '') {
      setEmail(emailInput)
    }
  }

  const handleSubmitData = event => {
    event.preventDefault()
    setIsSubmitted(true)

    // ตรวจสอบว่า reCAPTCHA ถูกต้อง
    if (!recaptchaValue) {
      // กระทำเมื่อ reCAPTCHA ไม่ถูกต้อง (ตัวอย่าง: แสดงข้อความหรือบล็อกการส่ง)
      // console.log('Please complete the reCAPTCHA.')

      return
    }

    // ตรวจสอบค่าว่างอื่นๆ และดำเนินการตามปกติ
    // ...

    // ตรวจสอบค่าว่างก่อนส่ง
    const fieldsToCheck = [user, password, email, firstname, lastname, company, address, tel, date]
    if (fieldsToCheck.some(field => field === '' || field === null || field === undefined)) {
      SAlert.fire({
        icon: 'error',
        title: 'Please provide all information.',
        text: 'Please fill in all fields.'
      })

      return
    }

    // แปลงค่าวันเกิด user ก่อนส่ง ส่ง
    let formattedDate = ''
    if (date) {
      formattedDate = date.format('MM/DD/YYYY')
    }

    if (formattedDate === '') {
      SAlert.fire({
        icon: 'error',
        title: 'Please provide all information.',
        text: 'Please fill in all fields.'
      })

      return
    }

    const data = {
      username: user,
      password: password,
      user_email: email,
      user_first_name: firstname,
      user_last_name: lastname,
      user_company: company,
      user_address: address,
      user_tel: tel,
      user_birthday: formattedDate
    }

    axios
      .post(`${process.env.NEXT_PUBLIC_API}DIGITAL.register.register`, data)
      .then(response => {
        SAlert.fire({
          icon: 'success',
          title: 'Sending succeeded',
          text: 'Data is sent to API'
        })
        router.push('/login')
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
      <MySeo
        title={'Create Account'}
        description={'Create Account'}
        keywords={'Create Account'}
        content={'Create Account'}
      />
      <Card
        sx={{
          display: 'grid',
          placeItems: 'center',
          width: '100%',
          maxWidth: '28rem',
          paddingX: { xs: '1rem', sm: '1.5rem' },
          paddingY: '1rem',
          borderRadius: '30px'
        }}
      >
        <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
          <form noValidate autoComplete='off' onSubmit={e => e.preventDefault()}>
            <Typography
              variant='h4'
              color='primary'
              textAlign='center'
              sx={{ fontWeight: '600', marginBottom: '1rem' }}
            >
              Center Account
            </Typography>
            {/* ---------- Username ---------- */}
            <TextField
              fullWidth
              label='Username'
              variant='outlined'
              value={user}
              onChange={handleUserSet}
              error={user === '' && isSubmitted}
              helperText={user === '' && isSubmitted ? 'Please enter your username.' : ''}
              sx={{ marginBottom: 4 }}
              InputProps={{
                style: {
                  borderRadius: '10px'
                }
              }}
            />
            {/* ---------- Password ---------- */}
            <FormControl fullWidth sx={{ marginBottom: 2 }} error={password === '' && isSubmitted}>
              <InputLabel htmlFor='auth-register-password'>Password</InputLabel>
              <OutlinedInput
                label='Password'
                value={values.password}
                id='auth-register-password'
                onChange={handlePasswordSet('password')}
                type={values.showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      edge='end'
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      aria-label='toggle password visibility'
                    >
                      {values.showPassword ? <EyeOutline fontSize='small' /> : <EyeOffOutline fontSize='small' />}
                    </IconButton>
                  </InputAdornment>
                }
                style={{ borderRadius: '10px' }}
              />
              {password === '' && isSubmitted && <FormHelperText>Please enter your password.</FormHelperText>}
            </FormControl>
            <Divider sx={{ marginBottom: 2, color: '#2d2e81' }}>AND</Divider>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%', marginBottom: 4 }}>
              {/* ---------- First name ---------- */}
              <TextField
                fullWidth
                label='First name'
                variant='outlined'
                onChange={handleFirstnameSet}
                error={firstname === '' && isSubmitted}
                helperText={firstname === '' && isSubmitted ? 'Please enter your firstname.' : ''}
                InputProps={{
                  style: {
                    borderRadius: '10px'
                  }
                }}
                sx={{ maxWidth: '48%', marginRight: '2%' }}
              />
              {/* ---------- Last name ---------- */}
              <TextField
                fullWidth
                label='Last name'
                variant='outlined'
                onChange={handleLastnameSet}
                error={lastname === '' && isSubmitted}
                helperText={lastname === '' && isSubmitted ? 'Please enter your lastname.' : ''}
                InputProps={{
                  style: {
                    borderRadius: '10px'
                  }
                }}
                sx={{ maxWidth: '48%', marginLeft: '2%' }}
              />
            </Box>
            {/* ---------- Company ---------- */}
            <TextField
              fullWidth
              label='Company'
              variant='outlined'
              onChange={handleCompanySet}
              value={company}
              error={company === '' && isSubmitted}
              helperText={company === '' && isSubmitted ? 'Please enter your company.' : ''}
              InputProps={{
                style: {
                  borderRadius: '10px'
                }
              }}
              sx={{ marginBottom: 4 }}
            />
            {/* ---------- Address ---------- */}
            <TextField
              fullWidth
              label='Address'
              variant='outlined'
              onChange={handleAddressSet}
              value={address}
              error={address === '' && isSubmitted}
              helperText={address === '' && isSubmitted ? 'Please enter your address.' : ''}
              InputProps={{
                style: {
                  borderRadius: '10px'
                }
              }}
              sx={{ marginBottom: 4 }}
            />
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%', marginBottom: 4 }}>
              {/* ---------- Tel ---------- */}
              <TextField
                fullWidth
                label='Tel'
                variant='outlined'
                onChange={handleTelSet}
                value={tel}
                error={tel === '' && isSubmitted}
                helperText={tel === '' && isSubmitted ? 'Please enter your tel.' : ''}
                InputProps={{
                  style: {
                    borderRadius: '10px'
                  }
                }}
                sx={{ maxWidth: '48%', marginRight: '2%' }}
              />
              {/* ---------- Date ---------- */}
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label='Date'
                  value={date}
                  format="DD/MM/YYYY"
                  onChange={handleDateSet}
                  renderInput={props => <TextField {...props} />}
                  sx={{ maxWidth: '48%', marginLeft: '2%' }}
                />
              </LocalizationProvider>
            </Box>
            {/* ---------- Email ---------- */}
            <TextField
              fullWidth
              label='Email'
              variant='outlined'
              onChange={handleEmailSet}
              value={email}
              error={email === '' && isSubmitted}
              helperText={email === '' && isSubmitted ? 'Please enter your email.' : ''}
              InputProps={{
                style: {
                  borderRadius: '10px'
                }
              }}
              sx={{ marginBottom: 4 }}
            />
            {/* เพิ่ม reCAPTCHA ในแบบฟอร์ม */}
            <Recaptcha onVerify={handleRecaptchaVerify} />
            {/* ---------- Checkbox ---------- */}
            <FormControlLabel
              control={<Checkbox />}
              label={
                <Fragment>
                  <span>I agree to </span>
                  <Link href='/' passHref>
                    <LinkStyled underline='none' onClick={e => e.preventDefault()}>
                      privacy policy & terms
                    </LinkStyled>
                  </Link>
                </Fragment>
              }
              sx={{ marginBottom: 4 }}
            />
            {/* ---------- Button ---------- */}
            <Button
              fullWidth
              variant='contained'
              onClick={handleSubmitData}
              sx={{
                backgroundColor: 'primary.main',
                color: '#fff',
                borderRadius: '10px',
                marginBottom: '1rem'
              }}
            >
              Sign up
            </Button>
            <Typography variant='body1' sx={{ fontWeight: '600', marginBottom: '1rem' }}>
              Already have an account?
            </Typography>
            <Link href='/login' passHref>
              <Button fullWidth variant='outlined' sx={{ borderRadius: '10px' }}>
                Sign in
              </Button>
            </Link>
          </form>
        </CardContent>
      </Card>
    </Box>
  )
}
RegisterPage.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default RegisterPage
