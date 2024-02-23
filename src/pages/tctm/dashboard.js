// ** React Imports
import { useState, useEffect } from 'react'

// Responsive image
import { useMediaQuery } from '@mui/material'

// ** Material UI Imports
import { Box, Card, Container, Grid, Hidden, Typography } from '@mui/material'

// ** Material UI Icons Imports
import PersonIcon from '@mui/icons-material/Person'
import StorefrontIcon from '@mui/icons-material/Storefront'
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard'

// ** Material Design Icons Imports

import Poll from 'mdi-material-ui/Poll'
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'

// ** Axios Import
import axios from 'axios'

// ** Custom Components Imports
import CardStatisticsVerticalComponent from 'src/@core/components/card-statistics/card-stats-vertical'

// ** Demo Components Imports

import Trophy from 'src/views/dashboard/Trophy'

import StatisticsCard from 'src/views/dashboard/StatisticsCard'
import WeeklyOverview from 'src/views/dashboard/WeeklyOverview'

import SalesByCountries from 'src/views/dashboard/SalesByCountries'

// SEO
import MySeo from '../seo'
import { SeoDashboardpage } from 'src/seo/homepage'
import typography from 'src/@core/components/typography'

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

  const isSmallScreen = useMediaQuery('(max-width: 600px)') // ปรับขนาดตามขอบเขตของหน้าจอที่คุณต้องการ

  return (
    <Container maxWidth='xl'>
      <MySeo
        title={`Dashboard`}
        description={SeoDashboardpage.description}
        keywords={SeoDashboardpage.keywords}
        content={SeoDashboardpage.content}
      />
      <Box>
        <Box sx={{ width: '100%' }}>
          <Card
            sx={{
              height: isSmallScreen ? '70px' : '90px',
              marginBottom: '30px',
              padding: '15px 25px 20px',
              backgroundColor: '#2d2e81',
              border: '1px solid #primary.main'
            }}
          >
            <Grid container alignItems='center'>
              <Grid item xs={12} sm={8} md={8}>
                <Typography sx={typography.h1.title} color='#fff'>
                  Dashboard
                </Typography>
                <Typography sx={typography.subtitle1.title} color='#fff'>
                  eCommerce
                </Typography>
              </Grid>
              <Hidden smDown>
                <Grid item sm={4} md={4} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <SpaceDashboardIcon sx={{ fontSize: 50, color: '#fff' }} />
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
