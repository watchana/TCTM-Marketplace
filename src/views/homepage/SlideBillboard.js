import React, { useEffect, useState } from 'react'
import { Slide } from 'react-slideshow-image'
import 'react-slideshow-image/dist/styles.css'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import ButtonBase from '@mui/material/ButtonBase'
import axios from 'axios'

const SlideshowWithCards = () => {
  const [slidedata, setSlideData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API}TCTM.home_page.allbillboards`)
        setSlideData(response.data.message.Data)
        setIsLoading(false)
      } catch (error) {
        console.error(error)
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <Box sx={{ width: '100%' }}>
      {isLoading ? ( // ตรวจสอบสถานะ isLoading เพื่อแสดงรูปโหลดหรือข้อความแสดงการโหลด
        <div>Loading...</div>
      ) : (
        <Slide>
          {slidedata && slidedata.length > 0 ? (
            slidedata.map((billboard, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '300px'
                }}
              >
                <Card sx={{ width: '80%', height: '300px' }}>
                  <ButtonBase sx={{ width: '100%', height: '100%' }}>
                    <img
                      src={`imgBillboard/${billboard.bill_name}`}
                      alt={billboard.bill_name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center'
                      }}
                    />
                  </ButtonBase>
                </Card>
              </Box>
            ))
          ) : (
            <div>No data</div>
          )}
        </Slide>
      )}
    </Box>
  )
}

export default SlideshowWithCards
