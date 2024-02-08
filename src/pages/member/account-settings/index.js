// ** React Imports
import React, { useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Alert from '@mui/material/Alert'
import Select from '@mui/material/Select'
import { styled } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import AlertTitle from '@mui/material/AlertTitle'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import Button from '@mui/material/Button'
import { Divider, InputAdornment } from '@mui/material'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'

// ** Axios Imports
import axios from 'axios'
import { Visibility, VisibilityOff } from '@mui/icons-material'

// ** Switch Alert Import
const Swal = require('sweetalert2')

const ImgStyled = styled('img')(({ theme }) => ({
  width: 120,
  height: 120,
  marginRight: theme.spacing(6.25),
  borderRadius: theme.shape.borderRadius
}))

const Account = () => {
  // ** State
  const [openAlert, setOpenAlert] = useState(true)
  const [imgSrc, setImgSrc] = useState('/images/avatars/7.png')
  const [shouldFetchData, setShouldFetchData] = useState(true) // state control fate data

  // data state
  const [userId, setUserId] = useState('') //  user Id
  const [userdata, setUserData] = useState('') // user data

  // console.log('userdata', userdata)

  // data user state
  const [userName, setUserName] = useState('')
  const [userLastName, setUserLastName] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [userAddress, setUserAddress] = useState('')
  const [userPhone, setUserPhone] = useState('')
  const [userCompany, setUserCompany] = useState('')
  const [userHost, setUserHost] = useState('')
  const [key, setKey] = useState('')
  const [secret, setSecret] = useState('')
  const [status, setStatus] = useState('')

  // local Storagec Variables
  useEffect(() => {
    const userIdFromLocalStorage = localStorage.getItem('Member_Id')
    if (userIdFromLocalStorage) {
      setUserId(userIdFromLocalStorage)
    }
  }, [])

  // Set Begining data State
  useEffect(() => {
    setUserName(userdata.user_first_name || '')
    setUserLastName(userdata.user_last_name || '')
    setUserEmail(userdata.user_email || '')
    setUserAddress(userdata.user_address || '')
    setUserPhone(userdata.user_tel || '')
    setUserCompany(userdata.user_company || '')
    setUserHost(userdata.sup_hostaddress || '')
    setStatus(userdata.user_status || '')
  }, [
    userdata.user_first_name,
    userdata.user_last_name,
    userdata.user_email,
    userdata.user_address,
    userdata.user_tel,
    userdata.user_company,
    userdata.sup_hostaddress,
    userdata.user_status
  ])

  // Reset data function
  const handleResetData = () => {
    setUserName('')
    setUserLastName('')
    setUserEmail('')
    setUserAddress('')
    setUserPhone('')
    setUserCompany('')
  }

  // Chang user data function
  const handleChangUserData = async e => {
    e.preventDefault()

    const data = {
      member_id: userId,
      email: userEmail,
      address: userAddress,
      phone: userPhone,
      company: userCompany,
      host: userHost
    }

    try {
      const data = {
        member_id: userId,
        email: userEmail,
        address: userAddress,
        phone: userPhone,
        company: userCompany,
        userHost: userHost,
        key: key,
        secret: secret
      }

      const fieldsToCheck = [userId, userEmail, userAddress, userPhone, userCompany]

      if (fieldsToCheck.some(field => field === '' || field === null || field === undefined)) {
        Swal.fire({
          icon: 'error',
          title: 'Please fill in complete information.',
          text: 'Please fill out all fields.'
        })

        return
      }

      const response = await axios.post(`${process.env.NEXT_PUBLIC_API}TCTM.profile.update_profile`, data)
      console.log(response.data)

      Swal.fire({
        icon: 'success',
        title: 'Change data success'
      })

      setShouldFetchData(true)
    } catch (error) {
      console.error(error)
      Swal.fire({
        icon: 'error',
        title: 'Log in fail...',
        text: 'There was an error calling the API.'
      })
    }
  }

  // Api Call Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API}TCTM.profile.display_profile`, {
          params: {
            member_id: userId
          }
        })
        setUserData(response.data.message.Data[0])
        console.log('response', response.data.message.Data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()

    if (shouldFetchData) {
      fetchData()
      setShouldFetchData(false)
    }
  }, [userId, shouldFetchData])

  // Data Control
  const handleUserNameSet = event => {
    setUserName(event.target.value)
  }

  const handleLastNameSet = event => {
    setUserLastName(event.target.value)
  }

  const handleEmailSet = event => {
    setUserEmail(event.target.value)
  }

  const handleAddressSet = event => {
    setUserAddress(event.target.value)
  }

  const handlePhoneSet = event => {
    setUserPhone(event.target.value)
  }

  const handleCompanySet = event => {
    setUserCompany(event.target.value)
  }

  const handleHost = event => {
    setUserHost(event.target.value)
  }

  const handleKey = event => {
    setKey(event.target.value)
  }

  const handleSecret = event => {
    setSecret(event.target.value)
  }

  return (
    <CardContent>
      <form>
        <Grid container spacing={7}>
          <Grid item xs={12} sx={{ marginTop: 4.8, marginBottom: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ImgStyled src={imgSrc} alt='Profile Pic' />
            </Box>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField fullWidth label='Name' placeholder='Name' value={userName} onChange={handleUserNameSet} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='Last Name'
              placeholder='Last Name'
              value={userLastName}
              onChange={handleLastNameSet}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth type='email' label='Email' value={userEmail} onChange={handleEmailSet} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type='Phone'
              label='Phone'
              placeholder='Phone'
              defaultValue='Phone'
              value={userPhone}
              onChange={handlePhoneSet}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type='Company'
              label='Company'
              placeholder='Company'
              defaultValue='Company'
              value={userCompany}
              onChange={handleCompanySet}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type='Address'
              label='Address'
              placeholder='Address'
              defaultValue='Address'
              value={userAddress}
              onChange={handleAddressSet}
            />
          </Grid>
          {status === '2' ? (
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type='Host'
                label='Host'
                placeholder='Host'
                defaultValue='Host'
                value={userHost}
                onChange={handleHost}
              />
            </Grid>
          ) : (
            ''
          )}
          {status === '2' ? (
            <Grid item xs={12} sm={3} width={'50%'}>
              <TextField
                label='API Key'
                type='password'
                placeholder='API Key'
                defaultValue='API Key'
                value={key}
                onChange={handleKey}
              />
            </Grid>
          ) : (
            ''
          )}
          {status === '2' ? (
            <Grid item xs={12} sm={3} width={'50%'}>
              <TextField
                label='API Keysecret'
                type='password'
                placeholder='API Keysecret'
                defaultValue='API Keysecret'
                value={secret}
                onChange={handleSecret}
              />
            </Grid>
          ) : (
            ''
          )}

          {/* {openAlert ? (
            <Grid item xs={12} sx={{ mb: 3 }}>
              <Alert
                severity='warning'
                sx={{ '& a': { fontWeight: 400 } }}
                action={
                  <IconButton size='small' color='inherit' aria-label='close' onClick={() => setOpenAlert(false)}>
                    <Close fontSize='inherit' />
                  </IconButton>
                }
              >
                <AlertTitle>Your email is not confirmed. Please check your inbox.</AlertTitle>
                <Link href='/' onClick={e => e.preventDefault()}>
                  Resend Confirmation
                </Link>
              </Alert>
            </Grid>
          ) : null} */}

          <Grid item xs={12}>
            <Button variant='contained' sx={{ marginRight: 3.5 }} onClick={e => handleChangUserData(e)}>
              Save Changes
            </Button>

            <Button type='reset' variant='outlined' color='secondary' onClick={handleResetData}>
              Reset
            </Button>
          </Grid>
        </Grid>
      </form>
    </CardContent>
  )
}

export default Account
