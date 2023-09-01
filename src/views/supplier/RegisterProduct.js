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
  IconButton,
  CardContent,
  ImageListItemBar
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'

// ** Switch Alert Import
const Swal = require('sweetalert2')

const RegisterProduct = ({ product, setProduct, productCategories }) => {
  const [uploadImages, setUploadImages] = useState([])
  const [uploadVideos, setUploadVideos] = useState({})
  const [openImagePreview, setOpenImagePreview] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)

  const productOptionsInit = [
    {
      optionId: 1,
      optionName: '',
      optionValidation: 0,
      optionType: 1,
      optionValue: [{ valueId: 1, valueName: '' }]
    }
  ]

  const productOptionGroupsInit = {
    optionGroupId: 1,
    optionGroupColumn1: '',
    optionGroupColumn2: '',
    optionGroupColumn3: '',
    optionGroupColumn4: '',
    optionGroupColumn5: '',
    optionGroupPrice: '',
    optionGroupQuantity: 0
  }

  // ** upload images
  const handleImageChange = event => {
    const files = event.target.files
    if (files && files.length > 0) {
      const newImages = Array.from(files)
        .filter(file => file.type.startsWith('image/') && file.size <= 10 * 1024 * 1024) // ตรวจสอบประเภทและขนาดของรูปภาพ
        .map(file => ({
          file: file,
          name: file.name, // เก็บชื่อไฟล์
          url: URL.createObjectURL(file)
        }))

      setUploadImages(prevImages => [...prevImages, ...newImages])
    }
  }

  // ** upload videos
  const handleVideoChange = event => {
    const files = event.target.files
    if (files && files.length > 0) {
      const maxSize = 100 * 1024 * 1024 // 100 MB
      if (files[0].size > maxSize) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'The video size is too large. Please choose a video that is under 100MB.'
        })
      } else {
        const newVideos = Array.from(files)
          .filter(file => file.type.startsWith('video/') && file.size <= maxSize)
          .map(file => ({
            file: file,
            name: file.name,
            url: URL.createObjectURL(file)
          }))

        setUploadVideos(prevVideos => [...prevVideos, ...newVideos])
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
      updatedImages.splice(index, 1)
      setUploadImages(updatedImages)
    } else if (mediaType === 'video') {
      const updatedVideos = [...uploadVideos]
      updatedVideos.splice(index, 1)
      setUploadVideos(updatedVideos)
    }
  }

  // ** add product options
  const handleAddOption = e => {
    const MaxOptionId = Math.max(...product.options.map(option => option.optionId))

    const newOption = {
      optionId: MaxOptionId + 1,
      optionName: '',
      optionType: 1,
      optionValue: [{}]
    }
    setProduct({ ...product, options: [...product.options, newOption] })
  }

  // ** delete product options
  const handleDeleteOption = (e, id) => {
    if (product.options.length === 1) return setProduct({ ...product, options: productOptionsInit })

    const updatedOptions = product.options.filter(option => option.optionId !== id)
    setProduct({ ...product, options: updatedOptions })
  }

  const handleOptionTypeChange = (e, optionId) => {
    setProduct(prevProduct => {
      const updatedOptions = prevProduct.options.map(opt => {
        if (opt.optionId === optionId) {
          if (e.target.value === 1) {
            return {
              ...opt,
              optionType: e.target.value,
              optionValue: [{ valueId: 1, valueName: '' }]
            }
          } else {
            return { ...opt, optionType: e.target.value }
          }
        }

        return opt
      })

      return { ...prevProduct, options: updatedOptions }
    })
  }

  // ** change product option name
  const handleSubOptionChange = (e, optionId, valueId) => {
    setProduct(prevProduct => ({
      ...prevProduct,
      options: prevProduct.options.map(opt => {
        if (opt.optionId === optionId) {
          return {
            ...opt,
            optionValue: opt.optionValue.map(val => {
              if (val.valueId === valueId) {
                return {
                  ...val,
                  valueName: e.target.value
                }
              }

              return val
            })
          }
        }

        return opt
      })
    }))
  }

  // ** add product option value
  const handleAddOptionValue = e => {
    const optionValueIds = product.options[product.options.length - 1].optionValue.map(value => value.valueId)
    const maxId = Math.max(...optionValueIds)

    const newOptionValue = { valueId: maxId + 1, valueName: '' }

    const updatedOptions = product.options.map(option => {
      if (option.optionId === product.options[product.options.length - 1].optionId) {
        return { ...option, optionValue: [...option.optionValue, newOptionValue] }
      } else {
        return option
      }
    })

    setProduct({ ...product, options: updatedOptions })
  }

  // ** delete product option value
  const handleDeleteOptionValue = (e, optionId, valueId) => {
    if (product.options[product.options.length - 1].optionValue.length === 1)
      return setProduct(product =>
        product.options.map(option =>
          option.optionId === optionId ? { ...option, optionValue: [{ valueId: 1, valueName: '' }] } : option
        )
      )

    const updatedOptions = product.options.map(option => {
      if (option.optionId === optionId) {
        return { ...option, optionValue: option.optionValue.filter(value => value.valueId !== valueId) }
      } else {
        return option
      }
    })

    setProduct({ ...product, options: updatedOptions })
  }

  const handleAddOptionGroup = e => {
    const optionGroupIds = product.items.map(optionGroup => optionGroup.optionGroupId)
    const maxId = Math.max(...optionGroupIds)

    const newOptionGroup = { ...productOptionGroupsInit, optionGroupId: maxId + 1 }
    setProduct({ ...product, items: [...product.items, newOptionGroup] })
  }

  const handleDeleteOptionGroup = (e, id) => {
    if (product.items.length === 1) return setProduct({ ...product, items: [productOptionGroupsInit] })
    const updatedOptionGroups = product.items.filter(optionGroup => optionGroup.optionGroupId !== id)
    setProduct({ ...product, items: updatedOptionGroups })
  }

  const handleProductOptionGroupChange = (e, optionGroupId, col) => {
    const updatedOptionGroups = product.items.map(optionGroup => {
      if (optionGroup.optionGroupId === optionGroupId) {
        return { ...optionGroup, [col]: e.target.value }
      } else {
        return optionGroup
      }
    })
    setProduct({ ...product, items: updatedOptionGroups })
  }

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant='h4'>Register Product</Typography>
        <Typography variant='body1'>กรอกข้อมูลสินค้าที่ต้องการลงทะเบียน</Typography>
      </Box>

      {/* รูปภาพ & วิดิโอ */}
      <Card sx={{ padding: 8, marginBlock: 5 }}>
        <Typography variant='h5'>รูปภาพสินค้า</Typography>
        <Box sx={{ m: 4 }} border={1} borderColor='rgba(0, 0, 0, 0.2)' borderRadius={1}>
          <Grid container spacing={5} sx={{ p: 4 }}>
            <Grid item xs={12} sm={2}>
              <Box sx={{ p: 4 }}>
                <Button
                  sx={{
                    bgcolor: 'rgba(0, 0, 0, 0.01)',
                    height: '100%',
                    width: '100%'
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
                  </div>
                ) : (
                  <Typography variant='body1'>No image selected</Typography>
                )}
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Typography variant='h5'>วิดีโอสินค้า</Typography>
        <Box sx={{ m: 4 }} border={1} borderColor='rgba(0, 0, 0, 0.2)' borderRadius={1}>
          <Grid container spacing={5} sx={{ p: 4 }}>
            <Grid item xs={12} sm={2}>
              <Box sx={{ mt: 4 }}>
                <Button
                  sx={{
                    bgcolor: 'rgba(0, 0, 0, 0.01)'
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
                value={product.product_name}
                onChange={e => setProduct({ ...product, product_name: e.target.value })}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography>หมวดหมู่</Typography>
              <Select fullWidth defaultValue='' id='grouped-select' label='Grouping'>
                {productCategories.map(category => (
                  <MenuItem key={category.category_id} value={1}>
                    {category.category_name}
                  </MenuItem>
                ))}
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
              <Typography>ปริมาณ</Typography>
              <TextField fullWidth id='product-brand' variant='outlined' />
            </Grid>
          </Grid>
        </Box>
      </Card>

      {/* ตัวเลือกสินค้า */}
      <Card sx={{ marginBlock: 5, width: '100%' }}>
        <CardContent>
          <Box sx={{ mb: 4, pb: 2 }}>
            <Typography variant='h5'>เพิ่มตัวเลือกสินค้า</Typography>
            <Typography variant='body1'>หัวข้อตัวเลือกที่ต้องการ</Typography>
          </Box>
          {product.options.map((option, index) => (
            <Grid
              container
              key={option.optionId}
              border={1}
              borderColor='rgba(0, 0, 0, 0.2)'
              borderRadius={1}
              sx={{ p: 4, marginBlock: 4 }}
            >
              <Grid container spacing={5} alignItems={'flex-end'}>
                <Grid item key={option.optionId} xs={12} sm>
                  <Typography>ตัวเลือกที่ {index + 1}</Typography>
                  <TextField
                    fullWidth
                    id={`product-name-${option.optionId}`} // Unique ID
                    variant='outlined'
                    error={option.optionValidation === 1}
                    value={option.optionName}
                    onChange={e => {
                      const updatedOptions = product.options.map(opt =>
                        opt.optionId === option.optionId
                          ? { ...opt, optionName: e.target.value, optionValidation: 0 }
                          : opt
                      )

                      setProduct({ ...product, options: updatedOptions })
                    }}
                  />
                </Grid>
                <Grid item key={option.optionId} xs={12} sm>
                  <Typography>แบบกรอกข้อมูล หรือ แบบเลือก</Typography>
                  <Select
                    fullWidth
                    labelId='demo-simple-select-label'
                    id='demo-simple-select'
                    defaultValue={0}
                    value={option.optionType}
                    onChange={e => handleOptionTypeChange(e, option.optionId)}
                  >
                    <MenuItem value={1}>กรอกเอง</MenuItem>
                    <MenuItem value={2}>เลือก</MenuItem>
                  </Select>
                </Grid>

                <Grid item xs={12} sm={1} alignSelf={'flex-end'}>
                  <Button
                    fullWidth
                    variant='contained'
                    sx={{ height: 55, bgcolor: 'red' }}
                    onClick={e => handleDeleteOption(e, option.optionId)}
                  >
                    <DeleteIcon />
                  </Button>
                </Grid>

                <Grid item xs={12}>
                  {option.optionType === 2 && (
                    <Grid container spacing={5} alignItems={'flex-end'}>
                      {option.optionValue.map((value, index) => (
                        <Grid container spacing={5} alignItems={'flex-end'} key={value.valueId} sx={{ m: 0 }}>
                          <Grid item xs={12} sm={10}>
                            <Typography>ตัวเลือกย่อยที่ {index + 1}</Typography>
                            <TextField
                              fullWidth
                              id={`product-option-name-${option.optionId}-${value.valueId}`} // Unique ID
                              variant='outlined'
                              value={value.valueName}
                              onChange={e => handleSubOptionChange(e, option.optionId, value.valueId)}
                            />
                          </Grid>
                          <Grid item xs sm={2}>
                            <Button
                              fullWidth
                              variant='contained'
                              sx={{ height: 55, bgcolor: 'blue' }}
                              onClick={e => handleDeleteOptionValue(e, option.optionId, value.valueId)}
                            >
                              <DeleteIcon />
                            </Button>
                          </Grid>
                        </Grid>
                      ))}
                      {product && product.options && product.options.length < 5 ? (
                        <Grid item xs>
                          <Button fullWidth variant='contained' sx={{ height: 55 }} onClick={handleAddOptionValue}>
                            +
                          </Button>
                        </Grid>
                      ) : (
                        <Grid item xs={12} sm={12}></Grid>
                      )}
                    </Grid>
                  )}
                </Grid>
              </Grid>
            </Grid>
          ))}

          <Grid container spacing={5}>
            {product && product.options && product.options.length < 5 ? (
              <Grid item xs>
                <Button fullWidth variant='outlined' sx={{ height: 55 }} onClick={e => handleAddOption(e)}>
                  +
                </Button>
              </Grid>
            ) : (
              <Grid item xs></Grid>
            )}
          </Grid>
        </CardContent>
      </Card>

      {/* รายละเอียดสินค้าของแต่ละตัวเลือก */}
      {/* <Card sx={{ padding: 8, marginBlock: 5 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant='h5'>รายละเอียดสินค้าของแต่ละตัวเลือก</Typography>
        </Box>
        {product.items.map((optionGroup, index) => (
          <Box key={optionGroup.optionGroupId}>
            <Typography variant='body1'>สินค้าตัวเลือกที่ {index + 1}</Typography>
            <Box sx={{ my: 4 }} border={1} borderColor='rgba(0, 0, 0, 0.2)' borderRadius={1}>
              <Grid container spacing={5} sx={{ p: 4 }} alignItems={'flex-end'}>
                {product.options.map(
                  (option, index) =>
                    option.optionName.length > 0 && (
                      <Grid item key={option.optionId} xs={12} sm={6}>
                        <Typography>
                          {option.optionName} {index + 1}
                        </Typography>
                        {option.optionType === 1 ? (
                          <TextField
                            fullWidth
                            id={`product-option-group-name-${option.optionId}`}
                            variant='outlined'
                            value={optionGroup[`optionGroupColumn${index + 1}`]}
                            onChange={e =>
                              handleProductOptionGroupChange(
                                e,
                                optionGroup.optionGroupId,
                                `optionGroupColumn${index + 1}`
                              )
                            }
                          />
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

                <Grid item xs sm={7}>
                  <Typography>ราคาสินค้า</Typography>
                  <TextField
                    fullWidth
                    type='number'
                    id={`product-option-group-name-${optionGroup.optionGroupId}`}
                    variant='outlined'
                    value={optionGroup.optionGroupPrice}
                    onChange={e =>
                      setProduct(product =>
                        product.items.map(group =>
                          group.optionGroupId === optionGroup.optionGroupId
                            ? { ...group, optionGroupPrice: e.target.value }
                            : group
                        )
                      )
                    }
                  />
                </Grid>

                <Grid item xs sm={4}>
                  <Typography>จำนวนสินค้า</Typography>
                  <TextField
                    fullWidth
                    type='number'
                    id={`product-option-group-name-${optionGroup.optionGroupId}`}
                    variant='outlined'
                    value={optionGroup.optionGroupQuantity}
                    onChange={e =>
                      setProduct(product =>
                        product.items.map(group =>
                          group.optionGroupId === optionGroup.optionGroupId
                            ? { ...group, optionGroupQuantity: e.target.value }
                            : group
                        )
                      )
                    }
                  />
                </Grid>

                <Grid item xs sm={1} alignSelf={'flex-end'}>
                  <Button
                    fullWidth
                    variant='contained'
                    sx={{ height: 55, bgcolor: 'red' }}
                    onClick={e => handleDeleteOptionGroup(e, optionGroup.optionGroupId)}
                  >
                    <DeleteIcon />
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        ))}

        <Grid container spacing={5}>
          {product.items.length < 5 ? (
            <Grid item xs>
              <Button fullWidth variant='outlined' sx={{ height: 55 }} onClick={handleAddOptionGroup}>
                +
              </Button>
            </Grid>
          ) : (
            <Grid item xs={6}></Grid>
          )}
        </Grid>
      </Card> */}

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

export default RegisterProduct
