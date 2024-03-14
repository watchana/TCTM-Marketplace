// ** React Imports
import { useState, Fragment } from 'react'

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
  TextField,
  Typography
} from '@mui/material'
import { styled } from '@mui/system'

// ** MUI X Date picker Imports
import { AdapterDayjs, DatePicker, LocalizationProvider } from '@mui/x-date-pickers/AdapterDayjs'

// ** Material UI Icons Imports

// ** Material Design Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Axios Import
import axios from 'axios'

// ** Day js Import
import dayjs from 'dayjs'

// ** JSON Web Token Imports
import Cookies from 'js-cookie'
import { createToken, verifyToken } from '../../@core/utils/auth'

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

const RegisterPage = () => {
  // ** State
  const [user, setUser] = useState('') // User
  const [password, setPassword] = useState('') // Password
  const [firstName, setFirstName] = useState('') // FirstName
  const [lastName, setLastName] = useState('') // LastName
  const [company, setCompany] = useState('') // Company
  const [address, setAddress] = useState('') // Address
  const [tel, setTel] = useState('') // Tel
  const [date, setDate] = useState(dayjs()) // Date
  const [email, setEmail] = useState('') // Email
  const [isSubmitted, setIsSubmitted] = useState(false) // Check if form is submitted

  const [values, setValues] = useState({
    password: '',
    showPassword: false
  })

  // ** Hook
  const router = useRouter()

  // ** Function
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const handleMouseDownPassword = event => {
    event.preventDefault()
  }

  const handleUserSet = event => {
    const userInput = event.target.value
    if (/^[a-zA-Z]+$/.test(userInput) || userInput === '') {
      setUser(userInput)
    }
  }

  const handlePasswordSet = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
    setPassword(event.target.value)
  }

  const handleFirstNameSet = event => {
    const firstNameInput = event.target.value
    if (/^[a-zA-Z\s]*$/.test(firstNameInput) || firstNameInput === '') {
      setFirstName(firstNameInput)
    }
  }

  const handleLastNameSet = event => {
    const lastNameInput = event.target.value
    if (/^[a-zA-Z]+$/.test(lastNameInput) || lastNameInput === '') {
      setLastName(lastNameInput)
    }
  }

  const handleCompanySet = event => {
    const companyInput = event.target.value
    if (/^[a-zA-Z\s!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]*$/.test(companyInput) || companyInput === '') {
      setCompany(companyInput)
    }
  }

  const handleAddressSet = event => {
    setAddress(event.target.value)
  }

  const handleTelSet = event => {
    const telInput = event.target.value
    if (/^[0-9]*$/.test(telInput) || telInput === '') {
      setTel(telInput)
    }
  }

  const handleDateSet = selectedDate => {
    if (!isNaN(selectedDate) || null) {
      setDate(selectedDate)
    } else {
      setDate('')
    }
  }

  const handleEmailSet = event => {
    const emailInput = event.target.value
    if (/^[a-zA-Z0-9 !@#$%^&*()_+{}\[\]:;<>,.?~\-]+$/.test(emailInput) || emailInput === '') {
      setEmail(emailInput)
    }
  }

  const handleSubmitData = event => {
    event.preventDefault()
    setIsSubmitted(true)

    const fieldsToCheck = [user, password, email, firstName, lastName, company, address, tel, date]
    if (fieldsToCheck.some(field => field === '' || field === null || field === undefined)) {
      SwitchAlert.fire({
        icon: 'error',
        title: 'Please provide all information.',
        text: 'Please fill in all fields.'
      })

      return
    }

    let formattedDate = ''
    if (date) {
      formattedDate = date.format('MM/DD/YYYY')
    }

    if (formattedDate === '') {
      SwitchAlert.fire({
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
      user_first_name: firstName,
      user_last_name: lastName,
      user_company: company,
      user_address: address,
      user_tel: tel,
      user_birthday: formattedDate
    }

    axios
      .post(`${process.env.NEXT_PUBLIC_API}DIGITAL.register.register`, data)
      .then(response => {
        SwitchAlert.fire({
          icon: 'success',
          title: 'Sending succeeded',
          text: 'Data is sent to API'
        })
        router.push('/login')
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
        <CardContent></CardContent>
      </CardStyled>
    </Background>
  )
}
RegisterPage.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default RegisterPage
