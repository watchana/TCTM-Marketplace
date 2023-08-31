// ** Next Import
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/router'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Hidden from '@mui/material/Hidden'
import Tooltip from '@mui/material/Tooltip'
import TextField from '@mui/material/TextField'
import ButtonBase from '@mui/material/ButtonBase'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'

// ** Icons Imports
import Menu from 'mdi-material-ui/Menu'
import Magnify from 'mdi-material-ui/Magnify'
import CartOutline from 'mdi-material-ui/CartOutline'
import HelpBox from 'mdi-material-ui/HelpBox'

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
      router.replace(`/pages/category?keyword=${encodeURIComponent(searchValue)}`)
    }
  }

  return (
    <Grid container direction='row' justifyContent='space-between' alignItems='flex-start'>
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
            {/* ต้องสร้าง components ใน src/@core/layouts/components/shared-components/ สำหรับปุ่ม ตะกร้า  */}
            <CartOutline />
          </IconButton>
          <NotificationDropdown />
          <UserDropdown />
        </Box>
      </Grid>
    </Grid>
  )
}

export default AppBarContent

// {/* <Grid container>
// <Hidden mdDown>
//   <Grid item md={1} lg={1} xl={1} display='grid' justifyContent='flex-end'>
//     <Box sx={{ width: '100%' }}>
//       <IconButton color='inherit' onClick={toggleNavVisibility} sx={{ ml: -2.75 }}>
//         <Menu />
//       </IconButton>
//     </Box>
//   </Grid>
// </Hidden>
// <Grid item xs={4} sm={3} md={2} lg={2} xl={2}>
//   <Box sx={{ width: '100%', paddingTop: '5px' }}>
//  <Typography variant='h5'>{themeConfig.templateName}</Typography>
//   </Box>
// </Grid>
// <Hidden smDown>
//   <Grid item sm={5} md={6} lg={6} xl={6}>
//     <Box sx={{ width: '100%' }}>
//       <TextField
//         size='small'
//         placeholder='Search Product…'
//         sx={{ width: '80%', '& .MuiOutlinedInput-root': { borderRadius: 4 } }}
//         InputProps={{
//           startAdornment: (
//             <InputAdornment position='start'>
//               <Magnify fontSize='small' />
//             </InputAdornment>
//           )
//         }}
//       />
//     </Box>
//   </Grid>
// </Hidden>
// <Grid item xs={8} sm={4} md={3} lg={2} xl={2} display='grid' justifyContent='flex-end'>
//   <Box className='actions-right' sx={{ width: '100%' }}>
//     <ModeToggler settings={settings} saveSettings={saveSettings} />
//     <NotificationDropdown />
//     <IconButton>
//       {/* ต้องสร้าง components ใน src/@core/layouts/components/shared-components/ สำหรับปุ่ม ตะกร้า  */}
//       <CartOutline />
//     </IconButton>
//     <UserDropdown />
//   </Box>
// </Grid>
// </Grid> */}
