import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'

const StripeSuccess = () => {
  const router = useRouter()
  const [seconds, setSeconds] = useState(2) // Initial countdown time in seconds
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

  useEffect(() => {
    const sendDataToAPI = async () => {
      try {
        for (const item of dataArray) {
          const formattedData = {
            sub_id: item.sub_id,
            invoice_file_name: '12.pdf', // ชื่อไฟล์อาจต้องเป็นตามโครงสร้างของ API
            invoice_id: item.invoice_id
          }

          const response = await axios.post(`${process.env.NEXT_PUBLIC_API}TCTM.invoice.send_proof`, formattedData)

          // Process the response data here
          if (response.status === 200) {
            // Do something with response.data
            // Example: Update UI, state, or perform additional logic
            const responseData = response.data
          }
        }

        // Start the countdown after successful API call
        const timer = setInterval(() => {
          setSeconds(prevSeconds => prevSeconds - 1)
        }, 1000) // Update countdown every 1 second (1000 milliseconds)

        // Redirect when countdown reaches 0
        setTimeout(() => {
          clearInterval(timer) // Stop the interval
          router.push('/member/logistic/') // Replace '/your-new-page' with your desired URL
        }, seconds * 1000) // Redirect after 'seconds' time
      } catch (error) {
        console.error('API Error:', error)
      }
    }

    sendDataToAPI()
  }, [dataArray, router, seconds])

  return (
    <div>
      <p>Redirecting in {seconds} seconds...</p>
      {/* Additional content if needed */}
    </div>
  )
}

export default StripeSuccess
