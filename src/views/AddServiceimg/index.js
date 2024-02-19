// *** React Import
import React, { useState } from 'react'

// ** Material UI Imports
import {
  Backdrop,
  Box,
  Button,
  Card,
  CardContent,
  Fade,
  FormControl,
  Grid,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography
} from '@mui/material'

// ** Material-UI Icons Imports
import DeleteIcon from '@mui/icons-material/Delete'

// ** Switch Alert Import
const Swal = require('sweetalert2')

const AddserviceIMG = ({ imageChange, setImageChange, onUploadImagesChange, onUploadVdoChange }) => {
  const [uploadImages, setUploadImages] = useState([])
  const [uploadVideos, setUploadVideos] = useState({})
  const [openImagePreview, setOpenImagePreview] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)

  // ** upload images
  const handleImageChange = event => {
    const files = event.target.files
    if (files && files.length > 0) {
      const newImages = Array.from(files)
        .filter(file => file.type.startsWith('image/') && file.size <= 10 * 1024 * 1024)
        .map(file => ({
          file: file,
          name: file.name,
          url: URL.createObjectURL(file)
        }))

      setUploadImages(prevImages => [...prevImages, ...newImages])
      onUploadImagesChange([...uploadImages, ...newImages]) // ส่งค่าลงตัวแปร uploadImages ของหน้า add-product
    }
  }

  // ** upload videos
  const handleVideoChange = event => {
    const file = event.target.files[0]
    if (file) {
      const maxSize = 10 * 1024 * 1024 // 10 MB
      if (file.size > maxSize) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'The video size is too large. Please choose a video that is under 10MB.'
        })
      } else if (file.type.startsWith('video/')) {
        const newVideo = {
          file: file,
          name: file.name,
          url: URL.createObjectURL(file)
        }

        setUploadVideos([newVideo]) // อัปเดตเพียงวิดีโอเดียว
        onUploadVdoChange([newVideo]) // ส่งค่าลงตัวแปร upload Vdo ของหน้า add-product
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Please choose a valid video file.'
        })
      }
    }
  }

  // ** open image preview
  const handleOpen = image => {
    setSelectedImage(image.url)
    setOpenImagePreview(true)
  }

  // ** close image preview
  const handleClose = () => {
    setSelectedImage(null)
    setOpenImagePreview(false)
  }

  // ** delete image
  const handleDeleteMedia = (index, mediaType) => {
    if (mediaType === 'image') {
      const updatedImages = [...uploadImages]
      const deletedImage = updatedImages.splice(index, 1)[0] // ลบรูปภาพและเก็บค่าที่ถูกลบ
      setUploadImages(updatedImages)

      // อัพเดท image_file_name โดยลบชื่อรูปที่ถูกลบออก
      if (typeof imageChange === 'string' && imageChange) {
        const currentImageFileNames = imageChange.split(', ').filter(fileName => fileName !== deletedImage.name)
        setImageChange(currentImageFileNames)
      }

      // อัพเดท onUploadImagesChange โดยลบชื่อรูปที่ถูกลบออก
      onUploadImagesChange(updatedImages)
    } else if (mediaType === 'video') {
      const updatedVideos = [...uploadVideos]
      onUploadVdoChange(updatedVideos)
      updatedVideos.splice(index, 1)
      setUploadVideos(updatedVideos)
    }
  }

  return (
    <Box>
      <Card variant='outlined' sx={{ padding: '30px' }}>
        <Grid container spacing={4}>
          {/* ---------- Upload Image ---------- */}
          <Grid item xs={12}>
            <Card variant='outlined'>
              <CardContent sx={{ backgroundColor: '#ebf3fe' }}>
                <Grid container spacing={2} justifyContent='center' alignItems='center'>
                  <Grid item xs={12} lg={2}>
                    <Button
                      variant='outlined'
                      component='label'
                      fullWidth
                      sx={{ minHeight: 55, backgroundColor: 'white' }}
                    >
                      Upload Image
                      <input type='file' accept='image/*' hidden multiple onChange={handleImageChange} />
                    </Button>
                  </Grid>
                  <Grid item xs={12} lg={10}>
                    <Card
                      variant='outlined'
                      sx={{ minHeight: 55, display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                    >
                      {uploadImages.length > 0 ? (
                        <ImageList sx={{ width: 'auto', height: 400 }} cols={2}>
                          {uploadImages.map((image, index) => (
                            <ImageListItem key={index}>
                              <img
                                key={index}
                                src={image.url}
                                alt={`Image ${index}`}
                                loading='lazy'
                                style={{
                                  width: '250px', // กำหนดความกว้าง
                                  height: '250px', // กำหนดความสูง
                                  margin: 'auto', // จัดตำแหน่งรูปให้อยู่ตรงกลาง
                                  display: 'block' // ให้รูปแสดงเป็นบล็อกเพื่อจัดตำแหน่งและขนาด
                                }}
                                onClick={() => handleOpen(image)}
                              />
                              <ImageListItemBar
                                titleTypographyProps={{
                                  variant: 'body2',
                                  style: { fontSize: '12px', textAlign: 'center' }
                                }}
                                subtitleTypographyProps={{
                                  variant: 'body2',
                                  style: { fontSize: '10px', textAlign: 'center' }
                                }}
                                title={image.name}
                                subtitle={<span>by: {image.name}</span>}
                                position='below'
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
                      ) : (
                        <Typography variant='body1'>Upload 250*250 Pixels image</Typography>
                      )}
                    </Card>
                  </Grid>
                </Grid>

                {/* show full image */}
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
              </CardContent>
            </Card>
          </Grid>
          {/* ---------- Upload Image ---------- */}

          <Grid item xs={12}>
            <Card variant='outlined'>
              <CardContent sx={{ backgroundColor: '#ebf3fe' }}>
                <Grid container spacing={2} justifyContent='center' alignItems='center'>
                  <Grid item xs={12} lg={2}>
                    <Button
                      variant='outlined'
                      component='label'
                      fullWidth
                      sx={{ minHeight: 55, backgroundColor: 'white' }}
                    >
                      Upload Video
                      <input type='file' accept='video/*' hidden onChange={handleVideoChange} />
                    </Button>
                  </Grid>
                  <Grid item xs={12} lg={10}>
                    <Card
                      variant='outlined'
                      sx={{ minHeight: 55, display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                    >
                      {uploadVideos.length > 0 ? (
                        <div>
                          {uploadVideos.map((video, index) => (
                            <div key={index} style={{ position: 'relative', marginBottom: '20px' }}>
                              <video
                                key={index}
                                src={video.url}
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
                    </Card>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Card>
    </Box>
  )
}

export default AddserviceIMG
