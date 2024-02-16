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

const RegisterProduct = ({ product, setProduct, productCategories, onUploadImagesChange, onUploadVdoChange }) => {
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
      const maxSize = 100 * 1024 * 1024 // 100 MB
      if (file.size > maxSize) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'The video size is too large. Please choose a video that is under 100MB.'
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
      if (typeof product.image_file_name === 'string' && product.image_file_name) {
        const currentImageFileNames = product.image_file_name
          .split(', ')
          .filter(fileName => fileName !== deletedImage.name)
        setProduct(prevProduct => ({
          ...prevProduct,
          image_file_name: currentImageFileNames.join(', ')
        }))
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

    // console.log('test: ', maxId)

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
    console.log('col: ', col)

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
      <Card variant='outlined' sx={{ padding: '30px' }}>
        <Grid container spacing={4}>
          {/* ---------- Product Name ---------- */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='Product Name'
              id='product-name'
              onChange={e => setProduct({ ...product, product_name: e.target.value })}
              value={product.product_name}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            {/* ---------- Product Category ---------- */}
            <FormControl fullWidth>
              <InputLabel id='product-category-label'>Product Category</InputLabel>
              <Select
                fullWidth
                value={product.product_category}
                onChange={e => setProduct({ ...product, product_category: e.target.value })}
                label='Product Category'
              >
                {productCategories.map(category => (
                  <MenuItem key={category.category_id} value={category.category_id}>
                    {category.category_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
              </CardContent>
            </Card>
          </Grid>
          {/* ---------- Upload Video ---------- */}
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
          {/* ---------- Product Description ---------- */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label='Product Description'
              id='product-detail'
              multiline
              rows={4}
              variant='outlined'
              value={product.product_description}
              onChange={e => setProduct({ ...product, product_description: e.target.value })}
            />
          </Grid>
          {/* ---------- Product Brand ---------- */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='Brand'
              id='product-brand'
              variant='outlined'
              value={product.product_brand}
              onChange={e => setProduct({ ...product, product_brand: e.target.value })}
            />
          </Grid>
          {/* ---------- Product Weight ---------- */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='Weight'
              id='product-brand'
              variant='outlined'
              value={product.product_weight}
              onChange={e => setProduct({ ...product, product_weight: e.target.value })}
            />
          </Grid>
          {/* ---------- Product License Number ---------- */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='License Number'
              id='product-brand'
              variant='outlined'
              value={product.product_license_number}
              onChange={e => setProduct({ ...product, product_license_number: e.target.value })}
            />
          </Grid>
          {/* ---------- Product country ---------- */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='Product country'
              id='product-brand'
              variant='outlined'
              value={product.product_country}
              onChange={e => setProduct({ ...product, product_country: e.target.value })}
            />
          </Grid>
          {/* ---------- Packing size ---------- */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='Packing size'
              id='product-brand'
              variant='outlined'
              value={product.product_size}
              onChange={e => setProduct({ ...product, product_size: e.target.value })}
            />
          </Grid>
          {/* ---------- Amount ---------- */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='Amount'
              id='product-brand'
              variant='outlined'
              value={product.product_amount}
              onChange={e => setProduct({ ...product, product_amount: e.target.value })}
            />
          </Grid>
        </Grid>
      </Card>

      {/* ========== ตัวเลือกสินค้า ========== */}
      <Card variant='outlined' sx={{ marginTop: 4 }}>
        <CardContent>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6}>
              <Typography variant='h5' fontSize='26px'>
                Add product options
              </Typography>
              <Typography variant='body1' fontSize='16px'>
                Desired topic options
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
                {product.options.length < 5 ? (
                  <Button variant='contained' onClick={handleAddOption}>
                    + Add Option
                  </Button>
                ) : (
                  <Typography variant='h6' fontSize='18px'>
                    Options are full.
                  </Typography>
                )}
              </Box>
            </Grid>
          </Grid>
          {product.options.map((option, index) => (
            <Card
              key={`option-${option.optionId}`} // ใช้ค่าที่ไม่ซ้ำกันเป็น key
              variant='outlined'
              sx={{ width: '100%', marginBlock: 4, paddingBottom: '20px', boxShadow: 7, backgroundColor: '#ebf3fe' }}
            >
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant='h5' fontSize='22px' color='#000'>
                        Option {index + 1}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label={`Option ${index + 1}`}
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
                      sx={{ backgroundColor: '#fff' }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={5}>
                    <FormControl fullWidth>
                      <InputLabel id='product-category-label'>Enter or Select</InputLabel>
                      <Select
                        fullWidth
                        label='Enter or Select'
                        id={`product-option-type-${option.optionId}-${index + 1}`}
                        defaultValue={0}
                        value={option.optionType}
                        onChange={e => handleOptionTypeChange(e, option.optionId)}
                        sx={{ backgroundColor: '#fff', borderRadius: '7px' }}
                      >
                        <MenuItem value={1}>Enter</MenuItem>
                        <MenuItem value={2}>Select</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={1}>
                    <Button
                      fullWidth
                      variant='contained'
                      color='error'
                      sx={{ minHeight: 55 }}
                      onClick={e => handleDeleteOption(e, option.optionId)}
                    >
                      <DeleteIcon />
                    </Button>
                  </Grid>
                </Grid>
                {option.optionType === 2 && (
                  <Grid container spacing={4}>
                    {option.optionValue.map((value, subIndex) => (
                      <>
                        <Grid item xs={12} key={`${value.valueId}-${subIndex}`}>
                          <Box
                            sx={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              marginTop: 4
                            }}
                          >
                            <Typography variant='h5' fontSize='22px' color='#000'>
                              Sub Option {subIndex + 1}
                            </Typography>
                            {product.options.length < 5 ? (
                              <Button variant='contained' onClick={handleAddOptionValue}>
                                + Add Sub Option
                              </Button>
                            ) : (
                              <Typography variant='h6' fontSize='18px'>
                                Sub Options are full.
                              </Typography>
                            )}
                          </Box>
                        </Grid>
                        <Grid item xs={11}>
                          <TextField
                            fullWidth
                            label={`Sub Option ${subIndex + 1}`}
                            variant='outlined'
                            value={value.valueName}
                            onChange={e => handleSubOptionChange(e, option.optionId, value.valueId)}
                            sx={{ backgroundColor: '#fff', borderRadius: '7px' }}
                          />
                        </Grid>
                        <Grid item xs={1}>
                          <Button
                            fullWidth
                            variant='contained'
                            color='error'
                            sx={{ minHeight: 55 }}
                            onClick={e => handleDeleteOptionValue(e, option.optionId, value.valueId)}
                          >
                            <DeleteIcon />
                          </Button>
                        </Grid>
                      </>
                    ))}
                  </Grid>
                )}
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>

      {/*  ========== รายละเอียดสินค้าของแต่ละตัวเลือก ========== */}
      <Card variant='outlined' sx={{ marginY: 4 }}>
        <CardContent>
          {/* ---------- head AND button add option ---------- */}
          <Grid container>
            <Grid item xs={12} sm={6}>
              <Typography variant='h5' fontSize='26px'>
                Product details of each option
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
                {product.items.length < 9999 ? (
                  <Button variant='contained' onClick={handleAddOptionGroup}>
                    + Add Option
                  </Button>
                ) : (
                  <Typography variant='h6' fontSize='18px'>
                    Options are full.
                  </Typography>
                )}
              </Box>
            </Grid>
          </Grid>
          {/* ---------- Comment ---------- */}
          {product.items.map((group, index) => (
            <Card
              variant='outlined'
              key={`group-${group.optionGroupId}`}
              sx={{ marginBlock: 4, padding: 4, backgroundColor: '#ebf3fe', boxShadow: 7 }}
            >
              <Grid container spacing={4}>
                <Grid item xs={12}>
                  <Typography variant='body1' color='#000'>
                    Product option {index + 1}
                  </Typography>
                </Grid>
                {product.options.map((option, index) => (
                  <Grid item xs={12} sm={6} key={option.optionId}>
                    {option.optionType === 1 ? (
                      <TextField
                        fullWidth
                        label={`Product ${index + 1}: ${option.optionName}`}

                        // defaultValue={`${option.optionName} ${index + 1}`}
                        id={`product-item-group-column-text-${option.optionId}`}
                        value={group[`optionGroupColumn${index + 1}`]}
                        onChange={e =>
                          handleProductOptionGroupChange(e, group.optionGroupId, `optionGroupColumn${index + 1}`)
                        }
                        sx={{ backgroundColor: '#fff', borderRadius: '7px' }}
                      />
                    ) : (
                      <FormControl fullWidth>
                        <InputLabel id='product-category-label'>
                          {option.optionName} {index + 1}
                        </InputLabel>
                        <Select
                          fullWidth
                          label={`${option.optionName} ${index + 1}`}
                          id={`product-item-group-column-select-${option.optionId}`}
                          value={group[`optionGroupColumn${index + 1}`]}
                          onChange={e =>
                            handleProductOptionGroupChange(e, group.optionGroupId, `optionGroupColumn${index + 1}`)
                          }
                          sx={{ backgroundColor: '#fff', borderRadius: '7px' }}
                        >
                          {option.optionValue.map(value => (
                            <MenuItem key={value.valueId} value={value.valueName}>
                              {value.valueName}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    )}
                  </Grid>
                ))}
                <Grid item xs={12} sm={3}>
                  <TextField
                    fullWidth
                    label='Price'
                    type='number'
                    id={`product-item-group-price-${group.optionGroupId}`} // ราคาสินค้า
                    variant='outlined'
                    value={group.optionGroupPrice}
                    onChange={e => handleItemPriceChange(e, group.optionGroupId)}
                    sx={{ backgroundColor: '#fff', borderRadius: '7px' }}
                  />
                </Grid>
                <Grid item xs={12} sm={2}>
                  <TextField
                    fullWidth
                    label='Quantity'
                    type='number'
                    id={`product-item-group-quantity-${group.optionGroupId}`} // จำนวนสินค้า
                    variant='outlined'
                    value={group.optionGroupQuantity}
                    onChange={e => handleItemQuantityChange(e, group.optionGroupId)}
                    sx={{ backgroundColor: '#fff', borderRadius: '7px' }}
                  />
                </Grid>
                <Grid item xs={12} sm={1}>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                    <Button
                      variant='contained'
                      color='error'
                      sx={{ height: 55 }}
                      onClick={e => handleDeleteOptionGroup(e, group.optionGroupId)}
                    >
                      <DeleteIcon />
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Card>
          ))}
        </CardContent>
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
