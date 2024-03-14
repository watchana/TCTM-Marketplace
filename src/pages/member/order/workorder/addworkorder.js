import axios from 'axios'
import { useEffect, useState } from 'react'

const CheckNpost = ({ invoice_id }) => {
  const [operations, setOperation] = useState([])

  useEffect(() => {
    const API = process.env.NEXT_PUBLIC_API

    const fetchData = async () => {
      if (!invoice_id) {
        // console.error('invoice is undefined ro null')

        return
      }
      // console.log(invoice_id)
      try {
        // Fetch invoice details
        const response = await axios.get(`${API}DIGITAL.invoice.invoice_detail`, {
          params: {
            invoice_id: invoice_id
          }
        })

        const process = response.data.message.Data[0].process_status
        const userIdFromLocalStorage = localStorage.getItem('Member_Id')

        const userResponse = await axios.get(`${API}DIGITAL.profile.display_profile`, {
          params: {
            member_id: userIdFromLocalStorage
          }
        })

        const profile = userResponse.data.message.Data[0]

        if (profile.sup_hostaddress && profile.sup_apikey && profile.sup_apisecret && invoice_id&&process) {
          const ctmres = await axios.get(profile.sup_hostaddress + process, {
            headers: {
              Authorization: `token ${profile.sup_apikey}:${profile.sup_apisecret}`
            }
          })
          setOperation(ctmres.data.data.operations || [])
        }
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [invoice_id])

  const [workMyapi, setWorkMyapi] = useState([])
  useEffect(() => {
    const API = process.env.NEXT_PUBLIC_API

    const fetchData = async () => {
      if (!invoice_id) {
        // console.error('invoice is undefined ro null')

        return
      }
      try {
        // Fetch invoice details
        const response = await axios.get(`${API}DIGITAL.workorder.get_work_order`, {
          params: {
            invoice_id: invoice_id
          }
        })
        setWorkMyapi(response.data.message.work_order_data)

        // setWorkMyapi(response.data.message.work_order_data || [])
        if (response.data.message.statusCode == 200 && operations.length > 0) {
          handleSomeAdd(operations, workMyapi)
        }
        if (response.data.message.statusCode == 404 && operations.length > 0) {
          handleAddAll(operations)
        }
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [invoice_id, operations])

  const handleSomeAdd = async (newopr, oldopr) => {
    const dataToAdd = newopr.filter(newItem => {
      // Check if newItem's wod_ordet_id is not present in oldopr
      return !oldopr.find(oldItem => oldItem.wod_ordet_id === newItem.name)
    })

    if (dataToAdd.length > 0) {
      // Map data to an array of promises
      const requests = dataToAdd.map(item =>
        axios.post(`${process.env.NEXT_PUBLIC_API}DIGITAL.workorder.addworkorder`, {
          invoice_id: invoice_id,
          wod_name: item.operation,
          wod_ordet_id: item.name,
          wod_complete_quantity: item.completed_qty,
          wod_loss_quantity: item.process_loss_qty,
          wod_bom: item.bom,
          wod_work_station: item.workstation,
          wod_time: item.time_in_mins
        })
      )

      // Wait for all requests to complete
      const responses = await Promise.all(requests)
    }

    const matchingData = newopr
      .map(newItem => {
        const matchingOldItem = oldopr.find(oldItem => oldItem.wod_ordet_id === newItem.name)

        if (matchingOldItem) {
          return {
            ...newItem,
            wod_id: matchingOldItem.wod_id
          }
        }

        return null // Return null for items without a match
      })
      .filter(Boolean) // Remove null items

    if (matchingData.length > 0) {
      const requests = matchingData.map(item =>
        axios.post(`${process.env.NEXT_PUBLIC_API}DIGITAL.workorder.update_workorder`, {
          wod_id: item.wod_id,
          wod_name: item.operation,
          wod_ordet_id: item.name,
          wod_complete_quantity: item.completed_qty,
          wod_loss_quantity: item.process_loss_qty,
          wod_bom: item.bom,
          wod_work_station: item.workstation,
          wod_time: item.time_in_mins
        })
      )

      // Wait for all requests to complete
      const responses = await Promise.all(requests)
    }
  }

  const handleAddAll = async combinedData => {
    const data = combinedData.map(item => ({
      invoice_id: invoice_id,
      wod_name: item.operation, // แก้ไขตามข้อมูลจริง
      wod_ordet_id: item.name,
      wod_complete_quantity: item.completed_qty, // แก้ไขตามข้อมูลจริง
      wod_loss_quantity: item.process_loss_qty, // แก้ไขตามข้อมูลจริง
      wod_bom: item.bom, // แก้ไขตามข้อมูลจริง
      wod_work_station: item.workstation, // แก้ไขตามข้อมูลจริง
      wod_time: item.time_in_mins // แก้ไขตามข้อมูลจริง
    }))

    try {
      // Check if combinedData has data before proceeding
      if (data.length > 0) {
        // Map data to an array of promises
        const requests = data.map(item => axios.post(`${process.env.NEXT_PUBLIC_API}DIGITAL.workorder.addworkorder`, item))

        // Wait for all requests to complete
        const responses = await Promise.all(requests)
      }
    } catch (error) {
      console.error(error)
    }
  }

  return ''
}

export default CheckNpost
