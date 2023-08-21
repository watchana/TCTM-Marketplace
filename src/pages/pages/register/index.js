// ** React Imports
import { useState, Fragment } from 'react'

// ** MUI X Date picker Imports
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs from 'dayjs'

// ** Next Imports
import Link from 'next/link'

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

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import FooterIllustrationsV1 from 'src/views/pages/auth/FooterIllustration'

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

    console.log('ข้อมูลที่ส่งไป Server', data)

    axios
      .post(`${process.env.NEXT_PUBLIC_API}TCTM.register.register`, data)
      .then(response => {
        console.log(response.data)
        Swal.fire({
          icon: 'success',
          title: 'ส่งข้อมูลสำเร็จ',
          text: 'ข้อมูลถูกส่งไปยัง API แล้ว'
        })
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
    <Box className='content-center'>
      <Card sx={{ zIndex: 1 }}>
        <CardContent sx={{ padding: theme => `${theme.spacing(12, 9, 7)} !important` }}>
          <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg
              width={35}
              height={29}
              version='1.1'
              viewBox='0 0 30 23'
              xmlns='http://www.w3.org/2000/svg'
              xmlnsXlink='http://www.w3.org/1999/xlink'
            >
              <g stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
                <g id='Artboard' transform='translate(-95.000000, -51.000000)'>
                  <g id='logo' transform='translate(95.000000, 50.000000)'>
                    <path
                      id='Combined-Shape'
                      fill={theme.palette.primary.main}
                      d='M30,21.3918362 C30,21.7535219 29.9019196,22.1084381 29.7162004,22.4188007 C29.1490236,23.366632 27.9208668,23.6752135 26.9730355,23.1080366 L26.9730355,23.1080366 L23.714971,21.1584295 C23.1114106,20.7972624 22.7419355,20.1455972 22.7419355,19.4422291 L22.7419355,19.4422291 L22.741,12.7425689 L15,17.1774194 L7.258,12.7425689 L7.25806452,19.4422291 C7.25806452,20.1455972 6.88858935,20.7972624 6.28502902,21.1584295 L3.0269645,23.1080366 C2.07913318,23.6752135 0.850976404,23.366632 0.283799571,22.4188007 C0.0980803893,22.1084381 2.0190442e-15,21.7535219 0,21.3918362 L0,3.58469444 L0.00548573643,3.43543209 L0.00548573643,3.43543209 L0,3.5715689 C3.0881846e-16,2.4669994 0.8954305,1.5715689 2,1.5715689 C2.36889529,1.5715689 2.73060353,1.67359571 3.04512412,1.86636639 L15,9.19354839 L26.9548759,1.86636639 C27.2693965,1.67359571 27.6311047,1.5715689 28,1.5715689 C29.1045695,1.5715689 30,2.4669994 30,3.5715689 L30,3.5715689 Z'
                    />
                    <polygon
                      id='Rectangle'
                      opacity='0.077704'
                      fill={theme.palette.common.black}
                      points='0 8.58870968 7.25806452 12.7505183 7.25806452 16.8305646'
                    />
                    <polygon
                      id='Rectangle'
                      opacity='0.077704'
                      fill={theme.palette.common.black}
                      points='0 8.58870968 7.25806452 12.6445567 7.25806452 15.1370162'
                    />
                    <polygon
                      id='Rectangle'
                      opacity='0.077704'
                      fill={theme.palette.common.black}
                      points='22.7419355 8.58870968 30 12.7417372 30 16.9537453'
                      transform='translate(26.370968, 12.771227) scale(-1, 1) translate(-26.370968, -12.771227) '
                    />
                    <polygon
                      id='Rectangle'
                      opacity='0.077704'
                      fill={theme.palette.common.black}
                      points='22.7419355 8.58870968 30 12.6409734 30 15.2601969'
                      transform='translate(26.370968, 11.924453) scale(-1, 1) translate(-26.370968, -11.924453) '
                    />
                    <path
                      id='Rectangle'
                      fillOpacity='0.15'
                      fill={theme.palette.common.white}
                      d='M3.04512412,1.86636639 L15,9.19354839 L15,9.19354839 L15,17.1774194 L0,8.58649679 L0,3.5715689 C3.0881846e-16,2.4669994 0.8954305,1.5715689 2,1.5715689 C2.36889529,1.5715689 2.73060353,1.67359571 3.04512412,1.86636639 Z'
                    />
                    <path
                      id='Rectangle'
                      fillOpacity='0.35'
                      fill={theme.palette.common.white}
                      transform='translate(22.500000, 8.588710) scale(-1, 1) translate(-22.500000, -8.588710) '
                      d='M18.0451241,1.86636639 L30,9.19354839 L30,9.19354839 L30,17.1774194 L15,8.58649679 L15,3.5715689 C15,2.4669994 15.8954305,1.5715689 17,1.5715689 C17.3688953,1.5715689 17.7306035,1.67359571 18.0451241,1.86636639 Z'
                    />
                  </g>
                </g>
              </g>
            </svg>
            <Typography
              variant='h6'
              sx={{
                ml: 3,
                lineHeight: 1,
                fontWeight: 600,
                textTransform: 'uppercase',
                fontSize: '1.5rem !important'
              }}
            >
              {''} register
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
            />
            {/* Password Input */}
            <FormControl fullWidth sx={{ marginBottom: 4 }} error={password === '' && isSubmitted}>
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
              />
              {password === '' && isSubmitted && <FormHelperText>Please enter your password.</FormHelperText>}
            </FormControl>

            <Divider sx={{ my: 5 }}>and</Divider>
            <Box sx={{ width: '100%' }}>
              {/* FirstName Input */}
              <TextField
                autoFocus
                fullWidth
                id='FirstName'
                label='FirstName EN'
                sx={{ marginBottom: 4 }}
                value={firstname}
                onChange={handleFirstnameSet}
                error={firstname === '' && isSubmitted}
                helperText={firstname === '' && isSubmitted ? 'Please enter your firstname.' : ''}
              />

              {/* LastName Input */}
              <TextField
                autoFocus
                fullWidth
                id='LastName'
                label='LastName EN'
                sx={{ marginBottom: 4 }}
                value={lastname}
                onChange={handleLastnameSet}
                error={lastname === '' && isSubmitted}
                helperText={lastname === '' && isSubmitted ? 'Please enter your lastname.' : ''}
              />

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
              />

              {/* Tel Input */}
              <TextField
                autoFocus
                fullWidth
                id='Tel'
                label='Tel'
                sx={{ marginBottom: 4 }}
                value={tel}
                onChange={handleTelSet}
                error={tel === '' && isSubmitted}
                helperText={tel === '' && isSubmitted ? 'Please enter your tel.' : ''}
              />

              {/* Date Input */}
              <Box sx={{ width: '100%', marginBottom: 4 }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker value={date} onChange={handleDateSet} />
                </LocalizationProvider>
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
              sx={{ marginBottom: 7 }}
              onClick={handleSubmitData}
            >
              Sign up
            </Button>
          </form>
        </CardContent>
      </Card>
      <FooterIllustrationsV1 />
    </Box>
  )
}
RegisterPage.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default RegisterPage
