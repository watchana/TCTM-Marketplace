import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // เพิ่ม CSS สำหรับ Carousel

function ImageSlider() {
  // รายการของภาพ
  const images = [
    'https://picsum.photos/200/250',
    'https://picsum.photos/200/252',
    'https://picsum.photos/200/249',
    'https://picsum.photos/200/251',
    'https://picsum.photos/200/250',
    'https://picsum.photos/200/248',
    'https://picsum.photos/200/249',
    'https://picsum.photos/200/252',
  ];

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
  };

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
  );
}

export default ImageSlider;
