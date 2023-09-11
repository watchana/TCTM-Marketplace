// ** React Imports
import React, { useEffect, useState, useCallback } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Avatar from '@mui/material/Avatar'
import Hidden from '@mui/material/Hidden'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Container from '@mui/material/Container'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Breadcrumbs from '@mui/material/Breadcrumbs'

// ** MUI X Imports
import { DataGrid } from '@mui/x-data-grid'

// ** Material-UI Icons Imports
import DeleteIcon from '@mui/icons-material/Delete'
import MailOutlineIcon from '@mui/icons-material/MailOutline'

// ** MDI Icon Imports
import CircleSmall from 'mdi-material-ui/CircleSmall'

const columns = [
  { field: 'id', headerName: 'ID', minWidth: 100 },
  { field: 'markerName', headerName: 'Name Marker', minWidth: 160 },
  { field: 'product', headerName: 'Product Name', minWidth: 200 },
  { field: 'status', headerName: 'Status', minWidth: 100 },
  {
    field: 'download',
    headerName: 'Download',
    minWidth: 120,
    renderCell: rowCell => (
      <Button variant='outlined' color='primary'>
        Download
      </Button>
    )
  },
  {
    field: 'action',
    headerName: 'Action',
    minWidth: 400,
    renderCell: rowCell => (
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button variant='contained' sx={{ marginRight: 2 }}>
          interested
        </Button>
        <Button variant='contained' color='error'>
          Not interested
        </Button>
      </Box>
    )
  }
]

const rows = [
  { id: 1, markerName: 'Marker 1', product: 'Product 1', status: 'Active' },
  { id: 2, markerName: 'Marker 2', product: 'Product 2', status: 'Active' },
  { id: 3, markerName: 'Marker 3', product: 'Product 3', status: 'Active' }
]

const PosrtDetail = () => {
  return (
    <Container maxWidth='xl'>
      <Box>
        {/* แทบไปหน้าต่างๆ */}
        <Box sx={{ width: '100%' }}>
          <Card
            sx={{
              width: '100%',
              height: '100px',
              mb: '20px',
              p: '20px 25px 20px',
              bgcolor: '#FDEDE8',
              border: '1px solid #FDEDE8'
            }}
          >
            <Grid container alignItems='center'>
              <Grid item xs={12} sm={8} md={8}>
                <Typography variant='h4' fontSize='1.3rem bold' color='#FA896B'>
                  Blog Member Detail
                </Typography>
                <Breadcrumbs separator={<CircleSmall />} aria-label='breadcrumb'>
                  <Link underline='none' color='inherit' href='/'>
                    <Typography variant='body2'>Home</Typography>
                  </Link>
                  <Link underline='none' color='inherit' href='/member/ports/'>
                    <Typography variant='body2'>Posts</Typography>
                  </Link>
                  <Link underline='none' color='inherit'>
                    <Typography variant='body2'>Blog post</Typography>
                  </Link>
                </Breadcrumbs>
              </Grid>
              <Hidden smDown>
                <Grid item sm={4} md={4} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <MailOutlineIcon sx={{ fontSize: 52, color: '#FA896B' }} />
                </Grid>
              </Hidden>
            </Grid>
          </Card>
        </Box>
        {/* เนื้อหา */}
        <Box sx={{ width: '100%' }}>
          <Card sx={{ width: '100%', height: '100%', mb: '20px', border: '1px solid #FDEDE8' }}>
            <Box sx={{ width: '100%', padding: '20px' }}>
              <Box
                sx={{
                  width: '100%',
                  marginBottom: 4,
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center'
                }}
              >
                <Avatar alt='John Doe' sx={{ width: 40, height: 40, marginRight: 4 }} src='/images/avatars/1.png' />
                {/* ชื่อคน post */}
                <Typography variant='body1' fontSize='1.2rem bold' textAlign='center' color='#222'>
                  Name member
                </Typography>
              </Box>
              {/* หัวข้อ */}
              <Typography variant='h4' fontSize='2.2rem bold' color='#222'>
                Title
              </Typography>
            </Box>
            <Divider />
            <Box sx={{ width: '100%', padding: '10px 20px 20px' }}>
              <Box sx={{ width: '100%' }}>
                <Typography variant='h5' fontSize='1.8rem bold' color='#222' sx={{ marginBottom: 2 }}>
                  Detail
                </Typography>
              </Box>
              {/* เนื้อหาคน post */}
              <Typography variant='body2' fontSize='1rem' color='#222'>
                But you cannot figure out what it is or what it can do. MTA web directory is the simplest way in which
                one can bid on a link, or a few links if they wish to do so. The link directory on MTA displays all of
                the links it currently has, and does so in alphabetical order, which makes it much easier for someone to
                find what they are looking for if it is something specific and they do not want to go through all the
                other sites and links as well. It allows you to start your bid at the bottom and slowly work your way to
                the top of the list.
              </Typography>
              <Divider />
            </Box>
            <Box sx={{ width: '100%', padding: '0px 20px 20px' }}>
              <Typography variant='h5' fontSize='1.8rem bold' color='#222' sx={{ marginBottom: 2 }}>
                Offer
              </Typography>
              {/* ตาราง */}
              <Box sx={{ width: '100%', height: '300px' }}>
                <DataGrid rows={rows} columns={columns} pageSize={5} rowsPerPageOptions={[5, 10, 20]} />
              </Box>
            </Box>
          </Card>
        </Box>

        {/* แสดงความคิดเห็น */}
        <Box sx={{ width: '100%' }}>
          <Card sx={{ width: '100%', height: '100%', mb: '20px', border: '1px solid #FDEDE8' }}>
            <Box sx={{ width: '100%', padding: '20px' }}>
              <Typography variant='h6' fontSize='2.2rem bold' color='#222' sx={{ marginBottom: 2 }}>
                Post Comments
              </Typography>
              <TextField fullWidth multiline rows={4} sx={{ marginBottom: 4 }}></TextField>
              <Button variant='contained'>Post Comment</Button>
            </Box>
            <Box sx={{ width: '100%', padding: '20px' }}>
              <Typography variant='h6' fontSize='2.2rem bold' color='#222' sx={{ marginBottom: 2 }}>
                Comments
              </Typography>
              {/* comments ต่างๆ */}
              <Card sx={{ width: '100%', height: '100%', mb: '20px', bgcolor: '#FDEDE8', border: '3px solid #FDEDE8' }}>
                <Box sx={{ width: '100%', padding: '20px' }}>
                  <Box
                    sx={{
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignContent: 'center'
                    }}
                  >
                    <Typography variant='h6' fontSize='2.2rem bold' color='#222'>
                      Name Marker
                    </Typography>
                    <IconButton>
                      <DeleteIcon sx={{ fontSize: 28, color: 'text.primary' }} />
                    </IconButton>
                  </Box>
                </Box>
                <Box sx={{ width: '100%', padding: '0px 20px 20px' }}>
                  <Typography variant='body2' fontSize='1rem' color='#222'>
                    But you cannot figure out what it is or what it can do. MTA web directory is the simplest way in
                    which one can bid on a link, or a few links if they wish to do so. The link directory on MTA
                    displays all of the links it currently has, and does so in alphabetical order, which makes it much
                    easier for someone to find what they are looking for if it is something specific and they do not
                    want to go through all the other sites and links as well. It allows you to start your bid at the
                    bottom and slowly work your way to the top of the list.
                  </Typography>
                </Box>
              </Card>
            </Box>
          </Card>
        </Box>
      </Box>
    </Container>
  )
}

export default PosrtDetail
