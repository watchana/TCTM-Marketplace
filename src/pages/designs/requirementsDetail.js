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
import { DataGrid } from '@mui/x-data-grid'

import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

// ** Icons MUI Imports
import DeleteIcon from '@mui/icons-material/Delete'

// ** Icons MDI Imports
import ChevronRight from 'mdi-material-ui/ChevronRight'

// ** Imports components 📨
import DialogComments from './components/dialogComments'

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein }
}

const RequirementsDetail = () => {
  const [openDialogComments, setOpenDialogComments] = useState(false)

  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9)
  ]

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
              <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%', height: '100%' }}>
                <Card sx={{ width: '50%', height: '100%', bgcolor: '#fff', borderRadius: '10px', marginRight: 4 }}>
                  <CardContent>
                    <Box sx={{ width: '100%' }}>
                      <Typography variant='h4' fontSize={36}>
                        Title
                      </Typography>
                    </Box>
                    <Box sx={{ width: '100%', height: '100%', marginTop: 2 }}>
                      <Typography variant='body2'>
                        Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all
                        continents except Antarctica Lizards are a widespread group of squamate reptiles, with over
                        6,000 species, ranging across all continents except Antarctica Lizards are a widespread group of
                        squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica
                        Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all
                        continents except Antarctica
                      </Typography>
                    </Box>
                    <Grid
                      container
                      spacing={2}
                      justifyContent='space-between'
                      alignItems='center'
                      sx={{
                        width: '100%',
                        marginTop: 6
                      }}
                    >
                      <Grid item sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <Avatar
                          alt='John Doe'
                          sx={{ width: 40, height: 40, marginRight: 4 }}
                          src='/images/avatars/1.png'
                        />
                        <Typography variant='h6' fontSize='bold'>
                          John Doe
                        </Typography>
                      </Grid>
                      {/* Desired Price */}
                      <Grid>
                        <Typography variant='h5' fontSize='bold'>
                          $ 10,000
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>

                <Card sx={{ width: '50%', height: '100%', bgcolor: '#fff', borderRadius: '10px' }}>
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 1000 }} size='small' aria-label='a dense table'>
                      <TableHead>
                        <TableRow>
                          <TableCell>Dessert (100g serving)</TableCell>
                          <TableCell align='right'>Calories</TableCell>
                          <TableCell align='right'>Fat&nbsp;(g)</TableCell>
                          <TableCell align='right'>Carbs&nbsp;(g)</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rows.map(row => (
                          <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell component='th' scope='row'>
                              {row.name}
                            </TableCell>
                            <TableCell align='right'>
                              <Button variant='outlined'>{row.calories}</Button>
                              <Button variant='outlined'>{row.calories}</Button>
                              <Button variant='outlined'>{row.calories}</Button>
                            </TableCell>

                            <TableCell align='right'>{row.fat}</TableCell>
                            <TableCell align='right'>{row.carbs}</TableCell>
                            <TableCell align='right'>{row.protein}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Card>
              </Box>

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
                  <Grid
                    container
                    spacing={2}
                    justifyContent='space-between'
                    alignItems='center'
                    sx={{
                      width: '100%',
                      marginTop: 6
                    }}
                  >
                    <Grid item sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                      <Avatar
                        alt='John Doe'
                        sx={{ width: 40, height: 40, marginRight: 4 }}
                        src='/images/avatars/1.png'
                      />
                      <Typography variant='h6' fontSize='bold'>
                        Delete
                      </Typography>
                    </Grid>
                    {/* Desired Price */}
                    <Grid item>
                      {/* เมื่อกดปุ่มนี้จะถามว่า ยืนยันที่จะซื้อใช่ไหม แล้วก็ไปหน้า Payment */}
                      <Button variant='outlined' sx={{ bgcolor: '#fff' }}>
                        <Typography variant='h5' fontSize='bold' color='primary'>
                          $ 90,000
                        </Typography>
                      </Button>
                    </Grid>
                  </Grid>
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
