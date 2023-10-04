// ** React Imports
import { useState } from 'react'

// ** Next Import
import Link from 'next/link'
import { useRouter } from 'next/router'

// ** Material UI Imports
import { Box, CardMedia, FormControl, Grid, IconButton, InputAdornment, OutlinedInput } from '@mui/material'

// ** Material-UI Icons Imports
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag'
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer'

// ** Material Design Icons Imports
import Magnify from 'mdi-material-ui/Magnify'

// ** Layouts Imports
import UserDropdown from 'src/@core/layouts/components/shared-components/UserDropdown'
import NotificationDropdown from 'src/@core/layouts/components/shared-components/NotificationDropdown'

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

  return (
    <Box sx={{ width: '100%', height: '90px' }}>
      <Grid container justifyContent='space-between' alignItems='center' sx={{ height: '100%' }}>
        <Grid item xl={2} xs={2}>
          <Box sx={{ width: '210px', marginLeft: 2 }}>
            <Link href='/' passHref>
              <CardMedia
                component='img'
                image='https://media.discordapp.net/attachments/1143783715877703833/1158967489900851200/cropped-LOGO-TCTM-1.png?ex=651e2c16&is=651cda96&hm=9f5f51b5926258a32e2a6029a918b169cec1003e70f7c6ec5cbf549749b623c8&=&width=1440&height=306'
                alt='logo'
                sx={{
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'scale(1.1)',
                    transition: 'all 0.3s ease'
                  }
                }}
              />
            </Link>
          </Box>
        </Grid>
        <Grid item xl={10} xs={10}>
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
                  <FormControl
                    fullWidth
                    variant='outlined'
                    sx={{
                      height: '40px',
                      maxWidth: '250px',
                      minWidth: '50px',
                      borderRadius: '12px',
                      border: '1.5px solid lightgray',
                      outline: 'none',
                      transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)',
                      boxShadow: '0 0 0 0 rgba(0,0,0,0)',
                      '&:hover': {
                        boxShadow: '0 0 0 0 rgba(0,0,0,0)',
                        border: '1.5px solid lightgray'
                      },
                      '&:active': {
                        transform: 'scale(0.98)'
                      },
                      '&:focus': {
                        boxShadow: '0 0 0 0 rgba(0,0,0,0)',
                        border: '1.5px solid lightgray'
                      }
                    }}
                  >
                    <OutlinedInput
                      size='small'
                      placeholder='Search Products...'
                      onChange={e => handleSearch(e.target.value)}
                      onKeyPress={e => {
                        if (e.key === 'Enter') handleSearchSubmit()
                      }}
                      startAdornment={
                        <InputAdornment position='start'>
                          <IconButton onClick={handleSearchSubmit} sx={{ marginLeft: { xs: -3 } }}>
                            <Magnify sx={{ color: 'text.primary' }} />
                          </IconButton>
                        </InputAdornment>
                      }
                      sx={{ borderRadius: '12px' }}
                    />
                  </FormControl>
                  <Link href='/member/ports/' passHref>
                    <IconButton>
                      <QuestionAnswerIcon sx={{ color: 'text.primary' }} />
                    </IconButton>
                  </Link>
                  <Link href='/member/order/myoder/' passHref>
                    <IconButton>
                      <ShoppingBagIcon sx={{ color: 'text.primary' }} />
                    </IconButton>
                  </Link>
                  <NotificationDropdown />
                  <UserDropdown />
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
