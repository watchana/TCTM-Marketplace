import { Box } from '@mui/material'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useState, useMemo } from 'react'

const CheckNpost = invoice_id => {
  const [data, setData] = useState([])
  const [userId, setUserId] = useState('')
  const [workMyapi, setWorkMyapi] = useState([])
  const [workdata, setWorkData] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch invoice details
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API}TCTM.workorder.get_work_order`, {
          params: {
            invoice_id: invoice_id.invoice_id
          }
        })
        setWorkMyapi(response.data.message.work_order_data)
        setWorkData(response.data.message.work_order_data[0].name)
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  }, [workdata, invoice_id, data])

  const modifyData = useMemo(
    () =>
      data.map(item => ({
        wod_name: item.operation,
        wod_ordet_id: item.name,
        wod_complete_quantity: item.completed_qty,
        wod_loss_quantity: item.process_loss_qty,
        wod_bom: item.bom,
        wod_work_station: item.workstation,
        wod_time: item.time_in_mins
      })),
    [data]
  )

  // สร้างตัวแปรสำหรับเก็บข้อมูลที่ตรงกัน
  const matchingData = useMemo(() => {
    const result = []
    if (workMyapi && workMyapi.length > 0) {
      modifyData.forEach(modifyDataItem => {
        const correspondingIndex = workMyapi.findIndex(
          workMyapiItem => workMyapiItem.wod_ordet_id === modifyDataItem.wod_ordet_id
        )

        if (correspondingIndex !== -1) {
          result.push({
            ...modifyDataItem,
            wod_id: workMyapi[correspondingIndex].wod_id
          })
        }
      })
    }

    return result
  }, [modifyData, workMyapi])

  // เขียนทับ modifyData ด้วยข้อมูลจาก modifyworkorder และแยกข้อมูลที่ตรงกัน
  const combinedData = modifyData
    .filter(modifyDataItem => {
      if (workMyapi && workMyapi.length > 0) {
        const correspondingIndex = workMyapi.findIndex(
          workMyapiItem => workMyapiItem.wod_ordet_id === modifyDataItem.wod_ordet_id
        )

        if (correspondingIndex !== -1) {
          matchingData.push({
            ...modifyDataItem,
            wod_id: workMyapi[correspondingIndex].wod_id
          })

          return false // ไม่รวมข้อมูลที่ซ้ำกับ matchingData
        }
      }

      return true // รวมข้อมูลที่ไม่ซ้ำกับ matchingData
    })
    .map(combinedItem => ({
      ...combinedItem,
      invoice_id: invoice_id.invoice_id // เพิ่ม invoice_id ในทุกรายการใน combinedData
    }))

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch invoice details

        const invoiceResponse = await axios.get(`${process.env.NEXT_PUBLIC_API}TCTM.invoice.invoice_detail`, {
          params: {
            invoice_id: invoice_id.invoice_id
          }
        })
        const invoiceData = invoiceResponse.data.message.Data[0]

        // Fetch user profile
        const userIdFromLocalStorage = localStorage.getItem('Member_Id')
        if (userIdFromLocalStorage) {
          setUserId(userIdFromLocalStorage)

          const userResponse = await axios.get(`${process.env.NEXT_PUBLIC_API}TCTM.profile.display_profile`, {
            params: {
              member_id: userIdFromLocalStorage
            }
          })

          const user = userResponse.data.message.Data[0]

          // Fetch work order data
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
      } catch (error) {}
    }
    fetchData() // Initial data fetch

    const intervalId = setInterval(() => {
      fetchData() // Fetch data every 1 minute
    }, 60000) // 1 minute in milliseconds

    return () => clearInterval(intervalId) // Clear the interval on component unmount
  }, [userId, invoice_id])

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Check if combinedData has data before proceeding
        if (matchingData.length > 0) {
          // Map combinedData to an array of promises
          const requests = matchingData.map(item =>
            axios.post(`${process.env.NEXT_PUBLIC_API}TCTM.workorder.update_workorder`, item)
          )

          // Wait for all requests to complete
          const responses = await Promise.all(requests)
        }
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [invoice_id, matchingData])

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Check if combinedData has data before proceeding
        if (combinedData.length > 0) {
          // Map combinedData to an array of promises
          const requests = combinedData.map(item =>
            axios.post(`${process.env.NEXT_PUBLIC_API}TCTM.workorder.addworkorder`, item)
          )

          // Wait for all requests to complete
          const responses = await Promise.all(requests)
        }
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [combinedData, invoice_id])

  return <Box></Box>
}

export default CheckNpost
