// ** MUI Imports
import { Box, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'

// ** Footer Content Component
import FooterContent from './FooterContent'

const Footer = props => {
  // ** Props
  const { settings, footerContent: userFooterContent } = props

  // ** Hook
  const theme = useTheme()

  // ** Vars
  const { contentWidth } = settings

  return (
    <Box
      component='footer'
      className='layout-footer'
      sx={{
        zIndex: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        backgroundColor: '#3A46A7'
      }}
    >
      <Box
        className='footer-content-container'
        sx={{
          width: '100%',
          borderTopLeftRadius: 2,
          borderTopRightRadius: 2,
          padding: theme.spacing(4, 6),
          ...(contentWidth === 'boxed' && { '@media (min-width:1440px)': { maxWidth: 1440 } })
        }}
      >
        {userFooterContent ? userFooterContent(props) : <FooterContent />}
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          backgroundColor: theme.palette.primary.main
        }}
      >
        <Typography variant='body2' color='#FFF' sx={{ marginY: 1 }}>
          © 2023 TCTM. All rights reserved.
        </Typography>
      </Box>
    </Box>
  )
}

export default Footer
