// ** React Imports
import { useEffect, useState } from 'react'

// ** Next Import
import Link from 'next/link'
import { useRouter } from 'next/router'

// ** Material UI Imports
import {
  Box,
  CardMedia,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Typography,
  Hidden
} from '@mui/material'

// ** Material-UI Icons Imports
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'

// ** Material Design Icons Imports
import Magnify from 'mdi-material-ui/Magnify'

// ** Layouts Imports
import UserDropdown from 'src/@core/layouts/components/shared-components/UserDropdown'
import NotificationDropdown from 'src/@core/layouts/components/shared-components/NotificationDropdown'

// Import auth token Decode
import { createToken, verifyToken } from 'src/@core/utils/auth'
import Popover from '@mui/material/Popover'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import MenuIcon from '@mui/icons-material/Menu'
import Menu from '@mui/material/Menu'
import { useTheme } from '@mui/system'

const styles = {
  py: 1,
  px: 2,
  alignItems: 'center',
  textDecoration: 'none',
  '& svg': {
    fontSize: '1.5rem'
  }
}

const AppBarContent = props => {
  // ** State สำหรับการค้นหา
  const [searchValue, setSearchValue] = useState('')

  // ** Router ของ Next.js
  const router = useRouter()

  // ** ฟังก์ชันสำหรับการค้นหา
  const handleSearch = value => {
    setSearchValue(value)
  }

  // ** ฟังก์ชันสำหรับการดำเนินการเมื่อกดปุ่มค้นหา
  const handleSearchSubmit = () => {
    if (searchValue.trim() !== '') {
      router.replace(`/category?keyword=${encodeURIComponent(searchValue)}`)
    }
  }

  // ** รับค่าจาก local Storage
  let username = '' // ตัวแปรเก็บค่าชื่อผู้ใช้
  let user_status = '' // ตัวแปรเก็บค่าสถานะ user
  if (typeof window !== 'undefined') {
    username = localStorage.getItem('name')
    user_status = localStorage.getItem('User_Status')
  }

  // console.log('สถานะ user', user_status)

  // ** ทำการถอดรหัส role
  // let role = ''
  // if (typeof window !== 'undefined') {
  //   const token = localStorage.getItem('jwt')
  //   const decodedToken = verifyToken(token)

  //   if (decodedToken) {
  //     role = decodedToken.Role
  //   } else {
  //     console.log('Invalid or expired token')
  //   }
  // }

  const [role, setRole] = useState('')

  const Router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('jwt')
    const decodedToken = verifyToken(token)


    if (decodedToken) {
      setRole(decodedToken.Role)
    } else {
      // console.log('Invalid or expired token')
    }
  }, [])

  // State for dropdown menu
  const [anchorEl, setAnchorEl] = useState(null)

  const handlePopoverOpen = event => {
    setAnchorEl(event.currentTarget)
  }

  const handlePopoverClose = () => {
    setAnchorEl(null)
  }

  const theme = useTheme()

  return (
    <Box
      sx={{
        width: '100%',
        height: '90px',
        bgcolor: theme.palette.grey[50],
        position: 'fixed',
        top: 0,
        zIndex: 1000
      }}
    >
      <Grid container justifyContent='space-between' alignItems='center' sx={{ height: '100%' }}>
        <Grid item xl={3} xs={3}>
          <Box component='a' href='/'>
              <CardMedia
                component='img'
                image='/Logo_digital2day/logodigital2horizon2.png'
                alt='logo'
                sx={{
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'scale(1.1)',
                    transition: 'all 0.3s ease'
                  },
                  '@media (max-width: 1920px)': {
                    width: '55%' // ปรับขนาดเมื่อหน้าจอใหญ่สุด 1920px
                  },
                  '@media (max-width: 960px)': {
                    width: '80%' // ปรับขนาดเมื่อหน้าจอใหญ่สุด 960px
                  }

                  // สามารถเพิ่มเงื่อนไข media query เพิ่มเติมตามความต้องการ
                }}
              />
          </Box>
        </Grid>
        <Grid item xl={8} xs={8} sx={{ mr: '30px' }}>
          <Box sx={{ width: '100%' }}>
            <Grid container justifyContent='flex-end' alignItems='center' spacing={2}>
              <Grid item>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center'
                  }}
                >
                  <FormControl fullWidth variant='outlined'>
                    <OutlinedInput
                      size='small'
                      placeholder='Search Products...'
                      onChange={e => handleSearch(e.target.value)}
                      onKeyPress={e => {
                        if (e.key === 'Enter') handleSearchSubmit()
                      }}
                      startAdornment={
                        <InputAdornment position='start'>
                          <IconButton
                            onClick={handleSearchSubmit}
                            sx={{
                              marginLeft: { xs: -3 },
                              borderRadius: { xs: '8px', md: '12px' } // ปรับขนาดของ borderRadius
                            }}
                          >
                            <Magnify sx={{ color: 'text.primary' }} />
                          </IconButton>
                        </InputAdornment>
                      }
                      sx={{
                        borderRadius: '12px', // ปรับขนาดของ borderRadius สำหรับหน้าจอขนาดใหญ่
                        '@media (max-width: 600px)': {
                          // ใช้ Media Query เพื่อปรับขนาดในหน้าจอเล็ก
                          borderRadius: '8px' // ปรับขนาดของ borderRadius สำหรับหน้าจอขนาดเล็ก
                        }
                      }}
                    />
                  </FormControl>

                  <Hidden mdUp>
                    <IconButton onClick={handlePopoverOpen} sx={{ p: 0, display: 'block' }}>
                      <MenuIcon sx={{ color: 'text.primary' }} />
                    </IconButton>
                    <Popover
                      open={Boolean(anchorEl)}
                      anchorEl={anchorEl}
                      onClose={handlePopoverClose}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center'
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center'
                      }}
                    >
                      <List>
                        <Link href='/member/ports/' passHref>
                          <ListItem >
                            <QuestionAnswerIcon sx={{ color: 'text.primary' }} />
                          </ListItem>
                        </Link>
                        <Link href='/member/order/myoder/' passHref>
                          <ListItem >
                            <ShoppingCartIcon sx={{ color: 'text.primary' }} />
                          </ListItem>
                        </Link>
                        <Link href='/member/logistic' passHref>
                          <ListItem >
                            <LocalShippingIcon sx={{ color: 'text.primary' }} />
                          </ListItem>
                        </Link>
                      </List>
                    </Popover>
                  </Hidden>

                  <Hidden mdDown>
                    <Link href='/member/ports/' passHref>
                      <IconButton
                        sx={{ p: 0 }}
                        style={{ display: role === 'USER' || role === 'ADMIN' ? 'block' : 'none' }}
                      >
                        <Box sx={styles}>
                          <QuestionAnswerIcon sx={{ color: 'text.primary' }} />
                        </Box>
                      </IconButton>
                    </Link>
                    <Link href='/member/order/myoder/' passHref>
                      <IconButton
                        sx={{ p: 0 }}
                        style={{ display: role === 'USER' || role === 'ADMIN' ? 'block' : 'none' }}
                      >
                        <Box sx={styles}>
                          <ShoppingCartIcon sx={{ color: 'text.primary' }} />
                        </Box>
                      </IconButton>
                    </Link>
                    <Link href='/member/logistic' passHref>
                      <IconButton
                        sx={{ p: 0 }}
                        style={{ display: role === 'USER' || role === 'ADMIN' ? 'block' : 'none' }}
                      >
                        <Box sx={styles}>
                          <LocalShippingIcon sx={{ color: 'text.primary' }} />
                        </Box>
                      </IconButton>
                    </Link>
                  </Hidden>
                  <Box
                    sx={{ p: 0 }}
                    style={{ display: role === 'USER' || role === 'ADMIN' ? 'block' : 'none' }}
                  >
                    <NotificationDropdown />
                  </Box>

                  {/* Responsive Dropdown - End */}

                <Box sx={{ ml: 2 }} style={{ display: role !== '' ? 'block' : 'none' }}>
                    <UserDropdown />
                </Box>
                 
                    <Box component='a' href='/login' sx={{ ml: 2, textDecoration: 'none' }} style={{ display: role === '' ? 'block' : 'none' }}>
                      <Typography
                        variant='h6'
                        sx={{ fontSize: '0.875rem', cursor: 'pointer', fontweight: 400 }}
                      >
                        Login
                      </Typography>
                    </Box>
                 
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default AppBarContent
