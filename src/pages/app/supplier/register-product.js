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

  const productOptionsInit = [
    {
      optionId: 1,
      optionName: '',
      optionType: 1,
      optionValue: [{ valueId: 1, valueName: '' }]
    }
  ]
  const [productOptions, setProductOptions] = useState(productOptionsInit)

  const productOptionGroupsInit = [
    {
      optionGroupId: 1,
      optionGroupName: ''
    }
  ]
  const [productOptionGroups, setProductOptionGroups] = useState(productOptionGroupsInit)

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

  const handleAddOption = e => {
    const newOption = {
      optionId: productOptions.length + 1,
      optionName: '',
      optionType: 1,
      optionValue: [{ valueId: 1, valueName: '' }]
    }
    setProductOptions([...productOptions, newOption])
  }

  const handleDeleteOption = e => {
    const updatedOptions = [...productOptions]
    updatedOptions.splice(productOptions.length - 1, 1)
    setProductOptions(updatedOptions)
  }

  const handleOptionTypeChange = (e, optionId) => {
    e.target.value === 1
      ? setProductOptions(options =>
          options.map(opt =>
            opt.optionId === optionId
              ? { ...opt, optionType: e.target.value, optionValue: [{ valueId: 1, valueName: '' }] }
              : opt
          )
        )
      : setProductOptions(options =>
          options.map(opt => (opt.optionId === optionId ? { ...opt, optionType: e.target.value } : opt))
        )
  }

  const handleAddOptionValue = e => {
    const updatedOptions = [...productOptions]
    const lastOption = updatedOptions[updatedOptions.length - 1]

    const newOptionValue = {
      valueId: lastOption.optionValue.length + 1,
      valueName: ''
    }
    lastOption.optionValue.push(newOptionValue)
    setProductOptions(updatedOptions)
  }

  const handleDeleteOptionValue = e => {
    const updatedOptions = [...productOptions]
    const lastOption = updatedOptions[updatedOptions.length - 1]

    lastOption.optionValue.splice(lastOption.optionValue.length - 1, 1)
    setProductOptions(updatedOptions)
  }

  const handleAddOptionGroup = e => {
    const newOptionGroup = {
      optionGroupId: productOptionGroups.length + 1,
      optionGroupName: ''
    }
    setProductOptionGroups([...productOptionGroups, newOptionGroup])
  }

  const handleDeleteOptionGroup = e => {
    const updatedOptionGroups = [...productOptionGroups]
    updatedOptionGroups.splice(productOptionGroups.length - 1, 1)
    setProductOptionGroups(updatedOptionGroups)
  }

  useEffect(() => {
    console.log(productOptions)
  }, [productOptions])

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant='h4'>Register Product</Typography>
        <Typography variant='body1'>กรอกข้อมูลสินค้าที่ต้องการลงทะเบียน</Typography>
      </Box>

      {/* รูปภาพ & วิดิโอ */}
      <Card sx={{ padding: 8, marginBlock: 5 }}>
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
        <Grid container spacing={5}></Grid>
      </Card>

      {/* รายละเอียดสินค้า */}
      <Card sx={{ padding: 8, marginBlock: 5 }}>
        <Typography variant='h5'>รายละเอียดสินค้า</Typography>
        <Box sx={{ my: 4 }} border={1} borderColor='rgba(0, 0, 0, 0.2)' borderRadius={1}>
          <Grid container spacing={5} sx={{ p: 4 }}>
            <Grid item xs={12} sm={6}>
              <Typography>ชื่อสินค้า</Typography>
              <TextField
                fullWidth
                id='product-name'
                value={product.name}
                onChange={e => setProduct({ ...product, name: e.target.value })}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
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
              <TextField fullWidth id='product-detail' multiline rows={4} variant='outlined' />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography>แบรนด์</Typography>
              <TextField fullWidth id='product-brand' variant='outlined' />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography>น้ำหนัก</Typography>
              <TextField fullWidth id='product-brand' variant='outlined' />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography>ฺBakeware Type</Typography>
              <TextField fullWidth id='product-brand' variant='outlined' />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography>หมายเลขใบอนุญาติ </Typography>
              <TextField fullWidth id='product-brand' variant='outlined' />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography>ประเทศต้นกำเนิดสินค้า</Typography>
              <TextField fullWidth id='product-brand' variant='outlined' />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography>ขนาดบรรจุ</Typography>
              <TextField fullWidth id='product-brand' variant='outlined' />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography>ส่วนประกอบ</Typography>
              <TextField fullWidth id='product-brand' variant='outlined' />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography>ปริมาณ</Typography>
              <TextField fullWidth id='product-brand' variant='outlined' />
            </Grid>
          </Grid>
        </Box>
      </Card>

      {/* ตัวเลือกสินค้า */}
      <Card sx={{ padding: 8, marginBlock: 5 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant='h5'>เพิ่มตัวเลือกสินค้า</Typography>
          <Typography variant='body1'>หัวข้อตัวเลือกที่ต้องการ</Typography>
        </Box>
        <Grid container spacing={5} alignItems={'flex-end'}>
          {productOptions.map(option => (
            <Grid
              item
              key={option.optionId}
              xs={12}
              border={1}
              borderColor='rgba(0, 0, 0, 0.2)'
              borderRadius={1}
              sx={{ m: 5, p: 4 }}
            >
              <Grid container spacing={5}>
                <Grid item key={option.optionId} xs={12} sm={6}>
                  <Typography>ตัวเลือกที่ {option.optionId}</Typography>
                  <TextField
                    fullWidth
                    id={`product-option-name-${option.optionId}`}
                    variant='outlined'
                    value={option.optionName}
                    onChange={e =>
                      setProductOptions(options =>
                        options.map(opt =>
                          opt.optionId === option.optionId ? { ...opt, optionName: e.target.value } : opt
                        )
                      )
                    }
                  />
                </Grid>
                <Grid item key={option.optionId} xs={12} sm={6}>
                  <Typography>แบบกรอกข้อมูล หรือ แบบเลือก</Typography>
                  <Select
                    fullWidth
                    labelId='demo-simple-select-label'
                    id='demo-simple-select'
                    value={option.optionType}
                    onChange={e => handleOptionTypeChange(e, option.optionId)}
                  >
                    <MenuItem value={1}>กรอกเอง</MenuItem>
                    <MenuItem value={2}>เลือก</MenuItem>
                  </Select>
                </Grid>

                <Grid item xs={12}>
                  {option.optionType === 2 && (
                    <Grid container spacing={5} alignItems={'flex-end'}>
                      {option.optionValue.map(value => (
                        <Grid item key={value.valueId} xs={6}>
                          <Typography>ตัวเลือกย่อยที่ {value.valueId}</Typography>
                          <TextField
                            fullWidth
                            id='product-option-name'
                            variant='outlined'
                            onChange={e =>
                              setProductOptions(options =>
                                options.map(opt =>
                                  opt.optionId === option.optionId
                                    ? {
                                        ...opt,
                                        optionValue: opt.optionValue.map(val =>
                                          val.valueId === value.valueId
                                            ? {
                                                ...val,
                                                valueName: e.target.value
                                              }
                                            : val
                                        )
                                      }
                                    : opt
                                )
                              )
                            }
                          />
                        </Grid>
                      ))}
                      {option.optionValue.length < 5 ? (
                        <Grid item xs={3}>
                          <Button fullWidth variant='contained' sx={{ height: 55 }} onClick={handleAddOptionValue}>
                            +
                          </Button>
                        </Grid>
                      ) : (
                        <Grid item xs={12} sm={12}></Grid>
                      )}
                      {option.optionValue.length !== 1 && (
                        <Grid item xs={3}>
                          <Button fullWidth variant='contained' sx={{ height: 55 }} onClick={handleDeleteOptionValue}>
                            -
                          </Button>
                        </Grid>
                      )}
                    </Grid>
                  )}
                </Grid>
              </Grid>
            </Grid>
          ))}

          {productOptions.length < 5 ? (
            <Grid item xs={6} sm={6} sx={{}}>
              <Button fullWidth variant='contained' sx={{ height: 55 }} onClick={handleAddOption}>
                +
              </Button>
            </Grid>
          ) : (
            <Grid item xs={6} sm={6} sx={{}}></Grid>
          )}
          {productOptions.length !== 1 && (
            <Grid item xs={6} sm={6}>
              <Button fullWidth variant='contained' sx={{ height: 55 }} onClick={handleDeleteOption}>
                -
              </Button>
            </Grid>
          )}
        </Grid>
      </Card>

      {/* รายละเอียดสินค้าของแต่ละตัวเลือก */}
      <Card sx={{ padding: 8, marginBlock: 5 }}>
        <Typography variant='h5'>รายละเอียดสินค้าของแต่ละตัวเลือก</Typography>
        {productOptionGroups.map(optionGroup => (
          <Box key={optionGroup.optionGroupId} sx={{ marginY: 2 }}>
            <Typography variant='h5'>สินค้าตัวเลือกที่ {optionGroup.optionGroupId}</Typography>
            <Box sx={{ my: 4 }} border={1} borderColor='rgba(0, 0, 0, 0.2)' borderRadius={1}>
              <Grid container spacing={5} sx={{ p: 4 }}>
                {productOptions.map(
                  option =>
                    option.optionName.length > 0 && (
                      <Grid item key={option.optionId} xs={12} sm={6}>
                        <Typography>{option.optionName}</Typography>
                        {option.optionType === 1 ? (
                          <TextField fullWidth id={`product-option-group-name-${option.optionId}`} variant='outlined' />
                        ) : (
                          <Select fullWidth labelId='demo-simple-select-label' id='demo-simple-select'>
                            {option.optionValue.map(value => (
                              <MenuItem key={value.valueId} value={value.valueName}>
                                {value.valueName}
                              </MenuItem>
                            ))}
                          </Select>
                        )}
                      </Grid>
                    )
                )}

                <Grid item xs={12} sm={6}>
                  <Typography>ราคาสินค้า</Typography>
                  <TextField
                    fullWidth
                    id={`product-option-group-name-${optionGroup.optionGroupId}`}
                    variant='outlined'
                    value={optionGroup.optionGroupName}
                  />
                </Grid>
              </Grid>
            </Box>
          </Box>
        ))}
        <Grid container spacing={5}>
          {productOptionGroups.length < 5 ? (
            <Grid item xs={6} sm={6}>
              <Button fullWidth variant='contained' sx={{ height: 55 }} onClick={handleAddOptionGroup}>
                +
              </Button>
            </Grid>
          ) : (
            <Grid item xs={6} sm={6}></Grid>
          )}
          {productOptionGroups.length !== 1 && (
            <Grid item xs={6} sm={6}>
              <Button fullWidth variant='contained' sx={{ height: 55 }} onClick={handleDeleteOptionGroup}>
                -
              </Button>
            </Grid>
          )}
        </Grid>
      </Card>

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
    </Box>
  )
}

export default RegisterProductPage
