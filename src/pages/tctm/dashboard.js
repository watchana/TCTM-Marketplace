// ** React Imports
import { useState, useEffect } from 'react'

// ** Next Imports
import Link from 'next/link'
import { useRouter } from 'next/router'

// ** Material UI Imports
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  FormControl,
  Grid,
  Hidden,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography
} from '@mui/material'
import { styled } from '@mui/system'

// ** Material UI Icons Imports
import PersonIcon from '@mui/icons-material/Person'
import StorefrontIcon from '@mui/icons-material/Storefront'
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard'

// ** Material Design Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'
import Poll from 'mdi-material-ui/Poll'
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'
import HelpCircleOutline from 'mdi-material-ui/HelpCircleOutline'
import BriefcaseVariantOutline from 'mdi-material-ui/BriefcaseVariantOutline'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Axios Import
import axios from 'axios'

// ** Custom Components Imports
import CardStatisticsVerticalComponent from 'src/@core/components/card-statistics/card-stats-vertical'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// ** Demo Components Imports
import Table from 'src/views/dashboard/Table'
import Trophy from 'src/views/dashboard/Trophy'
import TotalEarning from 'src/views/dashboard/TotalEarning'
import StatisticsCard from 'src/views/dashboard/StatisticsCard'
import WeeklyOverview from 'src/views/dashboard/WeeklyOverview'
import DepositWithdraw from 'src/views/dashboard/DepositWithdraw'
import SalesByCountries from 'src/views/dashboard/SalesByCountries'
import StatisticsCardMarket from 'src/views/dashboard/StatisticsCardMarket'

const DashboardTCTM = () => {
  // Set data
  const [data, setData] = useState('')

  // Api Call Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API}TCTM.dashboard.get_data_in_dashboard`)

        setData(response.data.message)
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [])

  return (
    <Container maxWidth='xl'>
      <Box>
        <Box sx={{ width: '100%' }}>
          <Card
            sx={{
              height: '100px',
              marginBottom: '30px',
              padding: '15px 25px 20px',
              backgroundColor: '#2d2e81',
              border: '1px solid #primary.main'
            }}
          >
            <Grid container alignItems='center'>
              <Grid item xs={12} sm={8} md={8}>
                <Typography variant='h4' fontSize='21px bold' color='#fff'>
                  Dashboard
                </Typography>
                <Typography color='#fff' variant='h6' fontSize='14px'>
                  eCommerce
                </Typography>
              </Grid>
              <Hidden smDown>
                <Grid item sm={4} md={4} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <SpaceDashboardIcon sx={{ fontSize: 72, color: '#fff' }} />
                </Grid>
              </Hidden>
            </Grid>
          </Card>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={4}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={12}>
                <Trophy data={data} />
              </Grid>
              <Grid item xs={12} sm={6} md={12}>
                <WeeklyOverview data={data} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={12} lg={5}>
            <StatisticsCard data={data} />
          </Grid>
          <Grid item xs={12} md={12} lg={3}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={12}>
                <SalesByCountries Data={data} />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <CardStatisticsVerticalComponent
                  stats={(data.all_product_active_in_system || 0).toString()}
                  icon={<Poll />}
                  color='success'
                  title='Total Product'
                  subtitle='all time'
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <CardStatisticsVerticalComponent
                  stats={(
                    (data.all_selling_in_system && data.all_selling_in_system[0]?.count_invoices) ||
                    0
                  ).toString()}
                  title='All for sale'
                  color='success'
                  subtitle='Total price'
                  icon={<CurrencyUsd />}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <CardStatisticsVerticalComponent
                  stats={(data?.all_member_in_system?.length || 0).toString()}
                  color='warning'
                  subtitle='all members'
                  title='Total Member'
                  icon={<PersonIcon />}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <CardStatisticsVerticalComponent
                  stats={(data?.all_market_in_system?.[0]?.market_count || 0).toString()}
                  color='warning'
                  subtitle='all market'
                  title='Total Market'
                  icon={<StorefrontIcon />}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}

export default DashboardTCTM
