// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Hidden from '@mui/material/Hidden'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'

// ** Icons Imports
import Menu from 'mdi-material-ui/Menu'
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

  return (
    <Grid container>
      <Hidden mdDown>
        <Grid item md={1} lg={1} xl={1} display='grid' justifyContent='flex-end'>
          <Box sx={{ width: '100%' }}>
            <IconButton color='inherit' onClick={toggleNavVisibility} sx={{ ml: -2.75 }}>
              <Menu />
            </IconButton>
          </Box>
        </Grid>
      </Hidden>
      <Grid item xs={6} sm={3} md={2} lg={2} xl={2}>
        <Box sx={{ width: '100%', paddingTop: '5px' }}>
          <Typography variant='h5'>{themeConfig.templateName}</Typography>
        </Box>
      </Grid>
      <Hidden smDown>
        <Grid item sm={6} md={6} lg={6} xl={6}>
          <Box sx={{ width: '100%' }}>
            <TextField
              size='small'
              sx={{ width: '80%', '& .MuiOutlinedInput-root': { borderRadius: 4 } }}
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
      <Grid item xs={6} sm={3} md={3} lg={2} xl={2} display='grid' justifyContent='flex-end'>
        <Box className='actions-right' sx={{ width: '100%' }}>
          <ModeToggler settings={settings} saveSettings={saveSettings} />
          <NotificationDropdown />
          <IconButton>
            {/* ต้องสร้าง components ใน src/@core/layouts/components/shared-components/ สำหรับปุ่ม ตะกร้า  */}
            <CartOutline />
          </IconButton>
          <UserDropdown />
        </Box>
      </Grid>
    </Grid>
  )
}

export default AppBarContent
