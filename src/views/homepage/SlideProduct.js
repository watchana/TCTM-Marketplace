// ** React Imports
import { React, useEffect, useState } from 'react'
import { Slide } from 'react-slideshow-image' // นำเข้าไลบรารี Slide ที่คุณใช้
import 'react-slideshow-image/dist/styles.css' // Import สไตล์ของไลบรารี Slide

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import ButtonBase from '@mui/material/ButtonBase'
import Typography from '@mui/material/Typography'
import axios from 'axios'

const SlideshowWithProduct = () => {
  // ตัวแปรเก็บค่าข้อมูล Api
  const [slidedata, setSlideData] = useState([]) // ตัวแปรเก็บค่าข้อมูล Slide
  const [isLoading, setIsLoading] = useState(true)

  // ดึงข้อมูลรูปภาพสไลด์ออกมา
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API}TCTM.home_page.market_recommend`)
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
      <Slide autoplay={false}>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <Grid spacing={10} container direction='row' justifyContent='center' alignItems='center'>
            <Slide autoplay={false}>
              {isLoading ? (
                <div>Loading...</div>
              ) : (
                <Grid spacing={10} container direction='row' justifyContent='center' alignItems='center'>
                  {slidedata && slidedata.length > 0 ? (
                    slidedata.map((product, index) => (
                      <Grid item key={index}>
                        <Card sx={{ width: '200px', height: '280px' }}>
                          <ButtonBase sx={{ width: '100%', height: '100%' }}>
                            <img
                              src={`imgStore/${product.sub_image}`}
                              alt={product.sub_name}
                              style={{ width: '100%', height: '70%', objectFit: 'cover' }}
                            />
                          </ButtonBase>
                        </Card>
                      </Grid>
                    ))
                  ) : (
                    <div>No Data</div>
                  )}
                </Grid>
              )}
            </Slide>
          </Grid>
        )}
      </Slide>
    </Box>
  )
}

export default SlideshowWithProduct
