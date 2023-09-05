// ** React Imports
import React, { useState, useEffect } from 'react'

// ** MUI Imports
import { Box, Stepper, Step, StepLabel, Button, Typography } from '@mui/material'

// ** axios
import axios from 'axios'

// ** Router
import { useRouter } from 'next/router'

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
  const [activeStep, setActiveStep] = useState(0)
  const [skipped, setSkipped] = useState(new Set())
  const [resultAPIStatus, setResultAPIStatus] = useState('')

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
    image_file_name: '-',
    video_file_name: '-',
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
      }
    } else if (activeStep === 1) {
      console.log('test')
      console.log()

      axios
        .post(`${process.env.NEXT_PUBLIC_API}TCTM.product.postnewproductv2`, product)
        .then(response => {
          const statusCode = response.data.message.StatusCode
          setResultAPIStatus(statusCode)
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
    <>
      <Box sx={{ width: '100%' }}>
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
                <StepLabel optional={isStepOptional(index) ? 'Optional' : null}>{label}</StepLabel>
              </Step>
            )
          })}
        </Stepper>
        {activeStep === steps.length ? (
          <>
            <ShowResultsAPI result={resultAPIStatus} />
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={() => router.push('/market')}>Dashboard</Button>
            </Box>
          </>
        ) : (
          <>
            {activeStep === 0 && (
              <RegisterProduct product={product} setProduct={setProduct} productCategories={productCategories} />
            )}
            {activeStep === 1 && <ShowResults columnsData={product.options} rowsData={product.items} />}
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button color='inherit' disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
                Back
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button size='large' onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </Box>
          </>
        )}
      </Box>
    </>
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

export default AddProductPage
