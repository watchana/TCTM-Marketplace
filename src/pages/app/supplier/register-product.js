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
  const [openImagePreview, setOpenImagePreview] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)

  const handleImageChange = event => {
    const files = event.target.files
    if (files && files.length > 0) {
      const newImages = Array.from(files)
        .slice(0, 10)
        .map(file => URL.createObjectURL(file))
      setUploadImages([...uploadImages, ...newImages])
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

  const handleDeleteImage = index => {
    const updatedImages = [...uploadImages]
    updatedImages.splice(index, 1) // ลบรูปภาพที่ต้องการออกจากอาเรย์
    setUploadImages(updatedImages)
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
              <Box sx={{ my: 4 }}>
                <Button
                  sx={{
                    bgcolor: 'rgba(0, 0, 0, 0.01)',
                    width: 'full',
                    height: 150
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
                            onClick={() => handleDeleteImage(index)}
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
              <Box sx={{ my: 4 }}>
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
                  <input type='file' accept='image/*' hidden multiple onChange={handleImageChange} />
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} sm={10}>
              <Box sx={{ my: 4, p: 4 }} border={1} borderColor='rgba(0, 0, 0, 0.2)' borderRadius={1}>
                {uploadImages ? <div>test</div> : <Typography variant='body1'>No Video selected</Typography>}
              </Box>
              <Box></Box>
            </Grid>
          </Grid>
        </Box>
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <Typography>ชื่อสินค้า</Typography>
            <TextField fullWidth id='product-name' label='กรอกชื่อสินค้า' variant='outlined' />
          </Grid>
          <Grid item xs={12}>
            <Typography>ราคาสินค้า</Typography>
            <TextField fullWidth id='product-price' label='กรอกชื่อสินค้า' variant='outlined' />
          </Grid>
          <Grid item xs={12}>
            <Typography>จำนวนสินค้า</Typography>
            <TextField fullWidth id='product-quantity' label='กรอกจำนวนสินค้า' variant='outlined' />
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
          <Grid item xs={12}>
            <Typography>รายละเอียดสินค้า</Typography>
            <TextField
              fullWidth
              id='product-detail'
              multiline
              rows={4}
              label='กรอกรายละเอียดสินค้า'
              variant='outlined'
            />
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
