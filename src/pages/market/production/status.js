import { useState, useEffect } from 'react'
import axios from 'axios'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material'

export default function MyComponent() {
  const [data, setData] = useState([])

  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: 'https://tonen.vsiam.com/api/resource/Work Order/MFG-WO-2023-00008',
    headers: {
      Authorization: 'token 5891d01ccc2961e:0e446b332dc22aa'
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      axios
        .request(config)
        .then(response => {
          setData(response.data.data.operations)
          console.log(response.data.data)
          console.log('operations', response.data.data.planned_end_date)
          console.log('actual_start_date', response.data.data.actual_start_date)
          console.log('planned_end_date', response.data.data.planned_end_date)
        })
        .catch(error => {
          console.log(error)
        })
    }

    fetchData()
  }, [])

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align=''>ID</TableCell>
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
