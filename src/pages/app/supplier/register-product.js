// *** React Import
import React, { useEffect, useState } from 'react'

// ** Mui imports
import {
  Card,
  Grid,
  Typography,
  Box,
  TextField,
  Select,
  MenuItem,
  ListSubheader,
  Button,
  ImageList,
  ImageListItem,
  Modal,
  Fade,
  Backdrop,
  IconButton
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'

const RegisterProductPage = () => {
  const [uploadImages, setUploadImages] = useState([])
  const [uploadVideos, setUploadVideos] = useState([])
  const [openImagePreview, setOpenImagePreview] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)

  const [product, setProduct] = useState({
    name: '',
    category: '',
    price: '',
    quantity: '',
    detail: ''
  })

  const currencies = [
    {
      value: 'USD',
      label: '$'
    },
    {
      value: 'EUR',
      label: '€'
    },
    {
      value: 'JPY',
      label: '¥'
    },
    {
      value: 'THB',
      label: '฿'
    }
  ]

  const handleImageChange = event => {
    const files = event.target.files
    if (files && files.length > 0) {
      const newImages = Array.from(files)
        .slice(0, 10)
        .map(file => URL.createObjectURL(file))
      setUploadImages([...uploadImages, ...newImages])
    }
  }

  const handleVideoChange = event => {
    const files = event.target.files
    if (files && files.length > 0) {
      const newVideos = Array.from(files)
        .filter(file => file.type.startsWith('video/') && file.size <= 100 * 1024 * 1024) // ตรวจสอบประเภทและขนาดของวิดีโอ
        .map(file => URL.createObjectURL(file))

      setUploadVideos(newVideos) // ใช้วิดีโอใหม่แทนที่ทั้งหมด

      // หรือถ้าต้องการเพิ่มวิดีโอใน array เดิม ให้ใช้บรรทัดด้านล่างแทน
      // setUploadVideos([...uploadVideos, ...newVideos]);
    }
  }

  const handleOpen = image => {
    setSelectedImage(image)
    setOpenImagePreview(true)
  }

  const handleClose = () => {
    setSelectedImage(null)
    setOpenImagePreview(false)
  }

  const handleDeleteMedia = (index, mediaType) => {
    if (mediaType === 'image') {
      const updatedImages = [...uploadImages]
      updatedImages.splice(index, 1)
      setUploadImages(updatedImages)
    } else if (mediaType === 'video') {
      const updatedVideos = [...uploadVideos]
      updatedVideos.splice(index, 1)
      setUploadVideos(updatedVideos)
    }
  }

  useEffect(() => {
    console.log(selectedImage)
  }, [selectedImage])

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant='h4'>Register Product</Typography>
        <Typography variant='body1'>กรอกข้อมูลสินค้าที่ต้องการลงทะเบียน</Typography>
      </Box>

      <Card sx={{ padding: 10 }}>
        <Typography variant='h5'>รูปภาพสินค้า</Typography>
        <Box sx={{ my: 4 }} border={1} borderColor='rgba(0, 0, 0, 0.2)' borderRadius={1}>
          <Grid container spacing={5} sx={{ p: 4 }}>
            <Grid item xs={12} sm={2}>
              <Box sx={{ p: 4, width: '100%', height: '100%' }}>
                <Button
                  sx={{
                    bgcolor: 'rgba(0, 0, 0, 0.01)',
                    height: '100%'
                  }}
                  component='label'
                  fullWidth
                >
                  Upload Image
                  <input type='file' accept='image/*' hidden multiple onChange={handleImageChange} />
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} sm={10}>
              <Box sx={{ my: 4, p: 4 }} border={1} borderColor='rgba(0, 0, 0, 0.2)' borderRadius={1}>
                {uploadImages.length > 0 ? (
                  <div>
                    <ImageList sx={{ width: 'auto', height: 300 }} cols={3}>
                      {uploadImages.map((image, index) => (
                        <ImageListItem key={index}>
                          <img
                            key={index}
                            src={image}
                            alt={`Image ${index}`}
                            loading='lazy'
                            width={'100%'}
                            height={'auto'}
                            onClick={() => handleOpen(image)}
                          />
                          <IconButton
                            aria-label='delete'
                            onClick={() => handleDeleteMedia(index, 'image')}
                            sx={{
                              position: 'absolute',
                              top: 5,
                              right: 5,
                              color: 'white',
                              bgcolor: 'rgba(0, 0, 0, 0.5)'
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </ImageListItem>
                      ))}
                    </ImageList>
                  </div>
                ) : (
                  <Typography variant='body1'>No image selected</Typography>
                )}
              </Box>
              <Box></Box>
            </Grid>
          </Grid>
        </Box>
        <Typography variant='h5'>วิดีโอสินค้า</Typography>
        <Box sx={{ my: 4 }} border={1} borderColor='rgba(0, 0, 0, 0.2)' borderRadius={1}>
          <Grid container spacing={5} sx={{ p: 4 }}>
            <Grid item xs={12} sm={2}>
              <Box sx={{ my: 4, maxWidth: '100%', justifyContent: 'center', display: 'flex' }}>
                <Button
                  sx={{
                    bgcolor: 'rgba(0, 0, 0, 0.01)',
                    width: 'full',
                    height: 150
                  }}
                  component='label'
                  fullWidth
                >
                  Upload Video
                  <input type='file' accept='video/*' hidden multiple onChange={handleVideoChange} />
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} sm={10}>
              <Box sx={{ my: 4, p: 4 }} border={1} borderColor='rgba(0, 0, 0, 0.2)' borderRadius={1}>
                {uploadVideos.length > 0 ? (
                  <div>
                    {uploadVideos.map((video, index) => (
                      <div key={index} style={{ position: 'relative', marginBottom: '20px' }}>
                        <video
                          key={index}
                          src={video}
                          controls
                          style={{ display: 'block', maxWidth: '100%', maxHeight: '80vh', margin: 'auto' }} // ปรับขนาดและตำแหน่งให้แสดงตรงกลาง
                        />
                        <IconButton
                          aria-label='delete'
                          onClick={() => handleDeleteMedia(index, 'video')}
                          sx={{
                            position: 'absolute',
                            top: 5,
                            right: 5,
                            color: 'white',
                            bgcolor: 'rgba(0, 0, 0, 0.5)'
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </div>
                    ))}
                  </div>
                ) : (
                  <Typography variant='body1'>No Video selected</Typography>
                )}
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <Typography>ชื่อสินค้า</Typography>
            <TextField
              fullWidth
              id='product-name'
              value={product.name}
              onChange={e => setProduct({ ...product, name: e.target.value })}
            />
          </Grid>

          <Grid item xs={12}>
            <Typography>หมวดหมู่</Typography>
            <Select fullWidth defaultValue='' id='grouped-select' label='Grouping'>
              <MenuItem value=''>
                <em>None</em>
              </MenuItem>
              <ListSubheader>Category 1</ListSubheader>
              <MenuItem value={1}>Option 1</MenuItem>
              <MenuItem value={2}>Option 2</MenuItem>
              <ListSubheader>Category 2</ListSubheader>
              <MenuItem value={3}>Option 3</MenuItem>
              <MenuItem value={4}>Option 4</MenuItem>
            </Select>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Typography>Please select your currency</Typography>
            <TextField fullWidth select id='outlined-select-currency' defaultValue='EUR'>
              {currencies.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label} : {option.value}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6} md={8}>
            <Typography>ราคาสินค้า</Typography>
            <TextField fullWidth id='product-price' variant='outlined' />
          </Grid>

          <Grid item xs={12}>
            <Typography>จำนวนสินค้า</Typography>
            <TextField fullWidth id='product-quantity' variant='outlined' />
          </Grid>

          <Grid item xs={12}>
            <Typography>รายละเอียดสินค้า</Typography>
            <TextField fullWidth id='product-detail' multiline rows={4} variant='outlined' />
          </Grid>
        </Grid>
      </Card>
      <Modal
        open={openImagePreview}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            TransitionComponent: Fade
          }
        }}
      >
        <Fade in={openImagePreview}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 'auto',
              bgcolor: 'background.paper',
              boxShadow: 24,
              p: 4
            }}
          >
            {selectedImage ? (
              <img
                src={selectedImage}
                alt='Selected Image'
                style={{ maxWidth: '100%', maxHeight: '80vh' }} // ปรับขนาดให้พอดีกับ viewport
              />
            ) : (
              <Typography variant='body1'>No image selected</Typography>
            )}
          </Box>
        </Fade>
      </Modal>
    </Box>
  )
}

export default RegisterProductPage
