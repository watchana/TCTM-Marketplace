import { useState } from 'react'
import { secretkey, publishkey } from 'src/@core/utils/stripekey/stripekey'
import { loadStripe } from '@stripe/stripe-js'
import { Button } from '@mui/material'
import { useRouter } from 'next/router'

// import { stripeSuccess } from './member/order/pay_success'

const CheckoutForm = ({ newProduct, NewPrice }) => {
  const [priceKey, setPriceKey] = useState('')

  const router = useRouter()

  const data = router.query

  const modifiedData = Object.fromEntries(
    Object.entries(data).map(([key, value]) => [key, value.endsWith('=') ? value.slice(0, -1) : value])
  )

  const dataArray = Object.values(modifiedData)
    .map(str => {
      try {
        return JSON.parse(str)
      } catch (error) {
        console.error('Error parsing JSON:', error)

        return null
      }
    })
    .filter(Boolean)

  const supId = dataArray.map(({ sub_id, invoice_id }) => ({ sub_id, invoice_id }))

  const convertArrayToObject = (arr = []) => {
    const obj = {}
    arr.forEach((item, index) => {
      obj[index + 1] = JSON.stringify(item)
    })

    return obj
  }

  const objToEncode = convertArrayToObject(supId)
  const queryString = new URLSearchParams(objToEncode).toString()
  const encodedQueryString = encodeURIComponent(queryString)
  const urlParams = new URLSearchParams(encodedQueryString)
  const decodedQueryString = decodeURIComponent(urlParams)

  console.log('decodedQueryString', decodedQueryString)

  const handleCheckout = async () => {
    if (!newProduct) {
      console.error('Product is missing.')

      return
    }

    if (!NewPrice) {
      console.error('price is missing.')

      return
    }

    const stripe = require('stripe')(process.env.NEXT_PUBLIC_SECRETSTRIPE)

    try {
      const price = await stripe.prices.create({
        unit_amount: NewPrice * 100,
        currency: 'thb',
        product: 'prod_PDnunZLALu4JjW',
        nickname: newProduct
      })

      console.log('Price created:', price.id)
      setPriceKey(String(price.id))

      const stripePromise = loadStripe(process.env.NEXT_PUBLIC_PUBLISHSTRIPE)
      const stripeInstance = await stripePromise

      const result = await stripeInstance.redirectToCheckout({
        lineItems: [{ price: price.id, quantity: 1 }],
        mode: 'payment',
        successUrl: `${window.location.origin}/member/order/pay_success/?${decodedQueryString}`,
        cancelUrl: `${window.location.origin}/member/order/changeorder/?${decodedQueryString}`
      })

      if (result.error) {
        console.error(result.error.message)
      }
    } catch (error) {
      console.error('Error creating price:', error)
    }
  }

  return (
    <Button fullWidth variant='contained' color='primary' onClick={handleCheckout}>
      Checkout
    </Button>
  )
}

export default CheckoutForm
