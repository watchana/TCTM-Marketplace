import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Grid, Typography } from '@mui/material'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import ScheduleIcon from '@mui/icons-material/Schedule'
import ArchiveRoundedIcon from '@mui/icons-material/ArchiveRounded'

const TrackStatus = ({ TrackNo }) => {
  const [status, setStatus] = useState([])
  const [trackingValue, setTrackingValue] = useState('')

  useEffect(() => {
    setTrackingValue(TrackNo)
  }, [TrackNo])

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
              <Grid container key={index} display={'flex'} justifyContent={'space-between'}>
                <Grid item xs={5} display={'flex'} justifyContent={'flex-start'}>
                  <Grid item>{getIconByStatus(element.status_description)}</Grid>
                  <Grid item ml={1}>
                    <Typography variant='body2'>{element.status_description}</Typography>
                  </Grid>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant='body2'>{element.location}</Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant='body2'>
                    {element.status_date.slice(0, 10)} {element.status_date.slice(11, 16)}
                  </Typography>
                </Grid>
              </Grid>
            ))

            setStatus(statusHtml)
          } else {
            alert('Something went wrong!')
          }
        }
      } catch (error) {
        console.error(error)

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
      return <CheckCircleIcon color='success' />
    }

    switch (statusDescription.toLowerCase()) {
      case 'ถึงที่ทำการไปรษณีย์':
        return <CheckCircleIcon color='success' />
      case 'อยู่ระหว่างการนำจ่าย':
        return <CheckCircleIcon color='success' />
      case 'รับเข้า ณ ศูนย์คัดแยก':
        return <CheckCircleIcon color='success' />
      case 'รับฝาก':
        return <ArchiveRoundedIcon color='error' />
      case 'ออกจากที่ทำการ/ศูนย์ไปรษณีย์':
        return <CheckCircleIcon color='success' />
      default:
        return <LocalShippingIcon color='red' />
    }
  }

  return <div>{status}</div>
}

export default TrackStatus
