// ** React Imports
import React, { useEffect, useState } from 'react'

// ** Next Import
import Link from 'next/link'
import { useRouter } from 'next/router'

// ** Material UI Imports
import {
  Button,
  Card,
  CardMedia,
  FormControl,
  Grid,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography
} from '@mui/material'

// ** Axios Import
import axios from 'axios'

// ** Material-UI Icons Imports
import DeleteIcon from '@mui/icons-material/Delete'

// ** Material Design Icons Imports

// ** Auth Check
import { withAuth } from 'src/@core/utils/AuthCheck'
import MySeo from 'src/pages/seo'

// นำเข้าตัวsweetalert2
const Swal = require('sweetalert2')

const EditPo = () => {
  const [productdata, setProductData] = useState({})
  const [img, setImg] = useState([])
  const [options, setOptions] = useState([])

  const [uploadImages, setUploadImages] = useState([])
  const [deleteImages, setDeleteImages] = useState([])
  const [FileteredImages, setFileteredImages] = useState([])
  const [selection, setSelection] = useState('')
  const [modifyselection, setModifySelection] = useState({})
console.log('modifyselection', modifyselection)

  const handleChange = e => {
    setSelection(e.target.value)
  }

  useEffect(() => {
    if (selection) {
      const filteredSelection = selection.map(select => ({ value_id: select.value_id, value_name: select.value_name }))
      const optionsData = { data: filteredSelection }
      setModifySelection(optionsData)

    }
  }, [selection])

  const router = useRouter() // เรียกใช้งาน Router
  const { product_id } = router.query
  const pdi = product_id

  useEffect(() => {
    if (!pdi) {
      return
    }

    const fetchData = async () => {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API}TCTM.product.productdetailv2`, {
        params: {
          product_id: pdi
        }
      })
      setProductData(response.data.message.data[0])
      setImg(response.data.message.images.Result || [])
      setOptions(response.data.message.options)
    }

    fetchData()
  }, [pdi])

  // const remapOption = Object.values(options).map((optionArray, index) =>
  //   optionArray.filter(fil => fil.option_name !== 'Price' && fil.option_name !== 'Quantity')
  // )
  // console.log('remapOption', remapOption)

  // const OptionData = Object.values(options).map((optionArray, index) =>
  //   optionArray.map(option => ({ optid: option.value_id,optv: option.value_name, optn: option.option_name }))
  // )

  // console.log('options', options)
  // console.log('Option1', OptionData)

  //Set product detail
  const [ProductName, setProductName] = useState('')
  const [Category, setCategory] = useState('')
  const [description, setdescription] = useState('')
  const [Brend, setBrend] = useState('')
  const [Weight, setWeight] = useState('')
  const [License, setLicense] = useState('')
  const [Country, setCountry] = useState('')
  const [Size, setSize] = useState('')
  const [Amount, setAmount] = useState('')

  //Set for edit
  const [editProductName, setEditProductName] = useState('')

  const [editDescription, setEditDescription] = useState('')
  const [editWeight, setEditWeight] = useState('')
  const [editLicense, setEditLicense] = useState('')
  const [editSize, setEditSize] = useState('')
  const [editAmount, setEditAmount] = useState('')
  const [editCountry, setEditCountry] = useState('')
  const [editBrend, setEditBrend] = useState('')
  const [editCategory, setEditCategory] = useState('')
  useEffect(() => {
    setProductName(productdata.product_name || '')
    setCategory(productdata.product_category || '')
    setdescription(productdata.product_description || '')
    setBrend(productdata.product_brand || '')
    setWeight(productdata.product_weight || '')
    setLicense(productdata.product_license_number || '')
    setCountry(productdata.product_county || '')
    setSize(productdata.product_size || '')
    setAmount(productdata.product_amount || '')

    setFileteredImages(img || [])

    setEditProductName(ProductName || '')
    setEditCategory(Category || '')
    setEditDescription(description || '')
    setEditBrend(Brend || '')
    setEditWeight(Weight || '')
    setEditLicense(License || '')
    setEditCountry(Country || '')
    setEditSize(Size || '')
    setEditAmount(Amount || '')
  }, [
    productdata.product_name,
    productdata.product_category,
    productdata.product_description,
    productdata.product_brand,
    productdata.product_weight,
    productdata.product_license_number,
    productdata.product_county,
    productdata.product_size,
    productdata.product_amount,
    img,
    ProductName,
    Category,
    description,
    Brend,
    Weight,
    License,
    Country,
    Size,
    Amount
  ])

  //delete img from API
  const onDeleteButtonClick = (id, name) => {
    if (FileteredImages.length + uploadImages.length > 1) {
      Swal.fire({
        title: 'Do you want to Delete ' + name,
        showCancelButton: true,
        confirmButtonText: 'Confirm'
      }).then(result => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          setFileteredImages(FileteredImages.filter(imgItem => imgItem.product_image_id !== id))
          setDeleteImages(prevDeleteImages => [
            ...prevDeleteImages,
            ...FileteredImages.filter(imgItem => imgItem.product_image_id === id)
          ])
        }
      })
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'You must have a minimum of 1 image.'
      })
    }
  }

  //Delete images after changes
  const onDeleteLocalimgClick = (id, name) => {
    if (img.length + uploadImages.length > 1) {
      Swal.fire({
        title: 'Do you want to Delete ' + name,
        showCancelButton: true,
        confirmButtonText: 'Confirm'
      }).then(result => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          // setDeleteImages(uploadImages.filter(imgItem => imgItem.name === id))
          setUploadImages(uploadImages.filter(imgItem => imgItem.name !== id))
        }
      })
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'You must have a minimum of 1 image.'
      })
    }
  }

  //Chang img before upload
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
    }
  }

  //set data detail
  const dataDetail = {
    product_id: pdi,
    product_name: editProductName,
    product_description: editDescription,
    product_brand: editBrend,
    product_weight: editWeight,
    product_license_number: editLicense,
    product_amount: editAmount,
    product_size: editSize
  }

  //disabled Button
  const isDataEmpty =
    (editDescription === description &&
      editBrend === Brend &&
      editWeight === Weight &&
      editLicense === License &&
      editAmount === Amount &&
      editSize === Size &&
      img.length === FileteredImages.length &&
      uploadImages.length === 0) ||
    !editDescription ||
    !editBrend ||
    !editWeight ||
    !editLicense ||
    !editAmount ||
    !editSize

  //Submit function
  const handleSubmit = async event => {
    Swal.fire({
      title: 'Do you want to save?',
      showCancelButton: true,
      confirmButtonText: 'Confirm'
    }).then(async result => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        if (img.length !== FileteredImages.length) {
          try {
            await Promise.all(
              deleteImages.map(async image => {
                const data = {
                  product_image_id: image.product_image_id
                }
                console.log('id', data)
                await axios.put(`${process.env.NEXT_PUBLIC_API}TCTM.product.deleteimgproduct`, data)
              })
            )
          } catch (error) {
            // Handle errors
            console.error('Error deleting image:', error.message, error.response?.status, error.response?.data)
          }
        }
        if (uploadImages && uploadImages.length > 0) {
          const formData = new FormData()

          uploadImages.forEach((file, index) => {
            formData.append(`file${index}`, file.file)
          })
          try {
            const response = await fetch('/api/editproductupload', {
              method: 'POST',
              body: formData
            })

            if (response.ok) {
              const result = await response.json()

              const data = {
                product_id: pdi,
                image_file_name: result.uploadedFileNames
              }

              try {
                const responses = await axios.post(`${process.env.NEXT_PUBLIC_API}TCTM.product.add_imgpro`, data)

                // Handle the responses as needed
                console.log(responses)
              } catch (error) {
                // Handle any errors that occurred during the requests
                console.error('Error fetching image details:', error)
              }

              // Add any additional client-side logic here if needed
            } else {
              console.error('Upload failed:', response.statusText)

              // Handle the error on the client side
            }
          } catch (error) {
            console.error('Error during upload:', error)

            // Handle the error on the client side
          }
        }

        if (Object.values(dataDetail).some(value => value === '')) {
          try {
            const responses = await axios.put(`${process.env.NEXT_PUBLIC_API}TCTM.product.update_product`, dataDetail)

            // Handle the responses as needed
          } catch (error) {
            // Handle any errors that occurred during the requests
            console.error('Error fetching image details:', error)
          }
        }
        window.location.reload()
      }
    })
  }

  return (
    <Card variant='outlined' sx={{ padding: '30px' }}>
      <MySeo title='Edit Product' description='Edit' keywords='Edit product' />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12}>
          <TextField
            fullWidth
            label='Product Name'
            id='Product Name'
            value={editProductName}
            onChange={e => {
              setEditProductName(e.target.value)
            }}
          />
        </Grid>

        <Grid item xs={12} lg={12}>
          <Card
            variant='outlined'
            sx={{
              minHeight: 55,
              display: 'flex',
              justifyContent: 'space-around',
              alignItems: 'center',
              overflowY: 'inherit'
            }}
          >
            {FileteredImages && FileteredImages.length + uploadImages.length > 0 ? (
              <ImageList xs={4}>
                {FileteredImages.map((img, index) => (
                  <ImageListItem key={index} xs={4}>
                    <CardMedia
                      image={`/imgTctmProduct/${img.image_file_name}`}
                      alt={`Image ${index}`}
                      loading='lazy'
                      style={{
                        width: '100px', // กำหนดความกว้าง
                        height: '100px', // กำหนดความสูง
                        margin: 'auto', // จัดตำแหน่งรูปให้อยู่ตรงกลาง
                        display: 'block' // ให้รูปแสดงเป็นบล็อกเพื่อจัดตำแหน่งและขนาด
                      }}
                    />
                    <ImageListItemBar title={img.image_file_name} width={'100px'} />
                    <IconButton
                      aria-label='delete'
                      onClick={() => onDeleteButtonClick(img.product_image_id, img.image_file_name)}
                      sx={{
                        position: 'absolute',
                        top: 5,
                        right: 8,
                        color: 'white',
                        bgcolor: 'rgba(0, 0, 0, 0.5)'
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ImageListItem>
                ))}
                {uploadImages.map((img, index) => (
                  <ImageListItem key={index} xs={4}>
                    <CardMedia
                      image={img.url}
                      alt={`Image ${index}`}
                      loading='lazy'
                      style={{
                        width: '100px', // กำหนดความกว้าง
                        height: '100px', // กำหนดความสูง
                        margin: 'auto', // จัดตำแหน่งรูปให้อยู่ตรงกลาง
                        display: 'block' // ให้รูปแสดงเป็นบล็อกเพื่อจัดตำแหน่งและขนาด
                      }}
                    />
                    <ImageListItemBar title={img.name} width={'100px'} />
                    <IconButton
                      aria-label='delete'
                      onClick={() => onDeleteLocalimgClick(img.name, img.name)}
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
                <Grid item xs={12} lg={12} height={'100px'}>
                  <Button
                    variant='outlined'
                    component='label'
                    fullWidth
                    sx={{ minHeight: 55, backgroundColor: 'white', height: '100px' }}
                  >
                    Upload Image
                    <input type='file' accept='image/*' hidden multiple onChange={handleImageChange} />
                  </Button>
                </Grid>
              </ImageList>
            ) : (
              <Grid container display={'flex'} justifyContent={'space-between'}>
                <Grid item xs={10} align={'center'} mt={4}>
                  <Typography variant='body1'>Upload 250*250 Pixels image</Typography>
                </Grid>
                <Grid item xs={2} align={'right'}>
                  <Button variant='outlined' component='label' sx={{ minHeight: 55, backgroundColor: 'white' }}>
                    Upload Image
                    <input type='file' accept='image/*' hidden multiple onChange={handleImageChange} />
                  </Button>
                </Grid>
              </Grid>
            )}
          </Card>
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            fullWidth
            label='Product Description'
            id='product-detail'
            multiline
            rows={4}
            variant='outlined'
            value={editDescription}
            onChange={e => {
              setEditDescription(e.target.value)
            }}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label='Brand'
            id='Brand'
            variant='outlined'
            value={editBrend}
            onChange={e => {
              setEditBrend(e.target.value)
            }}
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label='Weight'
            id='Weight'
            variant='outlined'
            value={editWeight}
            onChange={e => {
              setEditWeight(e.target.value)
            }}
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label='License'
            id='License'
            variant='outlined'
            value={editLicense}
            onChange={e => {
              setEditLicense(e.target.value)
            }}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label='Size'
            id='Size'
            variant='outlined'
            value={editSize}
            onChange={e => {
              setEditSize(e.target.value)
            }}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label='Amount'
            id='Amount'
            variant='outlined'
            value={editAmount}
            onChange={e => {
              setEditAmount(e.target.value)
            }}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl sx={{ width: '100%' }}>
            <InputLabel id='label'>Option</InputLabel>
            <Select id='select' value={selection} label='Select' onChange={handleChange}>
              {Object.values(options).map((optionArray, index) => (
                <MenuItem key={index} value={optionArray}>
                  {optionArray.length === 0 ? (
                    <MenuItem disabled>No information</MenuItem>
                  ) : (
                    optionArray.map((option, subIndex) => (
                      <span key={subIndex}>
                        {option.option_name !== 'Price' && option.option_name !== 'Quantity' && (
                          <React.Fragment>
                            {`${option.option_name} ${option.value_name}`}
                            {optionArray.length - 1 === subIndex ? '' : ' | '}
                          </React.Fragment>
                        )}
                      </span>
                    ))
                  )}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>{selection&&selection.length > 0 ?<></>:null}
        <Grid item xs={12} sm={12} align={'center'}>
          <Button fullWidth variant='contained' onClick={handleSubmit} disabled={isDataEmpty}>
            Save
          </Button>
        </Grid>
      </Grid>
    </Card>
  )
}

export default withAuth(EditPo)
