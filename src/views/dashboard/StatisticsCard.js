// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Icons Imports
import TrendingUp from 'mdi-material-ui/TrendingUp'
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'
import DotsVertical from 'mdi-material-ui/DotsVertical'
import CellphoneLink from 'mdi-material-ui/CellphoneLink'
import AccountOutline from 'mdi-material-ui/AccountOutline'

const StatisticsCard = ({ data }) => {
  // Define an array of colors
  const colors = ['primary.main', 'secondary.main', 'error.main', 'info.main', 'success.main']

  // set render State
  const renderProductStats = () => {
    if (data.top_product_selling && data.top_product_selling.length > 0) {
      return data.top_product_selling.map((market, index) => (
        <Grid key={index} item xs={12}>
          <Box sx={{ display: 'flex', alignItems: 'center', ...(index !== data.length - 1 ? { mb: 8.5 } : {}) }}>
            <Avatar
              variant='rounded'
              sx={{
                mr: 3,
                width: 44,
                height: 44,
                color: 'common.white',
                backgroundColor: colors[index % colors.length]
              }}
            >
              {index + 1}
            </Avatar>
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <Box sx={{ marginRight: 2, display: 'flex', flexDirection: 'column' }}>
                <Typography variant='body2' sx={{ mb: 0.5, fontWeight: 600, color: 'text.primary' }}>
                  {market.sub_name}
                </Typography>
                <Typography variant='caption'>{market.product_name}</Typography>
              </Box>

              <Box sx={{ minWidth: 85, display: 'flex', flexDirection: 'column' }}>
                <Typography variant='body2' sx={{ mb: 2, fontWeight: 600, color: 'text.primary' }}>
                  {market.product_count}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
      ))
    }
  }

  const renderMarketStats = () => {
    if (data.best_market_selling && data.best_market_selling.length > 0) {
      return data.best_market_selling.map((market, index) => (
        <Grid item xs={12} sm={6} key={index}>
          <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar
              variant='rounded'
              sx={{
                mr: 3,
                width: 44,
                height: 44,
                boxShadow: 3,
                color: 'common.white',
                backgroundColor: colors[index % colors.length]
              }}
            >
              {index + 1}
            </Avatar>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography variant='caption'>Count for sale : {market.invoice_count}</Typography>
              <Typography variant='h6'>{market.sub_name}</Typography>
            </Box>
          </Box>
        </Grid>
      ))
    }
  }

  return (
    <Card variant='outlined' sx={{ position: 'relative', boxShadow: 3 }}>
      <CardHeader
        title='Best selling Products'
        subheader={
          <Typography variant='body2'>
            <Box component='span' sx={{ fontWeight: 600, color: 'text.primary' }}>
              Best seller of the month
            </Box>{' '}
            😎
          </Typography>
        }
        action={
          <IconButton size='small' aria-label='settings' className='card-more-options' sx={{ color: 'text.secondary' }}>
            <DotsVertical />
          </IconButton>
        }
        titleTypographyProps={{
          sx: {
            mb: 1,
            lineHeight: '2rem !important',
            letterSpacing: '0.15px !important'
          }
        }}
      />
      <CardContent sx={{ pt: theme => `${theme.spacing(3)} !important` }}>
        <Grid container spacing={[5, 0]}>
          {renderProductStats()}
          <Divider
            sx={{
              width: '100%',
              margin: '0 0 10px 0'
            }}
          />
          <Grid item xs={12}>
            <CardHeader
              title='Best selling Market'
              subheader={
                <Typography variant='body2'>
                  <Box component='span' sx={{ fontWeight: 600, color: 'text.primary' }}>
                    Best Market seller of the month
                  </Box>{' '}
                  😎
                </Typography>
              }
              titleTypographyProps={{
                sx: {
                  mb: 2.5,
                  lineHeight: '2rem !important',
                  letterSpacing: '0.15px !important'
                }
              }}
            />
            <CardContent sx={{ pt: theme => `${theme.spacing(3)} !important` }}>
              <Grid container spacing={[5, 0]}>
                {renderMarketStats()}
              </Grid>
            </CardContent>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default StatisticsCard
