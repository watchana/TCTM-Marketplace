import { Box, Card, Container, CardMedia, Grid, Hidden, Typography } from '@mui/material'

// ** Next Import
import Link from 'next/link'

// ** Styles Components
const DividerBox1 = styled(Box)(({ theme }) => ({
  width: '16px',
  height: '120px',
  marginRight: '20px',
  marginTop: '-24px',
  backgroundColor: '#F7F7F7',
  transform: 'rotate(40deg)',
  zIndex: '1'
}))

const DividerBox2 = styled(Box)(({ theme }) => ({
  width: '16px',
  height: '120px',
  marginRight: '30px',
  marginTop: '-24px',
  backgroundColor: '#F7F7F7',
  transform: 'rotate(40deg)',
  zIndex: '1'
}))

import { styled } from '@mui/material/styles'

const ShowInformation = () => {
  return (
    <Container maxWidth='xl'>
      <Box sx={{ width: '100%', marginTop: '30px', boxShadow: 3 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            height: '70px',
            borderRadius: '6px',
            backgroundColor: '#3A46A7'
          }}
        >
          <DividerBox1 />
          <DividerBox2 />
          <Link href='/category' passHref>
            <Typography
              variant='h5'
              fontSize='32px'
              sx={{
                color: '#FFFFFF',
                fontWeight: 'bold',
                textAlign: 'center',
                padding: '12px',
                cursor: 'pointer',
                '&:hover': {
                  transform: 'scale(1.1)',
                  transition: 'all 0.3s ease'
                }
              }}
            >
              Information
            </Typography>
          </Link>
        </Box>
      </Box>
    </Container>
  )
}

export default ShowInformation
