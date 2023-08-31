import React from 'react'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css' // เพิ่ม CSS สำหรับ Carousel

function ImageSlider() {
  // รายการของภาพ
  const images = [
    'https://s3-ap-southeast-1.amazonaws.com/manufacturer-bucket/company-products/product-company-1020-yamazen7.jpg',
    'https://www.2pt3q.com/wp-content/uploads/2022/09/CNC-Machine-%E0%B8%AA%E0%B8%B3%E0%B8%84%E0%B8%B1%E0%B8%8D%E0%B8%AD%E0%B8%A2%E0%B9%88%E0%B8%B2%E0%B8%87%E0%B9%84%E0%B8%A3.png',
    'https://www.2pt3q.com/wp-content/uploads/2022/11/%E0%B9%80%E0%B8%84%E0%B8%A3%E0%B8%B7%E0%B9%88%E0%B8%AD%E0%B8%87%E0%B8%88%E0%B8%B1%E0%B8%81%E0%B8%A3-cnc-%E0%B8%A1%E0%B8%B5%E0%B8%81%E0%B8%B5%E0%B9%88%E0%B8%9B%E0%B8%A3%E0%B8%B0%E0%B9%80%E0%B8%A0%E0%B8%97-%E0%B8%81%E0%B8%B5%E0%B9%88%E0%B9%81%E0%B8%9A%E0%B8%9A.png',
    'https://www.cctgroup.co.th/wp-content/uploads/2022/03/%E0%B9%80%E0%B8%84%E0%B8%A3%E0%B8%B7%E0%B9%88%E0%B8%AD%E0%B8%87-CNC-%E0%B8%84%E0%B8%B7%E0%B8%AD%E0%B8%AD%E0%B8%B0%E0%B9%84%E0%B8%A3-scaled-1.jpg',
    'https://www.mmthailand.com/wp-content/uploads/2018/06/CNC-Machine.jpg',
    'https://www.europeanbusinessreview.com/wp-content/uploads/2021/02/custom-CNC-machining-feature-image-copy.png',
    'https://images-storage.thaiware.site/tips/2022_06/images/2074_220622155045lm_70.png',
    'https://www.diemakersmfg.com/wp-content/uploads/2020/04/fullsizeoutput_4417-1024x683.jpeg'
  ]

  const responsive = {
    0: {
      items: 1
    },
    600: {
      items: 2
    },
    960: {
      items: 3
    }
  }

  return (
    <Carousel
      showArrows={true}
      infiniteLoop={true} // เปิดใช้งานการวนลูป
      autoPlay={true} // เปิดใช้งานการสไลด์อัตโนมัติ
      interval={3000} // ตั้งค่าเวลาที่แต่ละรูปแสดง (หน่วยเป็นมิลลิวินาที)
      stopOnHover={true} // หยุดการสไลด์เมื่อเมาส์อยู่บน Carousel
      responsive={responsive}
    >
      {images.map((imageUrl, index) => (
        <div key={index} style={{ height: '480px' }}>
          <img src={imageUrl} alt={`Thumbnail ${index + 1}`} style={{ maxWidth: '95%', maxHeight: '100%' }} />
        </div>
      ))}
    </Carousel>
  )
}

export default ImageSlider
