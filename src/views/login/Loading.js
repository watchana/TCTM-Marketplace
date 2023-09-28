// ** Material UI Imports
import { Box, Skeleton } from '@mui/material'
import { styled } from '@mui/system'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Styled Components
const Background = styled(Box)(() => ({
  width: '100%',
  height: '100%',
  background: '#212121'
}))

const Moon = styled(Box)(() => ({
  margin: 'auto',
  position: 'absolute',
  top: '0',
  bottom: '0',
  left: '0',
  right: '0',
  background: '#D8D8D8',
  borderRadius: '50%',
  width: '10rem',
  height: '10rem'
}))

const Shadow = styled(Box)(() => ({
  width: '10rem',
  height: '10rem',
  position: 'relative',
  background: '#212121',
  borderRadius: '50%',
  transition: 'all 0.3s ease',
  animation: 'move_4123 1.2s infinite alternate ease-in-out',
  transform: 'translate3d(8px, -8px, 0)',
  top: '0',
  bottom: '0',
  left: '0',
  right: '0',
  margin: 'auto',
  '@keyframes move_4123': {
    '0%': {
      transform: 'translate3d(8px, -8px, 0)'
    },
    '100%': {
      transform: 'translate3d(36px, -36px, 0)'
    }
  }
}))

const LoadingLogin = () => {
  return (
    <Background className='content-center'>
      <Moon>
        <Shadow />
      </Moon>
    </Background>
  )
}
LoadingLogin.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default LoadingLogin
