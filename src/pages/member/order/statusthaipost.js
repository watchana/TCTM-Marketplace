import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Grid, Typography } from '@mui/material'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import ScheduleIcon from '@mui/icons-material/Schedule'
import GetAppIcon from '@mui/icons-material/GetApp'

const TrackStatus = ({ TrackNo }) => {
  const [status, setStatus] = useState([])
  const [trackingValue, setTrackingValue] = useState('')

  useEffect(() => {
    setTrackingValue(TrackNo)
  }, [TrackNo])

  console.log(TrackNo)

  useEffect(() => {
    const handleTracking = async () => {
      try {
        const tokenResponse = await axios.request(
          'https://trackapi.thailandpost.co.th/post/api/v1/authenticate/token',
          {
            headers: {
              Authorization:
                'Token M_SCRNQLEXM6EVWrRdBxZYQWEPHAODWNH&N~M!TPE8MfU-BnSbWOGEDAT_J0CmD@ItN0M@DPUMAvV#D$RRKgLyDBZ-I=YyVXFTQJ', // Replace with your actual token
              'Content-Type': 'application/json'
            }
          }
        )

        const { token } = tokenResponse.data

        if (trackingValue) {
          // Request tracking data
          const data = JSON.stringify({
            status: 'all',
            language: 'TH',
            barcode: [trackingValue]
          })

          const trackingResponse = await axios.post('https://trackapi.thailandpost.co.th/post/api/v1/track', data, {
            headers: {
              Authorization: `Token ${token}`,
              'Content-Type': 'application/json'
            }
          })

          if (trackingResponse.data.message === 'successful') {
            const responseItems = trackingResponse.data.response.items[trackingValue]

            // Render each status item
            const statusHtml = responseItems.map((element, index) => (
              <Grid container key={index}>
                <Grid item xs={0}>
                  {getIconByStatus(element.status_description)}
                </Grid>
                <Grid item xs={5} sm={5} md={6} lg={4}>
                  <Typography>{element.status_description}</Typography>
                </Grid>
                <Grid item xs={3} sm={1} md={4} lg={1}>
                  <Typography>{element.location}</Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={5}>
                  <Typography>{element.status_date.slice(0, 10)}</Typography>
                </Grid>
              </Grid>
            ))

            setStatus(statusHtml)
          } else {
            alert('Something went wrong!')
          }
        }
      } catch (error) {
        console.log(error)

        // alert('Something went wrong!');
      }
    }

    handleTracking()
  }, [trackingValue])

  // Function to get the appropriate icon based on status description
  const getIconByStatus = (statusDescription, isScheduled) => {
    if (isScheduled) {
      // If the status is scheduled, show the ScheduleIcon
      return <ScheduleIcon />
    }

    if (statusDescription.toLowerCase() === 'นำจ่ายสำเร็จ') {
      // If the status is "นำจ่ายสำเร็จ", show the CheckCircleIcon
      return <CheckCircleIcon />
    }

    switch (statusDescription.toLowerCase()) {
      case 'ถึงที่ทำการไปรษณีย์':
        return <CheckCircleIcon />
      case 'อยู่ระหว่างการนำจ่าย':
        return <CheckCircleIcon />
      case 'รับเข้า ณ ศูนย์คัดแยก':
        return <CheckCircleIcon />
      case 'รับฝาก':
        return <GetAppIcon />
      case 'ออกจากที่ทำการ/ศูนย์ไปรษณีย์':
        return <CheckCircleIcon />
      default:
        return <LocalShippingIcon />
    }
  }

  return <div>{status}</div>
}

export default TrackStatus
