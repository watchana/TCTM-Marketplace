// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Hidden from '@mui/material/Hidden'
import CardMedia from '@mui/material/CardMedia'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

// ** Icons Imports
import Send from 'mdi-material-ui/Send'
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

  return (
    <Grid container direction='column'>
      <Grid container direction='row' justifyContent='space-between' alignItems='flex-start'>
        <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
          <Box sx={{ width: '150px', height: '70px' }}>
            <CardMedia sx={{ height: '70px' }} image='/images/cards/LOGO_TCTM_3.png' />
          </Box>
        </Grid>
        <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
          <Grid
            container
            spacing={'15px'}
            direction='row'
            justifyContent='flex-end'
            alignItems='center'
            sx={{ width: '100%', height: '70px' }}
          >
            <Hidden mdDown>
              <Grid>
                <Button variant='outlined' color='secondary' endIcon={<Send />} style={{ borderRadius: '4px' }}>
                  POST
                </Button>
              </Grid>
            </Hidden>
            <Grid>
              <IconButton>
                {/* ต้องสร้าง components ใน src/@core/layouts/components/shared-components/ สำหรับปุ่ม ตะกร้า  */}
                <CartOutline />
              </IconButton>
            </Grid>
            <Grid>
              <NotificationDropdown />
            </Grid>
            <Grid>
              <UserDropdown />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Hidden smDown>
        <Box sx={{ width: '100%', height: '35px', marginTop: '10px' }}>
          <Grid container direction='row' justifyContent='space-between' alignItems='flex-end'>
            {/* ด้านซ้าย */}

            <Grid item>
              <Grid container direction='row' spacing={5}>
                <Grid item>
                  <Link href='#' passHref>
                    <Typography variant='body1' color='textPrimary' fontWeight='bold'>
                      Products
                    </Typography>
                  </Link>
                </Grid>
                <Grid item>
                  <Link href='#' passHref>
                    <Typography variant='body1' color='textPrimary' fontWeight='bold'>
                      Brands
                    </Typography>
                  </Link>
                </Grid>
                <Grid item>
                  <Link href='#' passHref>
                    <Typography variant='body1' color='textPrimary' fontWeight='bold'>
                      Promotion
                    </Typography>
                  </Link>
                </Grid>
                <Grid item>
                  <Link href='#' passHref>
                    <Typography variant='body1' color='textPrimary' fontWeight='bold'>
                      Technical
                    </Typography>
                  </Link>
                </Grid>
              </Grid>
            </Grid>

            {/* ด้านซ้าย */}
            <Hidden mdDown>
              <Grid item>
                <Grid container direction='row' spacing={5}>
                  <Grid item>
                    <Link href='#' passHref>
                      <Typography variant='body1' color='textPrimary' fontWeight='bold'>
                        Shipping
                      </Typography>
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href='#' passHref>
                      <Typography variant='body1' color='textPrimary' fontWeight='bold'>
                        Returns & Warranty
                      </Typography>
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href='#' passHref>
                      <Typography variant='body1' color='textPrimary' fontWeight='bold'>
                        Contact
                      </Typography>
                    </Link>
                  </Grid>
                </Grid>
              </Grid>
            </Hidden>
          </Grid>
        </Box>
      </Hidden>
    </Grid>
  )
}

export default AppBarContent

// <Grid container direction='row' justifyContent='space-between' alignItems='flex-start'>
//   <Grid item display='grid' justifyContent='flex-start'>
//     <Box display='flex' direction='row'>
//       <Tooltip title='Main Menu' placement='bottom'>
//         <ButtonBase sx={{ width: '100%', height: '100%' }}>
//           <Link href='/' passHref>
//             <img src='/images/cards/TCTM_Group_3 (1).png' alt='logo' width='52px' />
//           </Link>
//           <Hidden smDown>
//             <Box sx={{ marginLeft: 3 }}>
//               <Link href='/' passHref>
//                 <Typography ml={-8.1} variant='h5' sx={{ fontWeight: 'bold', marginBottom: '-10px' }}>
//                   TCTM
//                 </Typography>
//               </Link>
//               <Link href='/' passHref>
//                 <Typography variant='body1'>Marketplace</Typography>
//               </Link>
//             </Box>
//           </Hidden>
//         </ButtonBase>
//       </Tooltip>
//     </Box>
//   </Grid>
//   <Hidden mdDown>
//     <Grid item md={4} lg={6}>
//       <Box sx={{ width: '100%', padding: 1 }}>
//         <TextField
//           size='small'
//           placeholder='Search Product…'
//           sx={{ width: '100%', '& .MuiOutlinedInput-root': { borderRadius: '18px' } }}
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position='start'>
//                 <Magnify fontSize='small' />
//               </InputAdornment>
//             )
//           }}
//         />
//       </Box>
//     </Grid>
//   </Hidden>
//   <Grid item>
//     <Box className='actions-right' sx={{ width: '100%', height: '100%', padding: 1 }}>
//       <Hidden smDown>
//         <Button variant='outlined' startIcon={<HelpBox />} style={{ borderRadius: '10px' }}>
//           +Add Post
//         </Button>
//       </Hidden>
//       <ModeToggler settings={settings} saveSettings={saveSettings} />
//       <IconButton>
//         {/* ต้องสร้าง components ใน src/@core/layouts/components/shared-components/ สำหรับปุ่ม ตะกร้า  */}
//         <CartOutline />
//       </IconButton>
//       <NotificationDropdown />
//       <UserDropdown />
//     </Box>
//   </Grid>
// </Grid>
