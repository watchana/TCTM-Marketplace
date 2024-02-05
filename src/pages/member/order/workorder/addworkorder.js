import { Box } from '@mui/material'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const CheckNpost = () => {
  const router = useRouter()
  const { invoice_id } = router.query
  const [data, setData] = useState([])
  const [userId, setUserId] = useState('')
  const [workMyapi, setWorkMyapi] = useState([])
  const [matchingData, setMatchingData] = useState([])
  const [combinedData, setCombinedData] = useState([])

  const modifyData = data.map(item => ({
    wod_name: item.operation,
    wod_ordet_id: item.name,
    wod_complete_quantity: item.completed_qty,
    wod_loss_quantity: item.process_loss_qty,
    wod_bom: item.bom,
    wod_work_station: item.workstation,
    wod_time: item.time_in_mins
  }))

  useEffect(() => {
    const fetchData = async () => {
      try {
        const invoiceResponse = await axios.get(`${process.env.NEXT_PUBLIC_API}TCTM.invoice.invoice_detail`, {
          params: {
            invoice_id: invoice_id
          }
        })
        const invoiceData = invoiceResponse.data.message.Data[0]

        const userIdFromLocalStorage = localStorage.getItem('Member_Id')
        if (userIdFromLocalStorage) {
          setUserId(userIdFromLocalStorage)

          const userResponse = await axios.get(`${process.env.NEXT_PUBLIC_API}TCTM.profile.display_profile`, {
            params: {
              member_id: userIdFromLocalStorage
            }
          })

          const user = userResponse.data.message.Data[0]

          const config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: user.sup_hostaddress + invoiceData.process_status,
            headers: {
              Authorization: `token ${user.sup_apikey}:${user.sup_apisecret}`
            }
          }

          const workOrderResponse = await axios.request(config)
          setData(workOrderResponse.data.data.operations)
        }
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()

    const intervalId = setInterval(() => {
      fetchData()
    }, 60000)

    return () => clearInterval(intervalId)
  }, [userId, invoice_id])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API}TCTM.workorder.get_work_order`, {
          params: {
            invoice_id: invoice_id
          }
        })
        setWorkMyapi(response.data.message.work_order_data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [invoice_id])

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (workMyapi.length > 0 && modifyData.length > 0) {
          const matching = modifyData.filter(modifyDataItem =>
            workMyapi.some(workMyapiItem => workMyapiItem.wod_ordet_id === modifyDataItem.wod_ordet_id)
          )

          setMatchingData(matching)

          const combined = modifyData.filter(
            modifyDataItem =>
              !workMyapi.some(workMyapiItem => workMyapiItem.wod_ordet_id === modifyDataItem.wod_ordet_id)
          )

          setCombinedData(combined.map(item => ({ ...item, invoice_id: invoice_id })))
        }
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [workMyapi, modifyData, invoice_id])

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (matchingData.length > 0) {
          const requests = matchingData.map(item =>
            axios.post(`${process.env.NEXT_PUBLIC_API}TCTM.workorder.update_workorder`, item)
          )

          await Promise.all(requests)
        }
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [matchingData])

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (combinedData.length > 0) {
          const requests = combinedData.map(item =>
            axios.post(`${process.env.NEXT_PUBLIC_API}TCTM.workorder.addworkorder`, item)
          )

          await Promise.all(requests)
        }
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [combinedData])

  return <Box></Box>
}

export default CheckNpost
