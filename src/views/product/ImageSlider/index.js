import React from 'react'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

function ImageSlider({ img }) {
  console.log('img', img)

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
      infiniteLoop={true}
      autoPlay={false}
      interval={3000}
      stopOnHover={true}
      responsive={responsive}
    >
      {img ? (
        img.map((item, index) => (
          <div key={index} style={{ height: '100%' }}>
            <img
              src={`/imgTctmProduct/${item.image_file_name}`}
              alt={`Thumbnail ${index + 1}`}
              style={{ maxWidth: '95%', maxHeight: '100%' }}
            />
          </div>
        ))
      ) : (
        <div>No img</div>
      )}
    </Carousel>
  )
}

export default ImageSlider
