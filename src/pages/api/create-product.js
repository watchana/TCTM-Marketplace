import Stripe from 'stripe'

const stripe = new Stripe(
  'sk_test_51O2Sx1IF1rxVtcpgehNVY1xsdEFfgaFv4yEChMG9jKfgmTuNCtNNxrZVmvqOUxsQXxldfTXscvhhITcH8Lv7uiHF00Czxk9kp4',
  {
    apiVersion: '2020-08-27'
  }
)

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, price, quantity } = req.body

    try {
      const product = await stripe.products.create({
        name,
        description: `Product: ${name}`,
        type: 'good'
      })

      await stripe.prices.create({
        unit_amount: price,
        currency: 'thb',
        product: product.id,
        metadata: {
          quantity
        }
      })

      res.status(200).json({ message: 'สร้างสินค้าใน Stripe สำเร็จ' })
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'เกิดข้อผิดพลาดในการสร้างสินค้าใน Stripe' })
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' })
  }
}
