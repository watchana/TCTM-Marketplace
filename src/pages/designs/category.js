// ** React Imports
import { useState, useEffect, useRef } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Link from '@mui/material/Link'
import Button from '@mui/material/Button'

import Container from '@mui/material/Container'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { CardActionArea } from '@mui/material'

// ** MDI Icon Imports
import ArrowLeftThin from 'mdi-material-ui/ArrowLeftThin'

const Category = () => {
  return (
    <>
      <Container maxWidth='xl'>
        <Box>
          <Link href='/' passHref color='inherit'>
            <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row' }}>
              <ArrowLeftThin />
              <Typography variant='body2' sx={{ fontWeight: 600, marginTop: '1px' }}>
                All Product
              </Typography>
            </Box>
          </Link>

          {/* >>>>> Category Name <<<<< */}
          <Box sx={{ width: '100%', marginY: 4 }}>
            <Typography
              variant='h4'
              sx={{
                fontWeight: 600,
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis'
              }}
            >
              Category Name
            </Typography>
          </Box>

          {/* >>>>> Filters <<<<< */}
          <Box sx={{ marginBottom: 6 }}>
            <Grid container spacing={2}>
              <Grid item>
                <Button variant='contained' sx={{ width: '120px', height: '40px' }}>
                  Filter 1
                </Button>
              </Grid>
              <Grid item>
                <Button variant='contained' sx={{ width: '120px', height: '40px' }}>
                  Filter 2
                </Button>
              </Grid>
              <Grid item>
                <Button variant='contained' sx={{ width: '120px', height: '40px' }}>
                  Filter 3
                </Button>
              </Grid>
            </Grid>
          </Box>

          {/* >>>>> list Products <<<<< */}
          <Box sx={{ width: '100%' }}>
            <Grid container spacing={10}>
              {/* ======================================= map ========================================= */}
              <Grid item>
                <Card sx={{ width: '190px', height: '280px', bgcolor: '#fff', borderRadius: '10px' }}>
                  <CardActionArea>
                    <Box sx={{ width: '100%', height: '70%', padding: '10px 7px 3px' }}>
                      {/* ใส่รูป */}
                      <CardMedia
                        component='img'
                        height='200px'
                        image='https://www.freecodecamp.org/news/content/images/size/w2000/2021/08/imgTag.png'
                        sx={{ borderRadius: '10px' }}
                      />
                    </Box>
                    <Box sx={{ width: '100%', height: '30%', paddingLeft: 2.5, paddingTop: 2 }}>
                      <Box>
                        <Typography
                          variant='h6'
                          sx={{ fontWeight: 600, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}
                        >
                          Product Name
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant='body1' sx={{ fontWeight: 600 }}>
                          $ 100
                        </Typography>
                      </Box>
                    </Box>
                  </CardActionArea>
                </Card>
              </Grid>
              {/* ======================================= ลบได้ ========================================= */}
              <Grid item>
                <Card sx={{ width: '190px', height: '280px', bgcolor: '#fff', borderRadius: '10px' }}>
                  <CardActionArea>
                    <Box sx={{ width: '100%', height: '70%', padding: '10px 7px 3px' }}>
                      {/* ใส่รูป */}
                      <CardMedia
                        component='img'
                        height='200px'
                        image='https://www.freecodecamp.org/news/content/images/size/w2000/2021/08/imgTag.png'
                        sx={{ borderRadius: '10px' }}
                      />
                    </Box>
                    <Box sx={{ width: '100%', height: '30%', paddingLeft: 2.5, paddingTop: 2 }}>
                      <Box>
                        <Typography
                          variant='h6'
                          sx={{ fontWeight: 600, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}
                        >
                          Product Name
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant='body1' sx={{ fontWeight: 600 }}>
                          $ 100
                        </Typography>
                      </Box>
                    </Box>
                  </CardActionArea>
                </Card>
              </Grid>{' '}
              <Grid item>
                <Card sx={{ width: '190px', height: '280px', bgcolor: '#fff', borderRadius: '10px' }}>
                  <CardActionArea>
                    <Box sx={{ width: '100%', height: '70%', padding: '10px 7px 3px' }}>
                      {/* ใส่รูป */}
                      <CardMedia
                        component='img'
                        height='200px'
                        image='https://www.freecodecamp.org/news/content/images/size/w2000/2021/08/imgTag.png'
                        sx={{ borderRadius: '10px' }}
                      />
                    </Box>
                    <Box sx={{ width: '100%', height: '30%', paddingLeft: 2.5, paddingTop: 2 }}>
                      <Box>
                        <Typography
                          variant='h6'
                          sx={{ fontWeight: 600, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}
                        >
                          Product Name
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant='body1' sx={{ fontWeight: 600 }}>
                          $ 100
                        </Typography>
                      </Box>
                    </Box>
                  </CardActionArea>
                </Card>
              </Grid>{' '}
              <Grid item>
                <Card sx={{ width: '190px', height: '280px', bgcolor: '#fff', borderRadius: '10px' }}>
                  <CardActionArea>
                    <Box sx={{ width: '100%', height: '70%', padding: '10px 7px 3px' }}>
                      {/* ใส่รูป */}
                      <CardMedia
                        component='img'
                        height='200px'
                        image='https://www.freecodecamp.org/news/content/images/size/w2000/2021/08/imgTag.png'
                        sx={{ borderRadius: '10px' }}
                      />
                    </Box>
                    <Box sx={{ width: '100%', height: '30%', paddingLeft: 2.5, paddingTop: 2 }}>
                      <Box>
                        <Typography
                          variant='h6'
                          sx={{ fontWeight: 600, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}
                        >
                          Product Name
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant='body1' sx={{ fontWeight: 600 }}>
                          $ 100
                        </Typography>
                      </Box>
                    </Box>
                  </CardActionArea>
                </Card>
              </Grid>{' '}
              <Grid item>
                <Card sx={{ width: '190px', height: '280px', bgcolor: '#fff', borderRadius: '10px' }}>
                  <CardActionArea>
                    <Box sx={{ width: '100%', height: '70%', padding: '10px 7px 3px' }}>
                      {/* ใส่รูป */}
                      <CardMedia
                        component='img'
                        height='200px'
                        image='https://www.freecodecamp.org/news/content/images/size/w2000/2021/08/imgTag.png'
                        sx={{ borderRadius: '10px' }}
                      />
                    </Box>
                    <Box sx={{ width: '100%', height: '30%', paddingLeft: 2.5, paddingTop: 2 }}>
                      <Box>
                        <Typography
                          variant='h6'
                          sx={{ fontWeight: 600, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}
                        >
                          Product Name
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant='body1' sx={{ fontWeight: 600 }}>
                          $ 100
                        </Typography>
                      </Box>
                    </Box>
                  </CardActionArea>
                </Card>
              </Grid>{' '}
              <Grid item>
                <Card sx={{ width: '190px', height: '280px', bgcolor: '#fff', borderRadius: '10px' }}>
                  <CardActionArea>
                    <Box sx={{ width: '100%', height: '70%', padding: '10px 7px 3px' }}>
                      {/* ใส่รูป */}
                      <CardMedia
                        component='img'
                        height='200px'
                        image='https://www.freecodecamp.org/news/content/images/size/w2000/2021/08/imgTag.png'
                        sx={{ borderRadius: '10px' }}
                      />
                    </Box>
                    <Box sx={{ width: '100%', height: '30%', paddingLeft: 2.5, paddingTop: 2 }}>
                      <Box>
                        <Typography
                          variant='h6'
                          sx={{ fontWeight: 600, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}
                        >
                          Product Name
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant='body1' sx={{ fontWeight: 600 }}>
                          $ 100
                        </Typography>
                      </Box>
                    </Box>
                  </CardActionArea>
                </Card>
              </Grid>{' '}
              <Grid item>
                <Card sx={{ width: '190px', height: '280px', bgcolor: '#fff', borderRadius: '10px' }}>
                  <CardActionArea>
                    <Box sx={{ width: '100%', height: '70%', padding: '10px 7px 3px' }}>
                      {/* ใส่รูป */}
                      <CardMedia
                        component='img'
                        height='200px'
                        image='https://www.freecodecamp.org/news/content/images/size/w2000/2021/08/imgTag.png'
                        sx={{ borderRadius: '10px' }}
                      />
                    </Box>
                    <Box sx={{ width: '100%', height: '30%', paddingLeft: 2.5, paddingTop: 2 }}>
                      <Box>
                        <Typography
                          variant='h6'
                          sx={{ fontWeight: 600, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}
                        >
                          Product Name
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant='body1' sx={{ fontWeight: 600 }}>
                          $ 100
                        </Typography>
                      </Box>
                    </Box>
                  </CardActionArea>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  )
}

export default Category
