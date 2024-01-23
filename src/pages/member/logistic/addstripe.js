import { useState } from 'react'
import { Button, TextField } from '@mui/material'
import { secretkey } from 'src/@core/utils/stripekey/stripekey'
import CheckoutForm from '../checkout/stripe_checkout' // Adjust the import path accordingly

const AddStripe = () => {
  const [products, setProducts] = useState([{ name: '', price: 0 }])
  const [priceKeys, setPriceKeys] = useState([])
  console.log('Product', priceKeys)

  const handleProductChange = (event, index) => {
    const updatedProducts = [...products]
    updatedProducts[index].name = event.target.value
    setProducts(updatedProducts)
  }

  const handlePriceChange = (event, index) => {
    const updatedProducts = [...products]
    updatedProducts[index].price = event.target.value
    setProducts(updatedProducts)
  }

  const handleAddProduct = () => {
    setProducts([...products, { name: '', price: 0 }])
  }

  const handleDeleteProduct = index => {
    const updatedProducts = products.filter((_, i) => i !== index)
    setProducts(updatedProducts)
  }

  const handleUpdatePrices = async () => {
    const stripe = require('stripe')(secretkey)

    try {
      const createdPrices = []
      for (const { name, price } of products) {
        const priceObject = await stripe.prices.create({
          unit_amount: price * 100,
          currency: 'thb',
          product: 'prod_PAlK9xrSW0acxW',
          nickname: name
        })

        createdPrices.push(priceObject.id)
      }

      setPriceKeys(createdPrices)
    } catch (error) {
      console.error('Error creating prices:', error)
    }
  }

  return (
    <div>
      {products.map((product, index) => (
        <div key={index}>
          <TextField
            label={`Product ${index + 1} Name`}
            value={product.name}
            onChange={event => handleProductChange(event, index)}
            variant='outlined'
            margin='normal'
          />
          <TextField
            label={`Product ${index + 1} Price`}
            value={product.price}
            onChange={event => handlePriceChange(event, index)}
            variant='outlined'
            margin='normal'
            type='number'
          />
          <Button variant='contained' color='secondary' onClick={() => handleDeleteProduct(index)}>
            Delete
          </Button>
        </div>
      ))}
      <Button variant='contained' color='primary' onClick={handleAddProduct}>
        Add Product
      </Button>
      <Button variant='contained' color='primary' onClick={handleUpdatePrices}>
        Update Prices
      </Button>
      {/* {priceKeys.map((priceKey, index) => (
        <CheckoutForm key={index} priceKey={priceKey} />
      ))} */}
    </div>
  )
}

export default AddStripe
