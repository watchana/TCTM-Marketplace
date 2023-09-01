// ** React Imports
import { React, useEffect, useState } from 'react'
import { Slide } from 'react-slideshow-image' // นำเข้าไลบรารี Slide ที่คุณใช้
import 'react-slideshow-image/dist/styles.css' // Import สไตล์ของไลบรารี Slide

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import ButtonBase from '@mui/material/ButtonBase'
import Typography from '@mui/material/Typography'
import CardActionArea from '@mui/material/CardActionArea'
import axios from 'axios'

const SlideRecommended = () => {
  // ตัวแปรเก็บค่าข้อมูล Api
  const [slidedata, setSlideData] = useState([]) // ตัวแปรเก็บค่าข้อมูล Slide

  // เซตตัวแปร Loading
  const [isLoading, setIsLoading] = useState(true)

  // ดึงข้อมูลรูปภาพสไลด์ออกมา
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API}TCTM.home_page.product_recommend`)
        setSlideData(response.data.message.Data)
        setIsLoading(false)
      } catch (error) {
        console.error(error)
        setIsLoading(false)
      }
    }

    if (isLoading) {
      fetchData()
    }
  }, [isLoading])

  // หากข้อมูลไม่มาให้ทำการโหลดข้อมูลใหม่
  useEffect(() => {
    if (!isLoading && (!slidedata || slidedata.length === 0)) {
      setIsLoading(true)
    }
  }, [isLoading, slidedata])

  return (
    <Box sx={{ width: '100%' }}>
      {isLoading ? (
        <div>Loading...</div>
      ) : slidedata && slidedata.length > 0 ? (
        <Slide autoplay={false}>
          <Grid spacing={10} container direction='row' justifyContent='center' alignItems='center'>
            {slidedata.map((product, index) => (
              <Grid item key={index}>
                <Card>
                  <ButtonBase sx={{ width: '200px', height: '280px' }}>
                    <Box sx={{ width: '100%', height: '100%' }}>
                      <CardActionArea>
                        <CardMedia
                          component='img'
                          image={`imgTctmProduct/${product.image_file_name}`}
                          height='200px'
                          sx={{ bgcolor: '#333', borderRadius: '6px' }}
                        />
                        <Box sx={{ width: '100%', padding: '10px' }}>
                          <Typography
                            variant='h6'
                            sx={{
                              fontWeight: 600,
                              overflow: 'hidden',
                              whiteSpace: 'nowrap',
                              textOverflow: 'ellipsis'
                            }}
                          >
                            {product.product_name}
                          </Typography>
                        </Box>
                        <Box sx={{ width: '100%' }}>
                          <Typography
                            variant='h6'
                            sx={{
                              fontWeight: 500,
                              overflow: 'hidden',
                              whiteSpace: 'nowrap',
                              textOverflow: 'ellipsis'
                            }}
                          >
                            ${product.product_price}
                          </Typography>
                        </Box>
                      </CardActionArea>
                    </Box>
                  </ButtonBase>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Slide>
      ) : (
        <div>No data available</div> // ถ้า slidedata ไม่มีค่าหรือไม่มีข้อมูลในอาร์เรย์
      )}
    </Box>
  )
}

export default SlideRecommended
