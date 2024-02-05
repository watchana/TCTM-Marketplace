import { useState } from "react"

// SlideWithColorExtraction component
const SlideWithColorExtraction = ({ imagePath }) => {
  const [backgroundColor, setBackgroundColor] = useState('')

  useEffect(() => {
    const extractColorFromImage = async () => {
      try {
        const image = new Image()
        image.src = imagePath

        image.onload = () => {
          const canvas = document.createElement('canvas')
          canvas.width = image.width
          canvas.height = image.height

          const context = canvas.getContext('2d')
          context.drawImage(image, 0, 0)

          const imageData = context.getImageData(0, 0, canvas.width, canvas.height)
          const pixels = imageData.data

          // Calculate average color
          let red = 0
          let green = 0
          let blue = 0

          for (let i = 0; i < pixels.length; i += 4) {
            red += pixels[i]
            green += pixels[i + 1]
            blue += pixels[i + 2]
          }

          red = Math.floor(red / (pixels.length / 4))
          green = Math.floor(green / (pixels.length / 4))
          blue = Math.floor(blue / (pixels.length / 4))

          const averageColor = `rgb(${red}, ${green}, ${blue})`
          setBackgroundColor(averageColor)
        }
      } catch (error) {
        console.error('Error extracting color:', error)
      }
    }

    extractColorFromImage()
  }, [imagePath])

  return backgroundColor
}

export default SlideWithColorExtraction
