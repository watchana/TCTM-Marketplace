// ** React Imports
import React, { useEffect, useState, useRef } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import ButtonBase from '@mui/material/ButtonBase'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Breadcrumbs from '@mui/material/Breadcrumbs'

// ** Icons MUI Imports
import DeleteIcon from '@mui/icons-material/Delete'

// ** Icons MDI Imports
import ChevronRight from 'mdi-material-ui/ChevronRight'

// ** Imports components 📨
import DialogComments from './components/dialogComments'

const RequirementsDetail = () => {
  const [openDialogComments, setOpenDialogComments] = useState(false)

  return (
    <Container maxWidth='xl'>
      <Box>
        {/* แทบไปหน้าต่างๆ */}
        <Box sx={{ width: '100%', marginBottom: '29px' }}>
          <Breadcrumbs separator={<ChevronRight />} aria-label='breadcrumb'>
            <Link underline='hover' color='inherit' href='/'>
              Home
            </Link>
            <Link underline='hover' color='inherit' href='/designs/requirementsDetail/'>
              My Requirement Detail
            </Link>
          </Breadcrumbs>
        </Box>

        {/* ชื่อหน้า */}
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <Typography variant='h4' fontSize={36}>
            My Requirement Detail
          </Typography>
        </Box>

        <Box sx={{ width: '100%', height: '100%' }}>
          <Box sx={{ width: '100%', height: '100%' }}>
            <CardContent sx={{ paddingX: 6 }}>
              {/* ของคน Post */}
              <Card sx={{ width: '100%', height: '100%', bgcolor: '#fff', borderRadius: '10px' }}>
                <CardContent>
                  <Box sx={{ width: '100%' }}>
                    <Typography variant='h4' fontSize={36}>
                      Title
                    </Typography>
                  </Box>
                  <Box sx={{ width: '100%', height: '100%', marginTop: 2 }}>
                    <Typography variant='body2'>
                      Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all
                      continents except Antarctica Lizards are a widespread group of squamate reptiles, with over 6,000
                      species, ranging across all continents except Antarctica Lizards are a widespread group of
                      squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica
                      Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all
                      continents except Antarctica
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      width: '100%',
                      marginTop: 6,
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                      <Avatar
                        alt='John Doe'
                        sx={{ width: 40, height: 40, marginRight: 4 }}
                        src='/images/avatars/1.png'
                      />
                      <Typography variant='h6' fontSize='bold'>
                        John Doe
                      </Typography>
                    </Box>
                    {/* Desired Price */}
                    <Box>
                      <Typography variant='h5' fontSize='bold'>
                        $ 10,000
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>

              <Divider>
                <Typography variant='h6' fontSize='bold'>
                  Comments
                </Typography>
              </Divider>

              {/* ของคน Comment */}

              <Card sx={{ width: '100%', height: '100%', bgcolor: '#fff', borderRadius: '10px', marginBottom: 6 }}>
                <CardContent>
                  <Box sx={{ width: '100%', height: '100%', marginTop: 2 }}>
                    <Typography variant='body2'>
                      Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all
                      continents except Antarctica Lizards are a widespread group of squamate reptiles, with over 6,000
                      species, ranging across all continents except Antarctica Lizards are a widespread group of
                      squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica
                      Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all
                      continents except Antarctica
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      width: '100%',
                      marginTop: 6,
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                      <Avatar
                        alt='John Doe'
                        sx={{ width: 40, height: 40, marginRight: 4 }}
                        src='/images/avatars/1.png'
                      />
                      <Typography variant='h6' fontSize='bold'>
                        Delete
                      </Typography>
                    </Box>
                    {/* Desired Price */}
                    <Box>
                      <Typography variant='h5' fontSize='bold'>
                        $ 90,000
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>

              {/* ปุ่ม Comments */}
              <Box sx={{ width: '100%', marginTop: 6 }}>
                <Button
                  fullWidth
                  variant='outlined'
                  color='primary'
                  sx={{ marginRight: 4, bgcolor: '#fff' }}
                  onClick={() => setOpenDialogComments(true)}
                >
                  Comments
                </Button>
              </Box>
            </CardContent>
          </Box>
        </Box>
      </Box>
      {/* 📨📨 Props 📨📨 */}
      <DialogComments open={openDialogComments} handleClose={() => setOpenDialogComments(false)} />
      {/* 📨📨 Props 📨📨 */}
    </Container>
  )
}

export default RequirementsDetail
