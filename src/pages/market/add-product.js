// ** React Imports
import React, { useState, useEffect } from 'react'

// ** Next Import
import Link from 'next/link'
import { useRouter } from 'next/router'

// ** Material UI Imports
import {
  Box,
  Breadcrumbs,
  Button,
  Card,
  Container,
  Grid,
  Hidden,
  Step,
  StepLabel,
  Stepper,
  Typography
} from '@mui/material'

// ** Material-UI Icons Imports
import StorefrontIcon from '@mui/icons-material/Storefront'

// ** Material Design Icons Imports
import ChevronRight from 'mdi-material-ui/ChevronRight'

// ** Axios Import
import axios from 'axios'

// ** Auth Check Import
import { withAuth } from 'src/@core/utils/AuthCheck'

// ** Components
import RegisterProduct from 'src/views/supplier/RegisterProduct'
import ShowResults from 'src/views/supplier/ShowResults'
import ShowResultsAPI from 'src/views/supplier/ShowResultsAPI'

// ** Switch Alert Import
const Swal = require('sweetalert2')

const AddProductPage = ({ productCategories }) => {
  const router = useRouter()

  // รับค่า Sub_id
  const { sub_id } = router.query
  const SubId = sub_id

  const steps = ['Register Product', 'Show Results']
  const [activeStep, setActiveStep] = useState(0) // ตัวเก็บค่าก่อนส่ง
  const [skipped, setSkipped] = useState(new Set())
  const [resultAPIStatus, setResultAPIStatus] = useState('')

  // เก็บค่าเซฟรูป
  const [uploadImages, setUploadImages] = useState([])
  const [imagesName, setImagesName] = useState([])

  // เก็บค่าเซฟวิดิโอ
  const [uploadVdo, setUploadVdo] = useState([])

  // จัดการตัวแปรชื่อไฟล์ภาพ
  const handleUploadImagesChange = newImages => {
    setUploadImages(newImages)

    const imageFileNames = newImages.map(image => image.name)

    setProduct(prevProduct => ({
      ...prevProduct,
      image_file_name: imageFileNames
    }))
  }

  // จัดการตัวแปรชื่อไฟล์วิดิโอ
  const handleUploadVdoChange = newVdo => {
    if (newVdo[0].name) {
      setUploadVdo(newVdo)
      setProduct(prevProduct => ({
        ...prevProduct,
        video_file_name: newVdo && newVdo[0] ? newVdo[0].name : ''
      }))
    } else {
      // ถ้า newVdo มีค่าและ newVdo[0] มีค่า และ newVdo[0].name มีค่า
      setProduct(prevProduct => ({
        ...prevProduct,
        video_file_name: ''
      }))
    }
  }

  useEffect(() => {
    const imageNames = uploadImages.map(image => image.name)

    // ตรวจสอบว่าค่า imageNames ไม่เหมือนกับค่าปัจจุบันของ imagesName ก่อนที่จะเรียก setImagesName
    if (JSON.stringify(imageNames) !== JSON.stringify(imagesName)) {
      setImagesName(imageNames)
    }
  }, [uploadImages, imagesName])

  const [product, setProduct] = useState({
    sub_id: SubId,
    product_name: '',
    product_price: '-',
    product_description: '',
    product_count: '-',
    product_category: '',
    product_brand: '',
    product_weight: '',
    product_country: '',
    product_license_number: '',
    product_amount: '',
    product_size: '',
    image_file_name: '',
    video_file_name: '',
    options: [
      {
        optionId: 1,
        optionName: '',
        optionValidation: 0,
        optionType: 1,
        optionValue: [{ valueId: 1, valueName: '' }]
      }
    ],
    items: [
      {
        optionGroupId: 1,
        optionGroupColumn1: '',
        optionGroupColumn2: '',
        optionGroupColumn3: '',
        optionGroupColumn4: '',
        optionGroupColumn5: '',
        optionGroupPrice: '',
        optionGroupQuantity: '',
        optionGroupValidation: 0
      }
    ]
  })

  const isStepOptional = step => {
    return step === 1
  }

  const isStepSkipped = step => {
    return skipped.has(step)
  }

  // Api ฟังชันอัปโหลดรูปภาพ
  const uploadImagesToApi = () => {
    return axios.post(`/api/ProductimgUpload`, uploadImages, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }

  // Api ฟังชันอัปโหลดวิดิโอ
  const uploadVdoToApi = () => {
    return axios.post(`/api/ProductimgUpload`, uploadVdo, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }

  const handleNext = () => {
    let newSkipped = skipped

    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values())
      newSkipped.delete(activeStep)
    } else if (activeStep === 0) {
      let hasOptionError = false
      let optionValidationIndex = null
      let hasOptionGroupError = false

      const newProductOptions = product.options.map(option => {
        if (option.optionName === '') {
          hasOptionError = true

          return { ...option, optionValidation: 1 }
        } else {
          return { ...option, optionValidation: 0 }
        }
      })

      if (hasOptionError) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Please fill in all Option fields!'
        })
      }

      if (hasOptionGroupError) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Please fill in all Option Group fields!'
        })
      }

      if (!hasOptionError && !hasOptionGroupError) {
        setProduct({ ...product, options: newProductOptions })
        setActiveStep(prevActiveStep => prevActiveStep + 1)
        setSkipped(newSkipped)
        setResultAPIStatus(500)
      }
    } else if (activeStep === 1) {
      console.log('test')

      axios
        .post(`${process.env.NEXT_PUBLIC_API}TCTM.product.postnewproductv2`, product)
        .then(response => {
          const statusCode = response.data.message.StatusCode
          setResultAPIStatus(statusCode)

           console.log('ข้อมูลก่อนส่ง', product)

          // เรียกใช้ฟังก์ชัน อัปโหลดไฟล์รูปภาพลงเครื่อง
          uploadImagesToApi()
            .then(response => {
              const statusCode = response.status
              if (statusCode === 200) {
                // อัปโหลดสำเร็จ
                console.log('File uploaded successfully.')
              } else {
                // อัปโหลดไม่สำเร็จ
                console.error('File upload failed.')
              }
            })
            .catch(error => {
              console.error('Error:', error)
            })

          // เรียกใช้ฟังก์ชัน อัปโหลดไฟล์วิดิโอลงเครื่อง
          uploadVdoToApi()
            .then(response => {
              const statusCode = response.status
              if (statusCode === 200) {
                // อัปโหลดสำเร็จ
                console.log('File uploaded successfully.')
              } else {
                // อัปโหลดไม่สำเร็จ
                console.error('File upload failed.')
              }
            })
            .catch(error => {
              console.error('Error:', error)
            })
        })
        .catch(error => {
          console.error('Error:', error)
          setResultAPIStatus(500)
        })

      setActiveStep(prevActiveStep => prevActiveStep + 1)
      setSkipped(newSkipped)
    } else {
      setActiveStep(prevActiveStep => prevActiveStep + 1)
      setSkipped(newSkipped)
    }
  }

  useEffect(() => {
    console.log(product), [product]
  })

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  }

  const handleReset = () => {
    setActiveStep(0)
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Container maxWidth='xl'>
        <Box>
          <Box sx={{ width: '100%' }}>
            <Card
              sx={{
                height: '100px',
                marginBottom: '30px',
                padding: '15px 25px 20px',
                backgroundColor: '#2d2e81',
                border: '1px solid #primary.main'
              }}
            >
              <Grid container alignItems='center'>
                <Grid item xs={12} sm={8} md={8}>
                  <Typography variant='h4' fontSize='21px bold' color='#fff'>
                    Management
                  </Typography>
                  <Breadcrumbs separator={<ChevronRight />} aria-label='breadcrumb' color='#fff'>
                    <Link href='/' passHref>
                      <Typography color='#fff' variant='h6' fontSize='14px'>
                        Home
                      </Typography>
                    </Link>
                    <Link href='/market/' passHref>
                      <Typography color='#fff' variant='h6' fontSize='14px'>
                        Market Management
                      </Typography>
                    </Link>
                    <Typography color='#fff' variant='h6' fontSize='14px'>
                      Create product
                    </Typography>
                  </Breadcrumbs>
                </Grid>
                <Hidden smDown>
                  <Grid item sm={4} md={4} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <StorefrontIcon sx={{ fontSize: 72, color: '#fff' }} />
                  </Grid>
                </Hidden>
              </Grid>
            </Card>
          </Box>
          <Stepper activeStep={activeStep} sx={{ mb: 2 }}>
            {steps.map((label, index) => {
              const stepProps = {}
              const labelProps = {}
              if (isStepOptional(index)) {
                labelProps.optional = true
              }
              if (isStepSkipped(index)) {
                stepProps.completed = false
              }

              return (
                <Step key={label} {...stepProps}>
                  <StepLabel optional={isStepOptional(index) ? '' : null}>{label}</StepLabel>
                </Step>
              )
            })}
          </Stepper>
          {activeStep === steps.length ? (
            <>
              <ShowResultsAPI result={resultAPIStatus} />
              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Box sx={{ flex: '1 1 auto' }} />
                <Button variant='outlined' onClick={() => router.push('/market')}>
                  Dashboard
                </Button>
              </Box>
            </>
          ) : (
            <>
              {activeStep === 0 && (
                <RegisterProduct
                  product={product}
                  setProduct={setProduct}
                  productCategories={productCategories}
                  onUploadImagesChange={handleUploadImagesChange}
                  onUploadVdoChange={handleUploadVdoChange}
                />
              )}
              {activeStep === 1 && <ShowResults columnsData={product.options} rowsData={product.items} />}
              <Box
                sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
              >
                <Button
                  variant='outlined'
                  color='inherit'
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Back
                </Button>
                <Button variant='contained' size='large' onClick={handleNext}>
                  {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Container>
    </Box>
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

export default withAuth(AddProductPage)
