// ** React Imports
import { useState } from 'react'

// ** Next Import
import Link from 'next/link'
import { useRouter } from 'next/router'

// ** Material UI Imports
import { Box, FormControl, Grid, Hidden, IconButton, InputAdornment, OutlinedInput } from '@mui/material'

// ** Material Design Icons Imports
import Send from 'mdi-material-ui/Send'
import Magnify from 'mdi-material-ui/Magnify'
import CartOutline from 'mdi-material-ui/CartOutline'

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
      <Grid container direction='row' justifyContent='space-between' alignItems='center' sx={{ height: '100%' }}>
        <Grid item xl={2} xs={2}>
          <Box sx={{ width: '100%' }}>
            <Link href='/' passHref>
              <img src='images/cards/tctm-logo.png' alt='logo' width='42px' height='42px' />
            </Link>
          </Box>
        </Grid>
        <Grid item xl={10} xs={10}>
          <Box sx={{ width: '100%' }}>
            <Grid container direction='row' justifyContent='flex-end' alignItems='center' spacing={2}>
              <Grid item>
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  <Hidden smDown>
                    <FormControl
                      fullWidth
                      variant='outlined'
                      sx={{ borderRadius: '12px', height: '40px', maxWidth: '250px', minWidth: '50px' }}
                    >
                      <OutlinedInput
                        size='small'
                        placeholder='Search Products...'
                        onChange={e => handleSearch(e.target.value)}
                        onKeyPress={e => {
                          if (e.key === 'Enter') {
                            handleSearchSubmit()
                          }
                        }}
                        startAdornment={
                          <InputAdornment position='start'>
                            <IconButton onClick={handleSearchSubmit}>
                              <Magnify />
                            </IconButton>
                          </InputAdornment>
                        }
                        sx={{ borderRadius: '12px' }}
                      />
                    </FormControl>
                  </Hidden>
                  <IconButton href='/member/ports/'>
                    <Send sx={{ color: 'text.primary' }} />
                  </IconButton>
                  <IconButton>
                    <CartOutline sx={{ color: 'text.primary' }} />
                  </IconButton>
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
