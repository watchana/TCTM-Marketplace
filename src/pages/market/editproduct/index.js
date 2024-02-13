// ** React Imports
import React, { useEffect, useState } from 'react'

// ** Next Import
import Link from 'next/link'
import { useRouter } from 'next/router'

// ** Material UI Imports
import {
  Avatar,
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardMedia,
  Chip,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Hidden,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  MenuItem,
  TextField,
  Typography
} from '@mui/material'

// ** MUI X Imports
import { DataGrid } from '@mui/x-data-grid'

// ** Axios Import
import axios from 'axios'

// ** Material-UI Icons Imports
import DeleteIcon from '@mui/icons-material/Delete'
import UploadIcon from '@mui/icons-material/Upload'
import FileUploadIcon from '@mui/icons-material/FileUpload'
import MailOutlineIcon from '@mui/icons-material/MailOutline'

// ** Material Design Icons Imports
import ChevronRight from 'mdi-material-ui/ChevronRight'

// ** Auth Check
import { withAuth } from 'src/@core/utils/AuthCheck'

// นำเข้าตัวsweetalert2
const Swal = require('sweetalert2')

const EditPo = ({ productCategories }) => {
  const [productdata, setProductData] = useState({})
  const [uploadImages, setUploadImages] = useState([])
  const [deleteImages, setDeleteImages] = useState([])
  const [FileteredImages, setFileteredImages] = useState([])

  console.log('deleteImages', deleteImages)

  const pdi = 'PDI-115'

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API}TCTM.product.productdetailv2`, {
        params: {
          product_id: pdi
        }
      })
      setProductData(response.data.message.data[0])
      setImg(response.data.message.images.Result || 0)
      setOptions(response.data.message.options)

      // console.log(response.data.message.images)
      console.log(response)
      console.log('message', productdata)
    }

    fetchData()
  }, [])

  const [img, setImg] = useState([])
  const [options, setOptions] = useState([])
  const [ProductName, setProductName] = useState('')
  const [Category, setCategory] = useState('')
  const [description, setdescription] = useState('')
  const [Brend, setBrend] = useState('')
  const [Weight, setWeight] = useState('')
  const [License, setLicense] = useState('')
  const [Country, setCountry] = useState('')
  const [Size, setSize] = useState('')
  const [Amount, setAmount] = useState('')

  // setFileteredImages(img || '')

  console.log('FileteredImages', FileteredImages)

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
    img
  ])

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
          setDeleteImages(FileteredImages.filter(imgItem => imgItem.product_image_id === id))
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

  const handleSubmit = async event => {
    event.preventDefault()

    if (img.length !== FileteredImages.length) {
      try {
        // Use Promise.all to wait for all requests to complete
        const responses = await Promise.all(
          deleteImages.map(async image => {
            const data = {
              product_image_id: image.product_image_id
            }
            console.log('id', data)
            await axios.put(`${process.env.NEXT_PUBLIC_API}TCTM.product.deleteimgproduct`, data)
          })
        )

        // Handle the responses as needed
        console.log(responses)
      } catch (error) {
        // Handle any errors that occurred during the requests
        console.error('Error fetching image details:', error)
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
  }

  return (
    <Card variant='outlined' sx={{ padding: '30px' }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12}>
          <TextField
            value={ProductName}
            onChange={e => {
              setProductName(e.target.value)
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
            {FileteredImages&&FileteredImages.length + uploadImages.length > 0 ? (
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
                    <ImageListItemBar title={img.image_file_name} position='below' />
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

        <Typography>{description}</Typography>
        <Typography>{Brend}</Typography>
        <Typography>{Weight}</Typography>
        <Typography>{License}</Typography>
        <Typography>{Country}</Typography>
        <Typography>{Size}</Typography>
        <Typography>{Amount}</Typography>
        {Object.values(options).map((optionArray, index) => (
          <MenuItem key={index} value={optionArray}>
            {optionArray.length === 0 ? (
              <MenuItem disabled>No information</MenuItem>
            ) : (
              optionArray.map(
                (option, subIndex) =>
                  option.option_name !== 'Price' &&
                  option.option_name !== 'Quantity' && (
                    <span key={subIndex}>
                      {option.option_name} {option.value_name} {optionArray.length - 1 === subIndex ? '' : '|'}
                    </span>
                  )
              )
            )}
          </MenuItem>
        ))}
        <Button sx={{ width: 175 }} variant='contained' onClick={handleSubmit}>
          add to cart
        </Button>
      </Grid>
    </Card>
  )
}

export async function getServerSideProps() {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API}TCTM.product_category.allcategorys`)
    const productCategories = res.data.message.Data

    return {
      props: { productCategories: productCategories }
    }
  } catch (error) {
    console.log(error)

    return {
      props: { productCategories: [] }
    }
  }
}

export default withAuth(EditPo)
