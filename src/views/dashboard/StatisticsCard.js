// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
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

// const salesData = [
//   {
//     stats: 'Product',
//     title: 'Name Market',
//     color: 'primary',
//     icon: '1'
//   },
//   {
//     stats: 'Product',
//     title: 'Name Market',
//     color: 'success',
//     icon: '2'
//   },
//   {
//     stats: 'Product',
//     color: 'warning',
//     title: 'Name Market',
//     icon: '3'
//   },
//   {
//     stats: 'Product',
//     color: 'info',
//     title: 'Name Market',
//     icon: '4'
//   }
// ]

const StatisticsCard = ({ data }) => {
  // Define an array of colors
  const colors = ['primary.main', 'secondary.main', 'error.main', 'info.main', 'success.main']

  // set render State
  const renderMarketStats = () => {
    if (data.top_product_selling && data.top_product_selling.length > 0) {
      return data.top_product_selling.map((market, index) => (
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
              <Typography variant='caption'>Market sale : {market.sub_name}</Typography>
              <Typography variant='caption'>Count for sale : {market.product_count}</Typography>
              <Typography variant='h6'>{market.product_name}</Typography>
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
    </Card>
  )
}

export default StatisticsCard
