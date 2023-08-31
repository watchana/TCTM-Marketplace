// ** React Imports
import { useState, Fragment } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** MUI Imports
import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import Badge from '@mui/material/Badge'
import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

// ** Icons Imports
import CogOutline from 'mdi-material-ui/CogOutline'
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'
import EmailOutline from 'mdi-material-ui/EmailOutline'
import LogoutVariant from 'mdi-material-ui/LogoutVariant'
import AccountOutline from 'mdi-material-ui/AccountOutline'
import MessageOutline from 'mdi-material-ui/MessageOutline'
import HelpCircleOutline from 'mdi-material-ui/HelpCircleOutline'
import StorefrontPlusOutline from 'mdi-material-ui/StorefrontPlusOutline'

// Import Cookie
import Cookies from 'js-cookie'

// Import auth token Decode
import { createToken, verifyToken } from '../../../../../utils/auth'

// ** Styled Components
const BadgeContentSpan = styled('span')(({ theme }) => ({
  width: 8,
  height: 8,
  borderRadius: '50%',
  backgroundColor: theme.palette.success.main,
  boxShadow: `0 0 0 2px ${theme.palette.background.paper}`
}))

const UserDropdown = () => {
  // ** States
  const [anchorEl, setAnchorEl] = useState(null)

  // ** Hooks
  const router = useRouter()

  const handleDropdownOpen = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleDropdownClose = url => {
    if (url) {
      if (url === '/pages/login') {
        // Clear token from local storage
        localStorage.removeItem('jwt')
        localStorage.removeItem('name')
        localStorage.removeItem('Email')
        localStorage.removeItem('Member_Id')

        // Clear token from Cookies
        Cookies.remove('jwt')
      }
      router.push(url)
    }
    setAnchorEl(null)
  }

  const styles = {
    py: 2,
    px: 4,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    color: 'text.primary',
    textDecoration: 'none',
    '& svg': {
      fontSize: '1.375rem',
      color: 'text.secondary'
    }
  }

  // ** รับค่าจาก local Storage
  let username = ''
  if (typeof window !== 'undefined') {
    username = localStorage.getItem('name')
  }

  // ** ทำการถอดรหัส role
  let role = ''
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('jwt')
    const decodedToken = verifyToken(token)

    if (decodedToken) {
      role = decodedToken.Role
    } else {
      console.log('Invalid or expired token')
    }
  }

  console.log('โรล', role)

  return (
    <Fragment>
      <Badge
        overlap='circular'
        onClick={handleDropdownOpen}
        sx={{ ml: 2, cursor: 'pointer' }}
        badgeContent={<BadgeContentSpan />}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Avatar
          alt='John Doe'
          onClick={handleDropdownOpen}
          sx={{ width: 40, height: 40 }}
          src='/images/avatars/1.png'
        />
      </Badge>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => handleDropdownClose()}
        sx={{ '& .MuiMenu-paper': { width: 230, marginTop: 4 } }}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Box sx={{ pt: 2, pb: 3, px: 4 }} onClick={() => handleDropdownClose()}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Badge
              overlap='circular'
              badgeContent={<BadgeContentSpan />}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
              <Avatar alt='John Doe' src='/images/avatars/1.png' sx={{ width: '2.5rem', height: '2.5rem' }} />
            </Badge>
            <Box sx={{ display: 'flex', marginLeft: 3, alignItems: 'flex-start', flexDirection: 'column' }}>
              <Typography sx={{ fontWeight: 600 }}>{username}</Typography>
              <Typography variant='body2' sx={{ fontSize: '0.8rem', color: 'text.disabled' }}>
                {role}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Divider sx={{ mt: 0, mb: 1 }} />
        <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose()}>
          <Box sx={styles}>
            <AccountOutline sx={{ marginRight: 2 }} />
            Profile
          </Box>
        </MenuItem>
        <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose()}>
          <Box sx={styles}>
            <EmailOutline sx={{ marginRight: 2 }} />
            Inbox
          </Box>
        </MenuItem>
        {/* ปุ่ม registration-supplier */}
        <MenuItem
          sx={{ p: 0 }}
          onClick={() => handleDropdownClose('/pages/registerSupplier/')}
          style={{ display: role === 'USER' ? 'block' : 'none' }}
        >
          <Box sx={styles}>
            <StorefrontPlusOutline sx={{ marginRight: 2 }} />
            Registration Maker
          </Box>
        </MenuItem>
        {/* ปุ่มหน้า My Market */}
        <MenuItem
          sx={{ p: 0 }}
          onClick={() => handleDropdownClose('/pages/myMarket/')}
          style={{ display: role === 'USER' ? 'block' : 'none' }}
        >
          <Box sx={styles}>
            <CurrencyUsd sx={{ marginRight: 2 }} />
            My Market
          </Box>
        </MenuItem>
        {/* ปุ่ม Approve */}
        <MenuItem
          sx={{ p: 0 }}
          onClick={() => handleDropdownClose('/app/admin/manager/')}
          style={{ display: role === 'TCTM' || role === 'ADMIN' ? 'block' : 'none' }}
        >
          <Box sx={styles}>
            <CurrencyUsd sx={{ marginRight: 2 }} />
            Approve(TCTM)
          </Box>
        </MenuItem>
        {/* ปุ่ม Approve Category*/}
        <MenuItem
          sx={{ p: 0 }}
          onClick={() => handleDropdownClose('/backoffice/category-manager')}
          style={{ display: role === 'ADMIN' ? 'block' : 'none' }}
        >
          <Box sx={styles}>
            <CurrencyUsd sx={{ marginRight: 2 }} />
            Manage Category
          </Box>
        </MenuItem>
        {/* ปุ่ม Backoffice หน้า Band*/}
        <MenuItem
          sx={{ p: 0 }}
          onClick={() => handleDropdownClose('/backoffice')}
          style={{ display: role === 'ADMIN' ? 'block' : 'none' }}
        >
          <Box sx={styles}>
            <CurrencyUsd sx={{ marginRight: 2 }} />
            Backoffice
          </Box>
        </MenuItem>
        <Divider />
        <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose()}>
          <Box sx={styles}>
            <CogOutline sx={{ marginRight: 2 }} />
            Settings
          </Box>
        </MenuItem>
        <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose()}>
          <Box sx={styles}>
            <HelpCircleOutline sx={{ marginRight: 2 }} />
            FAQ
          </Box>
        </MenuItem>
        <Divider />
        <MenuItem sx={{ py: 2 }} onClick={() => handleDropdownClose('/pages/login')}>
          <LogoutVariant sx={{ marginRight: 2, fontSize: '1.375rem', color: 'text.secondary' }} />
          Logout
        </MenuItem>
      </Menu>
    </Fragment>
  )
}

export default UserDropdown
