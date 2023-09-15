// ** React Imports
import { useState, Fragment, useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import { styled } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import MuiMenu from '@mui/material/Menu'
import MuiAvatar from '@mui/material/Avatar'
import MuiMenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'

// ** axios Import
import axios from 'axios'

// ** Next Import
import Link from 'next/link'
import { useRouter } from 'next/router'

// ** Icons Imports
import BellOutline from 'mdi-material-ui/BellOutline'

// ** Third Party Components
import PerfectScrollbarComponent from 'react-perfect-scrollbar'
import User from 'src/views/backoffice/user'

// ** Styled Menu component
const Menu = styled(MuiMenu)(({ theme }) => ({
  '& .MuiMenu-paper': {
    width: 380,
    overflow: 'hidden',
    marginTop: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
  },
  '& .MuiMenu-list': {
    padding: 0
  }
}))

// ** Styled MenuItem component
const MenuItem = styled(MuiMenuItem)(({ theme }) => ({
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(3),
  borderBottom: `1px solid ${theme.palette.divider}`
}))

const styles = {
  maxHeight: 349,
  '& .MuiMenuItem-root:last-of-type': {
    border: 0
  }
}

// ** Styled PerfectScrollbar component
const PerfectScrollbar = styled(PerfectScrollbarComponent)({
  ...styles
})

// ** Styled Avatar component
const Avatar = styled(MuiAvatar)({
  width: '2.375rem',
  height: '2.375rem',
  fontSize: '1.125rem'
})

// ** Styled component for the title in MenuItems
const MenuItemTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  flex: '1 1 100%',
  overflow: 'hidden',
  fontSize: '0.875rem',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  marginBottom: theme.spacing(0.75)
}))

// ** Styled component for the subtitle in MenuItems
const MenuItemSubtitle = styled(Typography)({
  flex: '1 1 100%',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis'
})

const NotificationDropdown = () => {
  //**  นำเข้าตัวsweetalert2
  const Swal = require('sweetalert2')

  // ** Router ของ Next.js
  const router = useRouter()

  // ** States
  const [anchorEl, setAnchorEl] = useState(null)

  // เก็บค่าข้อมูลตัวแปร
  const [notificationData, setNotificationData] = useState('')
  const [userid, setUserId] = useState('')

  // ** Hook
  const hidden = useMediaQuery(theme => theme.breakpoints.down('lg'))

  const handleDropdownOpen = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleDropdownClose = () => {
    setAnchorEl(null)
  }

  const ScrollWrapper = ({ children }) => {
    if (hidden) {
      return <Box sx={{ ...styles, overflowY: 'auto', overflowX: 'hidden' }}>{children}</Box>
    } else {
      return (
        <PerfectScrollbar options={{ wheelPropagation: false, suppressScrollX: true }}>{children}</PerfectScrollbar>
      )
    }
  }

  // เก็บค่าข้อมูลการแจ้งเตือน จาก Api
  useEffect(() => {
    const fetchData = async () => {
      const userIdFromLocalStorage = localStorage.getItem('Member_Id')
      if (userIdFromLocalStorage) {
        setUserId(userIdFromLocalStorage)
      }

      // ตรวจสอบว่า reqID มีค่าหรือไม่
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API}TCTM.notifications.all_notifications?member_id=${userid}`
        )
        setNotificationData(response.data.message)
      } catch (error) {
        console.error(error)
      }
    }

    if (anchorEl === null) {
      fetchData()
    }

    const intervalId = setInterval(() => {
      if (anchorEl === null) {
        fetchData()
      }
    }, 5000)

    return () => {
      clearInterval(intervalId)
    }
  }, [userid, anchorEl])

  // ฟังชันส่งข้อมูลเมื่อกด Notification
  const handleNotificationSubmit = async (e, noti_id, link_url) => {
    e.preventDefault()

    const data = {
      noti_id
    }

    // console.log('data', data)

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API}TCTM.notifications.read_noti`, data)
      router.push(`${link_url}`)
      handleDropdownClose()
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  // console.log('user id', userid)
  // console.log('NotificationData', notificationData.Data)

  return (
    <Fragment>
      {/* ปุ่มแสดงการแจ้งเตือน */}
      <IconButton color='inherit' aria-haspopup='true' onClick={handleDropdownOpen} aria-controls='customized-menu'>
        {notificationData.Alert ? (
          <div style={{ position: 'relative' }}>
            <BellOutline />
            {notificationData.Noread > 0 && (
              <div
                style={{
                  position: 'absolute',
                  bottom: '-5px',
                  right: '-5px',
                  backgroundColor: 'red',
                  color: 'white',
                  borderRadius: '50%',
                  width: '16px',
                  height: '16px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
                }}
              >
                {notificationData.Noread}
              </div>
            )}
          </div>
        ) : (
          <BellOutline />
        )}
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleDropdownClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem disableRipple>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <Typography sx={{ fontWeight: 600 }}>Notifications</Typography>
            <Chip
              size='small'
              label={`${notificationData.Noread || 0} New`}
              color='primary'
              sx={{ height: 20, fontSize: '0.75rem', fontWeight: 500, borderRadius: '10px' }}
            />
          </Box>
        </MenuItem>
        <ScrollWrapper>
          {notificationData.Data && notificationData.Data.length > 0 ? (
            notificationData.Data.map((item, index) => (
              <MenuItem
                key={item.noti_id}
                onClick={e => handleNotificationSubmit(e, item.noti_id, item.link_url)}
                sx={
                  item.read_status === 1
                    ? {
                        background: 'lightgrey',
                        position: 'relative'
                      }
                    : {}
                }
              >
                {item.read_status === 0 && (
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '-5px',
                      right: '0',
                      backgroundColor: 'red',
                      color: 'white',
                      borderRadius: '50%',
                      width: '10px',
                      height: '10px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      fontSize: '12px',
                      margin: '10px'
                    }}
                  ></div>
                )}

                <Box sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                  <Avatar alt='message' src='/images/avatars/5.png' />
                  <Box sx={{ mx: 4, flex: '1 1', display: 'flex', overflow: 'hidden', flexDirection: 'column' }}>
                    <MenuItemTitle>{item.title}</MenuItemTitle>
                    <MenuItemSubtitle variant='body2'>
                      {item.creation.split(' ')[1].split('.')[0]} date {item.creation.split(' ')[0]}
                    </MenuItemSubtitle>
                  </Box>
                </Box>
              </MenuItem>
            ))
          ) : (
            <Box sx={{ width: '100%', textAlign: 'center' }}>No Notification</Box>
          )}
        </ScrollWrapper>
        <MenuItem
          disableRipple
          sx={{ py: 3.5, borderBottom: 0, borderTop: theme => `1px solid ${theme.palette.divider}` }}
        >
          <Button fullWidth variant='contained' onClick={handleDropdownClose}>
            Read All Notifications
          </Button>
        </MenuItem>
      </Menu>
    </Fragment>
  )
}

export default NotificationDropdown
