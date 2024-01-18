import React from 'react'
import { Card, CardContent, Box, Typography, Divider } from '@mui/material'
import { Grid } from 'mdi-material-ui'
import CheckoutForm from '../checkout/stripe_checkout'

const Total = ({ megaProductData, productData }) => {
  // Calculate totalAmount
  const totalAmount = megaProductData.reduce((acc, item) => acc + Number(item.price_total || 0), 0)

  // Find sub_id and invoice_id objects in dataArray
  const subInvoiceObject = productData.find(item => item?.sub_id && item?.invoice_id)

  const allNewProducts = megaProductData.map(item => item.product_name).join(', ')

  console.log('newallNewProducts', allNewProducts)

  return (
    <Card variant='outlined' sx={{ width: '100%', boxShadow: 3, marginBottom: 4 }}>
      {megaProductData.map((item, index) => (
        <CardContent key={index} sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ width: '50%' }}>
            <Box sx={{ width: '100%' }}>
              <Typography
                variant='body1'
                sx={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  whiteSpace: 'normal'
                }}
              >
                Product: {item.product_name || ''}
              </Typography>
            </Box>
            <Box sx={{ width: '100%' }}>
              <Typography
                variant='body1'
                sx={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  whiteSpace: 'normal'
                }}
              >
                Count : {item.product_amount || ''}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ width: '50%', display: 'flex', justifyContent: 'flex-end' }}>
            <Typography
              variant='body1'
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                whiteSpace: 'normal'
              }}
            >
              $ {item.price_total || ''}
            </Typography>
          </Box>
        </CardContent>
      ))}
      {/* แสดงผลรวมของ price_total */}
      <CardContent>
        <Divider />
        <Box sx={{ width: '100%' }}>
          <Typography variant='h6' fontSize='21px' color='#000'>
            Total Amount:
          </Typography>
          <Typography variant='h6' fontSize='21px' color='#000'>
            $ {totalAmount}
          </Typography>
        </Box>
        <CheckoutForm
          newProduct={allNewProducts}
          NewPrice={totalAmount} // Pass totalAmount as NewPrice to CheckoutForm
          SupId={subInvoiceObject?.sub_id} // Pass sub_id from productData to SupId in CheckoutForm
          Invo={subInvoiceObject?.invoice_id} // Pass invoice_id from productData to Invo in CheckoutForm
        />
      </CardContent>
    </Card>
  )
}

export default Total
