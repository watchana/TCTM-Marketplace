// ** Material UI Imports
import { Box, Grid, IconButton } from '@mui/material'
import { styled } from '@mui/material/styles'

// ** Material-UI Icons Imports
import FacebookIcon from '@mui/icons-material/Facebook'
import TwitterIcon from '@mui/icons-material/Twitter'
import InstagramIcon from '@mui/icons-material/Instagram'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import GitHubIcon from '@mui/icons-material/GitHub'

// ** Material Design Icons Imports
import GooglePlus from 'mdi-material-ui/GooglePlus'

// ** Styles Imports
const IconButtonWrapper = styled(IconButton)(({ theme }) => ({
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.primary.main,
    borderRadius: 4,
    transition: 'all .2s ease'
  }
}))

const FooterContent = () => {
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}>
      <Box sx={{ width: '100%' }}>
        <Grid container spacing={3} justifyContent='center' alignItems='center'>
          <Grid item>
            <IconButtonWrapper href='/'>
              <FacebookIcon sx={{ color: '#FFF' }} />
            </IconButtonWrapper>
          </Grid>
          <Grid item>
            <IconButtonWrapper href='/'>
              <TwitterIcon sx={{ color: '#FFF' }} />
            </IconButtonWrapper>
          </Grid>
          <Grid item>
            <IconButtonWrapper href='/'>
              <InstagramIcon sx={{ color: '#FFF' }} />
            </IconButtonWrapper>
          </Grid>
          <Grid item>
            <IconButtonWrapper href='/'>
              <GooglePlus sx={{ color: '#FFF' }} />
            </IconButtonWrapper>
          </Grid>
          <Grid item>
            <IconButtonWrapper href='/'>
              <LinkedInIcon sx={{ color: '#FFF' }} />
            </IconButtonWrapper>
          </Grid>
          <Grid item>
            <IconButtonWrapper href='/'>
              <GitHubIcon sx={{ color: '#FFF' }} />
            </IconButtonWrapper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

export default FooterContent
