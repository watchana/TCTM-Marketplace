// ** React Imports
import { useState, Fragment } from 'react'

// ** MUI X Date picker Imports
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs from 'dayjs'

// ** Next Imports
import Link from 'next/link'
import { useRouter } from 'next/router'

// ** Axios Import
import axios from 'axios'

// ** MUI Components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled, useTheme } from '@mui/material/styles'
import MuiCard from '@mui/material/Card'
import InputAdornment from '@mui/material/InputAdornment'
import MuiFormControlLabel from '@mui/material/FormControlLabel'
import { FormHelperText } from '@mui/material'

// ** Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

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
  marginTop: theme.spacing(1.5),
  marginBottom: theme.spacing(4),
  '& .MuiFormControlLabel-label': {
    fontSize: '0.875rem',
    color: theme.palette.text.secondary
  }
}))

const RegisterPage = () => {
  // ** States
  const [values, setValues] = useState({
    password: '',
    showPassword: false
  })

  // ** Hook
  const theme = useTheme()
  const router = useRouter()

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const handleMouseDownPassword = event => {
    event.preventDefault()
  }

  // ประกาศตัวแปรเก็บข้อมูล
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
    if (/^[a-zA-Z]+$/.test(userInput) || userInput === '') {
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

    // ตรวจสอบค่าว่างก่อนส่ง
    const fieldsToCheck = [user, password, email, firstname, lastname, company, address, tel, date]
    if (fieldsToCheck.some(field => field === '' || field === null || field === undefined)) {
      Swal.fire({
        icon: 'error',
        title: 'กรุณาระบุข้อมูลให้ครบ',
        text: 'โปรดกรอกข้อมูลให้ครบทุกช่อง'
      })

      return
    }

    // แปลงค่าวันเกิด user ก่อนส่ง ส่ง
    let formattedDate = ''
    if (date) {
      formattedDate = date.format('MM/DD/YYYY')
    }

    if (formattedDate === '') {
      Swal.fire({
        icon: 'error',
        title: 'กรุณาระบุข้อมูลให้ครบ',
        text: 'โปรดกรอกข้อมูลให้ครบทุกช่อง'
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
      .post(`${process.env.NEXT_PUBLIC_API}TCTM.register.register`, data)
      .then(response => {
        Swal.fire({
          icon: 'success',
          title: 'ส่งข้อมูลสำเร็จ',
          text: 'ข้อมูลถูกส่งไปยัง API แล้ว'
        })
        router.push('/pages/login')
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
    <Box className='content-center' sx={{ bgcolor: '#FFF8F9' }}>
      <Card sx={{ zIndex: 1, borderRadius: '34px' }}>
        <CardContent sx={{ padding: theme => `${theme.spacing(7, 9, 2)} !important` }}>
          <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography
              variant='h6'
              color='primary'
              sx={{
                lineHeight: 1,
                fontWeight: 600,
                textTransform: 'uppercase',
                fontSize: '1.5rem !important'
              }}
            >
              Center Account
            </Typography>
          </Box>
          <form noValidate autoComplete='off' onSubmit={e => e.preventDefault()}>
            {/* User Input */}
            <TextField
              autoFocus
              fullWidth
              id='username'
              label='Username'
              sx={{ marginBottom: 4 }}
              value={user}
              onChange={handleUserSet}
              error={user === '' && isSubmitted}
              helperText={user === '' && isSubmitted ? 'Please enter your username.' : ''}
              InputProps={{
                style: {
                  borderRadius: '10px'
                }
              }}
            />
            {/* Password Input */}
            <FormControl fullWidth sx={{ marginBottom: 1 }} error={password === '' && isSubmitted}>
              <InputLabel htmlFor='auth-register-password'>Password</InputLabel>
              <OutlinedInput
                style={{ borderRadius: '10px' }}
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
              />
              {password === '' && isSubmitted && <FormHelperText>Please enter your password.</FormHelperText>}
            </FormControl>

            <Divider sx={{ marginY: 3, color: '#EF5350' }}>AND</Divider>
            <Box sx={{ width: '100%', marginTop: 1 }}>
              <Box sx={{ width: '100%', marginBottom: 4, display: 'flex', justifyContent: 'space-between' }}>
                {/* FirstName Input */}
                <TextField
                  autoFocus
                  id='FirstName'
                  label='FirstName EN'
                  sx={{ width: '48%' }}
                  value={firstname}
                  onChange={handleFirstnameSet}
                  error={firstname === '' && isSubmitted}
                  helperText={firstname === '' && isSubmitted ? 'Please enter your firstname.' : ''}
                  InputProps={{
                    style: {
                      borderRadius: '10px'
                    }
                  }}
                />

                {/* LastName Input */}
                <TextField
                  autoFocus
                  id='LastName'
                  label='LastName EN'
                  sx={{ width: '48%' }}
                  value={lastname}
                  onChange={handleLastnameSet}
                  error={lastname === '' && isSubmitted}
                  helperText={lastname === '' && isSubmitted ? 'Please enter your lastname.' : ''}
                  InputProps={{
                    style: {
                      borderRadius: '10px'
                    }
                  }}
                />
              </Box>

              {/* Company Input */}
              <TextField
                autoFocus
                fullWidth
                id='Company'
                label='Company'
                sx={{ marginBottom: 4 }}
                value={company}
                onChange={handleCompanySet}
                error={company === '' && isSubmitted}
                helperText={company === '' && isSubmitted ? 'Please enter your company.' : ''}
                InputProps={{
                  style: {
                    borderRadius: '10px'
                  }
                }}
              />

              {/* Address Input */}
              <TextField
                autoFocus
                fullWidth
                id='Address'
                label='Address'
                sx={{ marginBottom: 4 }}
                value={address}
                onChange={handleAddressSet}
                error={address === '' && isSubmitted}
                helperText={address === '' && isSubmitted ? 'Please enter your address.' : ''}
                InputProps={{
                  style: {
                    borderRadius: '10px'
                  }
                }}
              />

              <Box sx={{ width: '100%', marginBottom: 4, display: 'flex', justifyContent: 'space-between' }}>
                {/* Tel Input */}
                <TextField
                  autoFocus
                  fullWidth
                  id='Tel'
                  label='Tel'
                  sx={{ width: '49%' }}
                  value={tel}
                  onChange={handleTelSet}
                  error={tel === '' && isSubmitted}
                  helperText={tel === '' && isSubmitted ? 'Please enter your tel.' : ''}
                  InputProps={{
                    style: {
                      borderRadius: '10px'
                    }
                  }}
                />

                {/* Date Input */}
                <Box sx={{ width: '49%' }}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker value={date} onChange={handleDateSet} />
                  </LocalizationProvider>
                </Box>
              </Box>
              {/* Email Input */}
              <TextField
                fullWidth
                type='email'
                label='Email'
                sx={{ marginBottom: 4 }}
                value={email}
                onChange={handleEmailSet}
                error={email === '' && isSubmitted}
                helperText={email === '' && isSubmitted ? 'Please enter your email.' : ''}
                InputProps={{
                  style: {
                    borderRadius: '10px'
                  }
                }}
              />
            </Box>
            <FormControlLabel
              control={<Checkbox />}
              label={
                <Fragment>
                  <span>I agree to </span>
                  <Link href='/' passHref>
                    <LinkStyled onClick={e => e.preventDefault()}>privacy policy & terms</LinkStyled>
                  </Link>
                </Fragment>
              }
            />
            <Button
              fullWidth
              size='large'
              type='submit'
              variant='contained'
              sx={{ marginBottom: 5 }}
              style={{ borderRadius: '10px' }}
              onClick={handleSubmitData}
            >
              Sign up
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  )
}
RegisterPage.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default RegisterPage
