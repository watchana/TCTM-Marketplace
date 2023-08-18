// ** MUI Imports
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import { styled, useTheme } from '@mui/material/styles'
import MuiAppBar from '@mui/material/AppBar'
import MuiToolbar from '@mui/material/Toolbar'

import Apple from 'mdi-material-ui/Apple'

const AppBar = styled(MuiAppBar)(({ theme }) => ({
  transition: 'none',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(0, 6),
  backgroundColor: 'transparent',
  color: theme.palette.text.primary,
  minHeight: theme.mixins.toolbar.minHeight,
  [theme.breakpoints.down('sm')]: {
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4)
  }
}))

const Toolbar = styled(MuiToolbar)(({ theme }) => ({
  width: '100%',
  borderBottomLeftRadius: 10,
  borderBottomRightRadius: 10,
  padding: `${theme.spacing(0)} !important`,
  minHeight: `${theme.mixins.toolbar.minHeight}px !important`,
  transition:
    'padding .25s ease-in-out, box-shadow .25s ease-in-out, backdrop-filter .25s ease-in-out, background-color .25s ease-in-out'
}))

const LayoutAppBar = props => {
  // ** Props
  const { settings, verticalAppBarContent: userVerticalAppBarContent } = props

  // ** Hooks
  const theme = useTheme()

  // ** Vars
  const { contentWidth } = settings

  return (
    <AppBar elevation={1} color='default' className='layout-navbar' position='static'>
      <Toolbar
        className='navbar-content-container'
        sx={{
          ...(contentWidth === 'boxed' && {
            '@media (min-width:1440px)': { maxWidth: `calc(1440px - ${theme.spacing(6)} * 2)` }
          })
        }}
      >
        {(userVerticalAppBarContent && userVerticalAppBarContent(props)) || null}
      </Toolbar>
      {/* <Grid container spacing={2} display='flex' justifyContent='center' sx={{ marginBottom: 3, overflowX: 'hidden' }}>
        <Grid item>
          <Button variant='outlined' size='small' endIcon={<Apple />}>
            Product 1
          </Button>
        </Grid>
        <Grid item>
          <Button variant='outlined' size='small' endIcon={<Apple />}>
            Product 2
          </Button>
        </Grid>
        <Grid item>
          <Button variant='outlined' size='small' endIcon={<Apple />}>
            Product 3
          </Button>
        </Grid>
        <Grid item>
          <Button variant='outlined' size='small' endIcon={<Apple />}>
            Product 4
          </Button>
        </Grid>
        <Grid item>
          <Button variant='outlined' size='small' endIcon={<Apple />}>
            Product 5
          </Button>
        </Grid>
        <Grid item>
          <Button variant='outlined' size='small' endIcon={<Apple />}>
            Product 6
          </Button>
        </Grid>
        <Grid item>
          <Button variant='outlined' size='small' endIcon={<Apple />}>
            Product 7
          </Button>
        </Grid>
        <Grid item>
          <Button variant='outlined' size='small' endIcon={<Apple />}>
            Product 8
          </Button>
        </Grid>
      </Grid> */}
    </AppBar>
  )
}

export default LayoutAppBar
