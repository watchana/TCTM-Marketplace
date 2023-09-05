// ** Next Import
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/router'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Hidden from '@mui/material/Hidden'
import TextField from '@mui/material/TextField'
import CardMedia from '@mui/material/CardMedia'
import ButtonBase from '@mui/material/ButtonBase'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'

// ** Icons Imports
import Menu from 'mdi-material-ui/Menu'
import Send from 'mdi-material-ui/Send'
import HelpBox from 'mdi-material-ui/HelpBox'
import Magnify from 'mdi-material-ui/Magnify'
import CartOutline from 'mdi-material-ui/CartOutline'

// ** Theme Config Import
import themeConfig from 'src/configs/themeConfig'

// ** Components
import ModeToggler from 'src/@core/layouts/components/shared-components/ModeToggler'
import UserDropdown from 'src/@core/layouts/components/shared-components/UserDropdown'
import NotificationDropdown from 'src/@core/layouts/components/shared-components/NotificationDropdown'

const AppBarContent = props => {
  // ** Props
  const { settings, saveSettings, toggleNavVisibility } = props

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
    <Grid container direction='row' justifyContent='space-between' alignItems='center'>
      <Grid item xl={3} lg={3} md={4} sm={6} xs={6}>
        <Box sx={{ width: '150px', height: '70px' }}>
          <Link href='/' passHref>
            <CardMedia sx={{ height: '70px' }} image='/images/cards/LOGO_TCTM_3.png' />
          </Link>
        </Box>
      </Grid>

      <Hidden mdDown>
        <Grid item xl={6} lg={6} md={4}>
          <Box sx={{ width: '100%', padding: 1 }}>
            <TextField
              size='small'
              placeholder='Search Product…'
              value={searchValue}
              onChange={e => handleSearch(e.target.value)}
              onKeyPress={e => {
                if (e.key === 'Enter') {
                  handleSearchSubmit()
                }
              }}
              sx={{ width: '100%', '& .MuiOutlinedInput-root': { borderRadius: '18px' } }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <Magnify fontSize='small' />
                  </InputAdornment>
                )
              }}
            />
          </Box>
        </Grid>
      </Hidden>

      <Grid item xl={3} lg={3} md={4} sm={6} xs={6}>
        <Grid
          container
          spacing={'15px'}
          direction='row'
          justifyContent='flex-end'
          alignItems='center'
          sx={{ width: '100%', height: '70px' }}
        >
          <Hidden mdDown>
            <Grid item>
              <Button variant='outlined' color='secondary' endIcon={<Send />} href='#' style={{ borderRadius: '4px' }}>
                POST
              </Button>
            </Grid>
          </Hidden>
          <Grid item>
            <IconButton>
              {/* ต้องสร้าง components ใน src/@core/layouts/components/shared-components/ สำหรับปุ่ม ตะกร้า  */}
              <CartOutline />
            </IconButton>
          </Grid>
          <Grid item>
            <NotificationDropdown />
          </Grid>
          <Grid item>
            <UserDropdown />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default AppBarContent

{
  /* <Grid container direction='row' justifyContent='space-between' alignItems='flex-start'>
      <Grid item display='grid' justifyContent='flex-start'>
        <Box display='flex' direction='row'>
          <Tooltip title='Main Menu' placement='bottom'>
            <ButtonBase sx={{ width: '100%', height: '100%' }}>
              <Link href='/' passHref>
                <img src='/images/cards/TCTM_Group_3 (1).png' alt='logo' width='52px' />
              </Link>
              <Hidden smDown>
                <Box sx={{ marginLeft: 3 }}>
                  <Link href='/' passHref>
                    <Typography ml={-8.1} variant='h5' sx={{ fontWeight: 'bold', marginBottom: '-10px' }}>
                      TCTM
                    </Typography>
                  </Link>
                  <Link href='/' passHref>
                    <Typography variant='body1'>Marketplace</Typography>
                  </Link>
                </Box>
              </Hidden>
            </ButtonBase>
          </Tooltip>
        </Box>
      </Grid>
      <Hidden mdDown>
        <Grid item md={4} lg={6}>
          <Box sx={{ width: '100%', padding: 1 }}>
            <TextField
              size='small'
              placeholder='Search Product…'
              value={searchValue}
              onChange={e => handleSearch(e.target.value)}
              onKeyPress={e => {
                if (e.key === 'Enter') {
                  handleSearchSubmit()
                }
              }}
              sx={{ width: '100%', '& .MuiOutlinedInput-root': { borderRadius: '18px' } }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <Magnify fontSize='small' />
                  </InputAdornment>
                )
              }}
            />
          </Box>
        </Grid>
      </Hidden>
      <Grid item>
        <Box className='actions-right' sx={{ width: '100%', height: '100%', padding: 1 }}>
          <Hidden smDown>
            <Button variant='outlined' startIcon={<HelpBox />} style={{ borderRadius: '10px' }}>
              +Add Post
            </Button>
          </Hidden>
          <ModeToggler settings={settings} saveSettings={saveSettings} />
          <IconButton>
            {/* ต้องสร้าง components ใน src/@core/layouts/components/shared-components/ สำหรับปุ่ม ตะกร้า  */
}
{
  /* <CartOutline />
      </IconButton>
      <NotificationDropdown />
      <UserDropdown />
    </Box>
  </Grid>
</Grid> */
}
