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
  Divider,
  TextField
} from '@mui/material'

import InfoIcon from '@mui/icons-material/Info'
import ChevronRight from 'mdi-material-ui/ChevronRight'
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight'
import { useRouter } from 'next/router'
import axios from 'axios'
import TestshowwinV from 'src/views/information/RegisInfo'
import { useMediaQuery } from '@mui/material'
import { useTheme } from '@material-ui/core/styles'

// ** Material-UI Icons Imports
import DeleteIcon from '@mui/icons-material/Delete'

const Swal = require('sweetalert2')

const EditInfor = () => {
  const [informationdata, setInformationData] = useState([]) // ตัวแปรเก็บข้อมูลแนะนำ
  const [informationimg, setInformationImg] = useState([]) // ตัวแปรเก็บข้อมูลรูปภาพ
  // เก็บค่าเซฟรูป
  const [uploadImages, setUploadImages] = useState([])
  const [imagesName, setImagesName] = useState([])
  const [imageChange, setImageChange] = useState({})

const theme = useTheme()

  const FirstImage = informationimg && informationimg[0] ? informationimg[0].image_file_infname : null // ตัวแปรเก็บข้อมูลรูปภาพตัวอย่าง

  const router = useRouter() // เรียกใช้งาน Router
  const { post_id } = router.query
  const postId = post_id

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API}TCTM.infromation.getallinfV2`, {
          params: {
            post_id: postId
          }
        })
        setInformationImg(response.data.message.Data)
        setInformationData(response.data.message.Data[0])
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [postId])

  useEffect(() => {
    const imageNames = uploadImages.map(image => image.name)

    // ตรวจสอบว่าค่า imageNames ไม่เหมือนกับค่าปัจจุบันของ imagesName ก่อนที่จะเรียก setImagesName
    if (JSON.stringify(imageNames) !== JSON.stringify(imagesName)) {
      setImagesName(imageNames)
    }
  }, [uploadImages, imagesName])

  useEffect(() => {
    console.log('ไฟล์', imageChange)
  }, [imageChange])

  // จัดการตัวแปรชื่อไฟล์ภาพ
  const handleUploadImagesChange = newImages => {
    setUploadImages(newImages)
    const timestamp = new Date().toISOString().slice(0, 16).replace(/[-T:]/g, '')

    const newImageFiles = newImages.map(image => {
      const newFileName = `${timestamp}_${image.name}`

      return new File([image], newFileName)
    })

    setImageChange(newImageFiles.map(image => image.name))
  }

  // Api ฟังชันอัปโหลดรูปภาพ
  const uploadImagesToApi = () => {
    return axios.post(`/api/Infor_FileUpload`, uploadImages, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }

  const fetchData = () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API}TCTM.infromation.getallinfV2`)
      .then(response => {
        setInformationData(response.data.message.Data)
      })
      .catch(error => {
        console.error('Error:', error)
      })
  }

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

  const handleTitleChange = e => {
    console.log('Title changed:', e.target.value)
    setInformationData(prevData => ({
      ...prevData,
      post_name: e.target.value
    }))
  }

  const handleDetailChange = e => {
    console.log('Detail changed:', e.target.value)
    setInformationData(prevData => ({
      ...prevData,
      post_detail: e.target.value
    }))
  }

  const updateData = async () => {
    try {
      const response = await axios.put(`${process.env.NEXT_PUBLIC_API}TCTM.infromation.update_inf`, {
        post_id: postId, // หรือข้อมูลอื่น ๆ ที่คุณต้องการใช้ในการระบุข้อมูลที่จะอัปเดต
        post_name: informationdata.post_name,
        post_detail: informationdata.post_detail

        // และข้อมูลอื่น ๆ ที่คุณต้องการเพิ่มหรืออัปเดต
      })

      const data = {
        post_id: postId,
        image_file_infname: imageChange[0]
      }

      const res = await axios.post(`${process.env.NEXT_PUBLIC_API}TCTM.infromation.inf_add_img `, data)
      uploadImagesToApi()
      console.log('data', data)

      // fetchData()
      console.log('Update successful:', response.data)
      console.log('Update successful:', res.data)
      Swal.fire({
        icon: 'success',
        title: 'ส่งข้อมูลสำเร็จ',
        text: 'ส่งข้อมูลเสร็จสิ้น'
      })
      fetchData()

      // หลังจากอัปเดตข้อมูลเรียบร้อยแล้ว, คุณสามารถทำสิ่งที่คุณต้องการ เช่น รีเซ็ตค่าข้อมูลหรือนำทางผู้ใช้ไปยังหน้าอื่น ๆ
    } catch (error) {
      console.error('Update failed:', error)
      Swal.fire({
        icon: 'error',
        title: 'Log in ล้มเหลว...',
        text: 'มีข้อผิดพลาดในการเรียก API'
      })

      // จัดการข้อผิดพลาดตามที่คุณต้องการ, เช่น แสดงข้อความผิดพลาดหรือรีเซ็ตข้อมูล
    }
  }

  const handleDeleteImage = async imageId => {
    console.log('delete image', imageId)
    const data = { name: imageId }
    try {
      const response = await axios.put(`${process.env.NEXT_PUBLIC_API}TCTM.infromation.deleteinfimg`, data)

      console.log('Image deleted successfully:', response.data)
      Swal.fire({
        icon: 'success',
        title: 'Delete successful',
        text: 'Image deleted successfully'
      })
    } catch (error) {
      console.error('Delete failed:', error)
      Swal.fire({
        icon: 'error',
        title: 'Delete failed',
        text: 'An error occurred while deleting the image'
      })
    }
  }

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
                  backgroundColor: theme.palette.primary.dark,
                  border: '1px solid #primary.main'
                }}
              >
                <Grid container alignItems='center'>
                  <Grid item xs={12} sm={8} md={8}>
                    <Typography
                      color='#fff'
                      variant='h5'
                      sx={{ fontWeight: 'bold', fontSize: { xs: '1.2rem', sm: '1.5rem', md: '1.6rem' } }}
                    >
                      Information
                    </Typography>
                    <Breadcrumbs separator={<ChevronRight />} aria-label='breadcrumb' color='#fff'>
                      <Link href='/' passHref>
                        <Typography
                          color='#fff'
                          variant='subtitle1'
                          sx={{ cursor: 'pointer', fontSize: { xs: '0.8rem', sm: '0.8rem', md: '1rem' } }}
                        >
                          Home
                        </Typography>
                      </Link>
                      <Typography
                        color='#fff'
                        variant='subtitle1'
                        sx={{ cursor: 'pointer', fontSize: { xs: '0.8rem', sm: '0.8rem', md: '1rem' } }}
                      >
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
            <Grid item xs={12}>
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
                  alt={`Image ${stateImages + 1}`}
                  height='100%'
                  sx={{ width: '90%', objectFit: 'contain' }}
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

                  {informationimg && informationimg.length > 0 ? (
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%',
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
                            marginLeft: '15px',
                            position: 'relative'
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
                          {/* เพิ่มปุ่ม Delete */}
                          <IconButton
                            onClick={() => handleDeleteImage(image.name)}
                            sx={{
                              position: 'absolute',
                              top: '5px',
                              right: '5px',
                              color: 'red'
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                      ))}
                    </Box>
                  ) : (
                    <Typography variant='h6' sx={{ color: '#999', fontStyle: 'italic', textAlign: 'center' }}>
                      Noimage
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
          </Grid>
        </Container>
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12} sx={{ my: 10 }}>
          <TestshowwinV onUploadImagesChange={handleUploadImagesChange} />
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', mt: 10, mb: 6 }}>
            <TextField
              fullWidth
              id='Title Information'
              multiline
              rows={4}
              variant='outlined'
              placeholder='กรุณากรอกหัวข้อข้อมูล'
              value={informationdata.post_name}
              onChange={handleTitleChange}
            />
          </Box>
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            id='Detail Information'
            multiline
            rows={16}
            variant='outlined'
            placeholder='กรุณากรอกรายละเอียดข้อมูล'
            value={informationdata.post_detail}
            onChange={handleDetailChange}
          />
        </Grid>

        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', my: 6 }}>
          <Typography variant='body1' fontSize='16px' color='#606060' style={{ whiteSpace: 'pre-line', width: '80%' }}>
            Post by {informationdata.sub_name}
          </Typography>
        </Grid>

        <Button fullWidth size='large' type='submit' variant='contained' sx={{ marginBottom: 3 }} onClick={updateData}>
          FINISH
        </Button>
      </Grid>
    </Box>
  )
}

export default EditInfor
