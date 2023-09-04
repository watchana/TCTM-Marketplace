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

  const itemInit = {
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
  const handleAddOption = () => {
    const optionIds = product.options.map(option => option.optionId)
    const maxId = Math.max(...optionIds)

    const newOption = { ...productOptionsInit[0], optionId: maxId + 1 }

    setProduct({ ...product, options: [...product.options, newOption] })
  }

  // ** delete product options
  const handleDeleteOption = (e, id) => {
    if (product.options.length === 1) return setProduct({ ...product, options: productOptionsInit })

    const updatedOptions = product.options.filter(option => option.optionId !== id)
    setProduct({ ...product, options: updatedOptions })
  }

  const handleOptionTypeChange = (e, optionId) => {
    const updatedOptions = product.options.map(option => {
      if (option.optionId === optionId) {
        return { ...option, optionType: e.target.value }
      }

      return option
    })

    setProduct({ ...product, options: updatedOptions })
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
                return { ...val, valueName: e.target.value }
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
  const handleAddOptionValue = () => {
    // Extract all valueIds from all options
    const allValueIds = product.options.flatMap(option => option.optionValue.map(value => value.valueId))

    // Calculate the maximum valueId
    const maxId = Math.max(...allValueIds, 0)

    console.log('test: ', maxId)

    // Create a new option value with a unique valueId
    const newOptionValue = { valueId: maxId + 1, valueName: '' }

    // Update the product state by adding the new option value to the last option
    setProduct(prevProduct => {
      const lastOptionIndex = prevProduct.options.length - 1
      const updatedOptions = [...prevProduct.options]
      updatedOptions[lastOptionIndex] = {
        ...prevProduct.options[lastOptionIndex],
        optionValue: [...prevProduct.options[lastOptionIndex].optionValue, newOptionValue]
      }

      return { ...prevProduct, options: updatedOptions }
    })
  }

  // ** delete product option value
  const handleDeleteOptionValue = (e, optionId, valueId) => {
    // Create a function to remove the specified value from an option
    const removeValueFromOption = option => ({
      ...option,
      optionValue: option.optionValue.filter(value => value.valueId !== valueId)
    })

    // Map over the options and remove the value from the specified option
    const updatedOptions = product.options.map(option =>
      option.optionId === optionId ? removeValueFromOption(option) : option
    )

    // Update the product state
    setProduct({ ...product, options: updatedOptions })
  }

  const handleAddOptionGroup = e => {
    const optionGroupIds = product.items.map(optionGroup => optionGroup.optionGroupId)
    const maxId = Math.max(...optionGroupIds)

    const newOptionGroup = { ...itemInit, optionGroupId: maxId + 1 }
    setProduct({ ...product, items: [...product.items, newOptionGroup] })
  }

  const handleDeleteOptionGroup = (e, id) => {
    // Use Array.prototype.filter to remove the option group with the specified id
    const updatedOptionGroups = product.items.filter(optionGroup => optionGroup.optionGroupId !== id)

    // Update the product state
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

  // ** Change product Item price
  const handleItemPriceChange = (e, optionGroupId) => {
    const updatedOptionGroups = product.items.map(optionGroup => {
      if (optionGroup.optionGroupId === optionGroupId) {
        return { ...optionGroup, optionGroupPrice: e.target.value }
      } else {
        return optionGroup
      }
    })
    setProduct({ ...product, items: updatedOptionGroups })
  }

  // ** Change product Item quantity
  const handleItemQuantityChange = (e, optionGroupId) => {
    const updatedOptionGroups = product.items.map(optionGroup => {
      if (optionGroup.optionGroupId === optionGroupId) {
        return { ...optionGroup, optionGroupQuantity: e.target.value }
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
              <Select
                fullWidth
                value={product.product_category}
                onChange={e => setProduct({ ...product, product_category: e.target.value })}
                label='Grouping'
              >
                {productCategories.map(category => (
                  <MenuItem key={category.category_id} value={category.category_id}>
                    {category.category_name}
                  </MenuItem>
                ))}
              </Select>
            </Grid>

            <Grid item xs={12}>
              <Typography>รายละเอียดสินค้า</Typography>
              <TextField
                fullWidth
                id='product-detail'
                multiline
                rows={4}
                variant='outlined'
                value={product.product_description}
                onChange={e => setProduct({ ...product, product_description: e.target.value })}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography>แบรนด์</Typography>
              <TextField
                fullWidth
                id='product-brand'
                variant='outlined'
                value={product.product_brand}
                onChange={e => setProduct({ ...product, product_brand: e.target.value })}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography>น้ำหนัก</Typography>
              <TextField
                fullWidth
                id='product-brand'
                variant='outlined'
                value={product.product_weight}
                onChange={e => setProduct({ ...product, product_weight: e.target.value })}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography>หมายเลขใบอนุญาติ </Typography>
              <TextField
                fullWidth
                id='product-brand'
                variant='outlined'
                value={product.product_license_number}
                onChange={e => setProduct({ ...product, product_license_number: e.target.value })}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography>ประเทศต้นกำเนิดสินค้า</Typography>
              <TextField
                fullWidth
                id='product-brand'
                variant='outlined'
                value={product.product_country}
                onChange={e => setProduct({ ...product, product_country: e.target.value })}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography>ขนาดบรรจุ</Typography>
              <TextField
                fullWidth
                id='product-brand'
                variant='outlined'
                value={product.product_size}
                onChange={e => setProduct({ ...product, product_size: e.target.value })}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography>ปริมาณ</Typography>
              <TextField
                fullWidth
                id='product-brand'
                variant='outlined'
                value={product.product_amount}
                onChange={e => setProduct({ ...product, product_amount: e.target.value })}
              />
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
              key={`option-${option.optionId}`} // ใช้ค่าที่ไม่ซ้ำกันเป็น key
              border={1}
              borderColor='rgba(0, 0, 0, 0.2)'
              borderRadius={1}
              sx={{ p: 4, marginBlock: 4 }}
              spacing={5}
            >
              <Grid item xs={12} sm={8}>
                <Typography>ตัวเลือกที่ {index + 1}</Typography>
                <TextField
                  fullWidth
                  id={`product-name-${option.optionId}-${index + 1}`} // Unique ID
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
              <Grid item key={option.optionId} xs={12} sm={3}>
                <Typography>แบบกรอกข้อมูล หรือ แบบเลือก</Typography>
                <Select
                  fullWidth
                  id={`product-option-type-${option.optionId}-${index + 1}`}
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
                    {option.optionValue.map((value, subIndex) => (
                      <Grid
                        container
                        spacing={5}
                        alignItems={'flex-end'}
                        key={`${value.valueId}-${subIndex}`} // ใช้ค่าที่ไม่ซ้ำกันเป็น key
                        sx={{ m: 0 }}
                      >
                        <Grid item xs={12} sm={11}>
                          <Typography>ตัวเลือกย่อยที่ {subIndex + 1}</Typography>
                          <TextField
                            fullWidth
                            variant='outlined'
                            value={value.valueName}
                            onChange={e => handleSubOptionChange(e, option.optionId, value.valueId)}
                          />
                        </Grid>
                        <Grid item xs sm={1}>
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
                    {product.options.length < 5 ? (
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
          ))}

          <Grid container spacing={5}>
            {product.options.length < 5 ? (
              <Grid item xs>
                <Button fullWidth variant='outlined' sx={{ height: 55 }} onClick={handleAddOption}>
                  +
                </Button>
              </Grid>
            ) : (
              <Grid item xs></Grid>
            )}
          </Grid>
        </CardContent>
      </Card>

      {/*  รายละเอียดสินค้าของแต่ละตัวเลือก */}
      <Card sx={{ padding: 8, marginBlock: 5 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant='h5'>รายละเอียดสินค้าของแต่ละตัวเลือก</Typography>
        </Box>
        {product.items.map((group, index) => (
          <Box key={`group-${group.optionGroupId}`}>
            <Typography variant='body1'>สินค้าตัวเลือกที่ {index + 1}</Typography>
            <Box sx={{ my: 4 }} border={1} borderColor='rgba(0, 0, 0, 0.2)' borderRadius={1}>
              <Grid container spacing={5} sx={{ p: 4 }} alignItems={'flex-end'}>
                {product.options.map((option, index) => (
                  <Grid item key={option.optionId} xs={12} sm={6}>
                    <Typography>
                      {option.optionName} {index + 1}
                    </Typography>
                    {option.optionType === 1 ? (
                      <TextField
                        fullWidth
                        id={`product-item-group-column-text-${option.optionId}`}
                        variant='outlined'
                        value={group[`optionGroupColumn${index + 1}`]}
                        onChange={e =>
                          handleProductOptionGroupChange(e, group.optionGroupId, `optionGroupColumn${index + 1}`)
                        }
                      />
                    ) : (
                      <Select fullWidth id={`product-item-group-column-select-${option.optionId}`}>
                        {option.optionValue.map(value => (
                          <MenuItem key={value.valueId} value={value.valueName}>
                            {value.valueName}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  </Grid>
                ))}

                <Grid item xs sm={7}>
                  <Typography>ราคาสินค้า</Typography>
                  <TextField
                    fullWidth
                    type='number'
                    id={`product-item-group-price-${group.optionGroupId}`} // ราคาสินค้า
                    variant='outlined'
                    value={group.optionGroupPrice}
                    onChange={e => handleItemPriceChange(e, group.optionGroupId)}
                  />
                </Grid>

                <Grid item xs sm={4}>
                  <Typography>จำนวนสินค้า</Typography>
                  <TextField
                    fullWidth
                    type='number'
                    id={`product-item-group-quantity-${group.optionGroupId}`} // จำนวนสินค้า
                    variant='outlined'
                    value={group.optionGroupQuantity}
                    onChange={e => handleItemQuantityChange(e, group.optionGroupId)}
                  />
                </Grid>

                <Grid item xs sm={1} alignSelf={'flex-end'}>
                  <Button
                    fullWidth
                    variant='contained'
                    sx={{ height: 55, bgcolor: 'red' }}
                    onClick={e => handleDeleteOptionGroup(e, group.optionGroupId)}
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

export default RegisterProduct
