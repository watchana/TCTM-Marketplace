// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Hidden from '@mui/material/Hidden'
import Avatar from '@mui/material/Avatar'
import CardMedia from '@mui/material/CardMedia'
import TextField from '@mui/material/TextField'
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

  return (
    <Grid container direction='row' justifyContent='space-between' alignItems='flex-start'>
      <Grid item>
        <Box display='flex' direction='row'>
          <Link href='/' passHref>
            <img src='/images/cards/TCTM_Group_3 (1).png' alt='logo' width='52px' />
          </Link>
          <Hidden smDown>
            <Box sx={{ marginLeft: 3 }}>
              <Typography variant='h5' sx={{ fontWeight: 'bold', marginBottom: '-10px' }}>
                TCTM
              </Typography>
              <Typography variant='body1'>Marketplace</Typography>
            </Box>
          </Hidden>
        </Box>
      </Grid>
      <Hidden mdDown>
        <Grid item xs={6}>
          <Box sx={{ width: '100%', padding: 1 }}>
            <TextField
              size='small'
              placeholder='Search Product…'
              sx={{ width: '100%', '& .MuiOutlinedInput-root': { borderRadius: 4 } }}
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
          <Button variant='outlined' startIcon={<HelpBox />}>
            +Add Post
          </Button>
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
//     <Typography variant='h5'>{themeConfig.templateName}</Typography>
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
