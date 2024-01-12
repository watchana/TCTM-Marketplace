import { useState, useEffect } from 'react'
import axios from 'axios'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material'

export default function MyComponent() {
    const [data, setData] = useState([])
    const [userId, setUserId] = useState('')
    const [userdata, setUserData] = useState({})

   const fetchData = async () => {
     try {
       const userResponse = await axios.get(`${process.env.NEXT_PUBLIC_API}TCTM.profile.display_profile`, {
         params: {
           member_id: userId
         }
       })
       const user = userResponse.data.message.Data[0]
       setUserData(user)

       const config = {
         method: 'get',
         maxBodyLength: Infinity,
         url: `${user.sup_hostaddress}MFG-WO-2023-00008`,
         headers: {
           Authorization: `token ${user.sup_apikey}:${user.sup_apisecret}`
         }
       }

       const workOrderResponse = await axios.request(config)
       setData(workOrderResponse.data.data.operations)

       console.log('operations', workOrderResponse.data.data.planned_end_date)
       console.log('actual_start_date', workOrderResponse.data.data.actual_start_date)
       console.log('planned_end_date', workOrderResponse.data.data.planned_end_date)
     } catch (error) {
       console.log(error)
     }
   }

   useEffect(() => {
     const userIdFromLocalStorage = localStorage.getItem('Member_Id')
     if (userIdFromLocalStorage) {
       setUserId(userIdFromLocalStorage)
     }
   }, [])

   useEffect(() => {
     if (userId) {
       fetchData() // Initial data fetch

       const intervalId = setInterval(() => {
         fetchData() // Fetch data every 1 minute
       }, 60000) // 1 minute in milliseconds

       return () => clearInterval(intervalId) // Clear the interval on component unmount
     }
   }, [userId])

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align='center'>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Complete Quantity</TableCell>
            <TableCell>Process Loss Quantity</TableCell>
            <TableCell>BOM</TableCell>
            <TableCell>Work Station</TableCell>
            <TableCell>Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{item.operation}</TableCell>
              <TableCell>{item.completed_qty}</TableCell>
              <TableCell>{item.process_loss_qty}</TableCell>
              <TableCell>{item.bom}</TableCell>
              <TableCell>{item.workstation}</TableCell>
              <TableCell>{item.time_in_mins}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
