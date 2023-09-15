// ** Material UI Imports
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  CardMedia,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  Hidden,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  OutlinedInput,
  Switch,
  TextField,
  Typography
} from '@mui/material'

// ** Material Icons Imports
import PaymentIcon from '@mui/icons-material/Payment'
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn'

// ** Material Design Icons Imports
import Truck from 'mdi-material-ui/Truck'
import ClockTimeFour from 'mdi-material-ui/ClockTimeFour'

const Billboard = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xl={8} lg={8} md={8} sm={12} xs={12}>
        <Box sx={{ width: '100%', height: { md: '350px' }, marginBottom: 4 }}>
          <CardMedia
            component='img'
            image='/imgBillboard/bill1.jpeg'
            alt='1'
            sx={{ maxWidth: '100%', height: '100%', borderRadius: '6px', boxShadow: 5 }}
          />
        </Box>
      </Grid>
      <Hidden mdDown>
        <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
          <Box sx={{ width: '100%', height: '170px', marginBottom: '10px' }}>
            <CardMedia
              component='img'
              image='/imgBillboard/B.png'
              alt='2'
              sx={{ maxWidth: '100%', height: '100%', borderRadius: '6px', boxShadow: 3 }}
            />
          </Box>
          <Box sx={{ width: '100%', height: '170px' }}>
            <CardMedia
              component='img'
              image='/imgBillboard/B.png'
              alt='2'
              sx={{ maxWidth: '100%', height: '100%', borderRadius: '6px', boxShadow: 3 }}
            />
          </Box>
        </Grid>
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
          <Box
            sx={{
              backgroundColor: '#fff',
              width: '100%',
              height: '100px',
              borderRadius: '6px',
              marginY: '30px',
              boxShadow: 5
            }}
          >
            <Grid container direction='row' justifyContent='space-around' alignItems='center' sx={{ height: '100%' }}>
              <Grid item>
                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                  <Truck sx={{ fontSize: '50px', color: '#000', marginRight: 3 }} />
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography variant='h6' sx={{ color: '#000' }}>
                      Fast Delivery
                    </Typography>
                    <Typography variant='body1' sx={{ color: '#606060' }}>
                      Start from $ 10
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Divider orientation='vertical' flexItem sx={{ border: 1 }} />
              <Grid item>
                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                  <MonetizationOnIcon sx={{ fontSize: '50px', color: '#000000', marginRight: 3 }} />
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography variant='h6' sx={{ color: '#000000' }}>
                      Money Guarantee
                    </Typography>
                    <Typography variant='body1' sx={{ color: '#606060' }}>
                      7 Days Back
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Divider orientation='vertical' flexItem sx={{ border: 1 }} />
              <Grid item>
                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                  <ClockTimeFour sx={{ fontSize: '50px', color: '#000000', marginRight: 3 }} />
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography variant='h6' sx={{ color: '#000000' }}>
                      365 Days
                    </Typography>
                    <Typography variant='body1' sx={{ color: '#606060' }}>
                      For free return
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Divider orientation='vertical' flexItem sx={{ border: 1 }} />
              <Grid item>
                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                  <PaymentIcon sx={{ fontSize: '50px', color: '#000000', marginRight: 3 }} />
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography variant='h6' sx={{ color: '#000000' }}>
                      Payment
                    </Typography>
                    <Typography variant='body1' sx={{ color: '#606060' }}>
                      Secure system
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Hidden>
    </Grid>
  )
}

export default Billboard
