import { useEffect, useState } from 'react'
import {
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardMedia,
  Container,
  FormControl,
  Grid,
  Hidden,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  Tab,
  Link,
  IconButton,
  Divider
} from '@mui/material'

import InfoIcon from '@mui/icons-material/Info'
import ChevronRight from 'mdi-material-ui/ChevronRight'
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight'
import { useRouter } from 'next/router'
import axios from 'axios'
import { useMediaQuery } from '@mui/material'
import MySeo from 'src/pages/seo'
import { Seoinformationpage } from 'src/seo/homepage'
import typography from 'src/@core/components/typography'
import { useTheme } from '@material-ui/core/styles'

const InformationDetails = () => {
  const [informationdata, setInformationData] = useState([]) // ตัวแปรเก็บข้อมูลแนะนำ

  const [informationimg, setInformationImg] = useState([]) // ตัวแปรเก็บข้อมูลรูปภาพ
  const FirstImage = informationimg && informationimg[0] ? informationimg[0].image_file_infname : null // ตัวแปรเก็บข้อมูลรูปภาพตัวอย่าง

  const theme = useTheme()

  const router = useRouter() // เรียกใช้งาน Router
  const { post_id } = router.query
  const postId = post_id

  useEffect(() => {
    const fetchData = async () => {
      if (!postId) {
        // console.error('postId is undefined or null')

        return
      }

      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API}TCTM.infromation.getallinfV2`, {
          params: {
            post_id: postId
          }
        })
        if (!response.data.message.Data) {
          setInformationImg(0)
          setEndImage(0)
        } else {
          setInformationImg(response.data.message.Data)
          setInformationData(response.data.message.Data[0])
        }
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [postId])

  // Slide Controls Variable
  const [stateImages, setStateImages] = useState(0) // Images
  const [firstImage, setFirstImage] = useState(0) // FirstImage
  const [endImage, setEndImage] = useState(informationimg.length) // EndImage
  const MaxLengthImages = informationimg.length // MaxLengthImages
  const [presentState, setPresentState] = useState(0) // presentState

  // Button Slide Left
  const leftSlide = () => {
    if (firstImage !== 0) {
      let newFirstImage = firstImage - 1
      let newEndImage = endImage - 1
      setFirstImage(newFirstImage)
      setEndImage(newEndImage)
    }
  }

  // Button Slide Right
  const rightSlide = () => {
    if (endImage !== MaxLengthImages) {
      let newFirstImage = firstImage + 1
      let newEndImage = endImage + 1
      setFirstImage(newFirstImage)
      setEndImage(newEndImage)
    }
  }

  const indexCount = (index, firstImage) => {
    const total = index + firstImage
    setStateImages(index)
    setPresentState(total)
  }

  const slideLeftImage = () => {
    if (stateImages !== 0) {
      setStateImages(stateImages - 1)
      let newFirstImage = firstImage - 1
      let newEndImage = endImage - 1
      if (newEndImage < MaxLengthImages) {
        setFirstImage(newFirstImage)
        setEndImage(newEndImage)
      }
    } else {
      setStateImages(MaxLengthImages - 1)
      setFirstImage(MaxLengthImages - 4)
      setEndImage(MaxLengthImages)
    }
  }

  const slideRightImage = () => {
    if (stateImages !== MaxLengthImages - 1) {
      setStateImages(stateImages + 1)
      let newFirstImage = firstImage + 1
      let newEndImage = endImage + 1
      if (newEndImage <= MaxLengthImages) {
        setFirstImage(newFirstImage)
        setEndImage(newEndImage)
      }
    } else {
      setStateImages(0)
      setFirstImage(0)
      setEndImage(4)
    }
  }

  // ตั้งค่าจำนวนรูปที่แสดง
  useEffect(() => {
    if (MaxLengthImages > 4) {
      setEndImage(4)
    } else {
      setEndImage(MaxLengthImages)
    }
  }, [MaxLengthImages])

  const isSmallScreen = useMediaQuery('(max-width: 600px)') // ปรับขนาดตามขอบเขตของหน้าจอที่คุณต้องการ

  const host = process.env.NEXT_PUBLIC_VERCEL_URL || process.env.NEXT_PUBLIC_HOST || 'localhost:3000' // replace with your default value
  const currentPath = router.pathname
  const parameters = router.query

  return (
    <Box>
      <Box>
        <Container maxWidth='xl'>
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
                      Information
                    </Typography>
                    <Breadcrumbs separator={<ChevronRight />} aria-label='breadcrumb' color='#fff'>
                      <Link href='/'>
                        <Typography sx={typography.subtitle1.title} color='#fff'>
                          Home
                        </Typography>
                      </Link>
                      <Typography sx={typography.subtitle1.title} color='#fff'>
                        Information
                      </Typography>
                    </Breadcrumbs>
                  </Grid>
                  <Hidden smDown>
                    <Grid item sm={4} md={4} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <InfoIcon sx={{ fontSize: 50, color: '#fff' }} />
                    </Grid>
                  </Hidden>
                </Grid>
              </Card>
            </Box>
          </Box>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: { sm: '300px', md: '550px' },
                  marginBottom: '10px'
                }}
              >
                <Hidden smUp>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      width: '5%',
                      height: '100%',
                      backgroundColor: '#ddd',
                      borderRadius: '10px'
                    }}
                  >
                    <IconButton onClick={slideLeftImage} sx={{ color: '#000' }}>
                      <KeyboardArrowLeft />
                    </IconButton>
                  </Box>
                </Hidden>
                <CardMedia
                  component='img'
                  image={
                    informationimg[stateImages]?.image_file_infname
                      ? `/imageInfor/${informationimg[presentState].image_file_infname}`
                      : ''
                  }
                  alt={informationdata.post_name}
                  height='100%'
                  sx={{ width: '90%', objectFit: 'contain' }}
                  title={informationdata.post_name}
                />
                <MySeo
                  title={informationdata.post_name}
                  description={Seoinformationpage.description}
                  keywords={Seoinformationpage.keywords}
                  ogimg={
                    informationimg[stateImages]?.image_file_infname
                      ? `/imageInfor/${informationimg[presentState].image_file_infname}`
                      : ''
                  }
                  url={`http://${host}${currentPath}/${
                    Object.keys(parameters).length > 0 ? '?' : ''
                  }${new URLSearchParams(parameters)}`}
                />
                <Hidden smUp>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      width: '5%',
                      height: '100%',
                      backgroundColor: '#ddd',
                      borderRadius: '10px'
                    }}
                  >
                    <IconButton onClick={slideRightImage} sx={{ color: '#000' }}>
                      <KeyboardArrowRight />
                    </IconButton>
                  </Box>
                </Hidden>
              </Box>
              {/* --------------- รูปย่อย --------------- */}
              <Hidden smDown>
                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
                  <IconButton onClick={leftSlide} sx={{ backgroundColor: '#ddd' }}>
                    <KeyboardArrowLeft
                      sx={{
                        color: '#000',
                        '&:hover': {
                          opacity: [0.9, 0.8, 0.7],
                          transition: 'opacity 0.3s ease-in-out',
                          transform: 'scale(1.1)',
                          transition: 'transform 0.3s ease-in-out'
                        }
                      }}
                    />
                  </IconButton>

                  {/*----------------------- EZ ------------------------------------------ */}
                  {informationimg && informationimg.length > 0 ? (
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100% ',
                        height: '100px',
                        objectFit: 'cover',
                        cursor: 'pointer'
                      }}
                    >
                      {informationimg.slice(firstImage, endImage).map((image, index) => (
                        <Box
                          key={index}
                          sx={{
                            display: 'flex',
                            alignContent: 'center',
                            width: '100px',
                            height: '100px',
                            objectFit: 'cover',
                            scrollSnapType: 'x mandatory',
                            border: '1px solid #aaa',
                            borderRadius: '10px',
                            marginLeft: '15px'
                          }}
                        >
                          <CardMedia
                            component='img'
                            src={`/imageInfor/${image.image_file_infname}`}
                            alt={`Image ${index + 1}`}
                            onClick={() => indexCount(index, firstImage)}
                            sx={{
                              width: '100px',
                              display: 'inline-block',
                              cursor: 'pointer',
                              '&:hover': {
                                opacity: [0.9, 0.8, 0.7],
                                transition: 'opacity 0.3s ease-in-out',
                                transform: 'scale(1.1)',
                                transition: 'transform 0.3s ease-in-out'
                              }
                            }}
                          />
                        </Box>
                      ))}
                    </Box>
                  ) : (
                    <Typography variant='h6' sx={{ color: '#999', fontStyle: 'italic', textAlign: 'center' }}>
                      No data
                    </Typography>
                  )}
                  {/*----------------------- END EZ ------------------------------------------ */}

                  <IconButton onClick={rightSlide} sx={{ backgroundColor: '#ddd' }}>
                    <KeyboardArrowRight
                      sx={{
                        color: '#000',
                        '&:hover': {
                          opacity: [0.9, 0.8, 0.7],
                          transition: 'opacity 0.3s ease-in-out',
                          transform: 'scale(1.1)',
                          transition: 'transform 0.3s ease-in-out'
                        }
                      }}
                    />
                  </IconButton>
                </Box>
              </Hidden>
            </Grid>

            <Grid item xs={12} md={6}>
              <Grid item xs={12}>
                <Typography color={theme.palette.text.primary} sx={typography.h1.topic}>
                  {informationdata.post_name}
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Divider sx={{ borderBottomWidth: 2, width: '100%' }} />
              </Grid>

              <Grid item xs={12}>
                <Typography sx={typography.body2} color='#606060'>
                  {informationdata.post_detail}
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Typography sx={typography.body2} color='#606060'>
                Post by {informationdata.sub_name}
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  )
}

export default InformationDetails
