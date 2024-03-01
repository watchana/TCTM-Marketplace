import React, { useState, useEffect } from 'react'

// import swalfire

const FileUpload = () => {
  const [selectedFiles, setSelectedFiles] = useState([])
  const [filePreviews, setFilePreviews] = useState([])
  const [filename, setFileName] = useState([])

  useEffect(() => {
    const updateImagePreviews = async () => {
      const previews = await Promise.all(selectedFiles.map(file => readImage(file)))
      setFilePreviews(previews)
    }

    updateImagePreviews()
  }, [selectedFiles])

  const handleFileChange = event => {
    const files = event.target.files
    const allowedExtensions = ['.png', '.jpg', '.jpeg', '.webp', '.svg']

    const filteredFiles = Array.from(files).filter(file => {
      const fileExtension = file.name.split('.').pop().toLowerCase()

      return allowedExtensions.includes(`.${fileExtension}`)
    })

    setSelectedFiles([...selectedFiles, ...filteredFiles])
  }

  const handleRemoveFile = indexToRemove => {
    const updatedFiles = selectedFiles.filter((_, index) => index !== indexToRemove)
    setSelectedFiles(updatedFiles)
  }

  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      alert('Please select at least one valid image file (PNG, JPG, JPEG, WebP, SVG).')

      return
    }

    const formData = new FormData()

    selectedFiles.forEach((file, index) => {
      formData.append(`file${index}`, file)
      console.log(`file${index}`, file)
    })

    try {
      const response = await fetch('/api/editproductupload', {
        method: 'POST',
        body: formData
      })

      if (response.ok) {
        const result = await response.json()
        setFileName(result.uploadedFileNames)

        // Add any additional client-side logic here if needed
      } else {
        console.error('Upload failed:', response.statusText)

        // Handle the error on the client side
      }
    } catch (error) {
      console.error('Error during upload:', error)

      // Handle the error on the client side
    }

    setSelectedFiles([])
  }

  const readImage = file => {
    return new Promise(resolve => {
      const reader = new FileReader()
      reader.onload = event => {
        resolve(event.target.result)
      }
      reader.readAsDataURL(file)
    })
  }

  return (
    <div>
      <input type='file' multiple onChange={handleFileChange} accept='.png, .jpg, .jpeg, .webp, .svg' />
      <button onClick={handleUpload}>Upload</button>

      {filePreviews.length > 0 && (
        <div>
          <p>Selected Files:</p>
          <ul>
            {filePreviews.map((preview, index) => (
              <li key={index}>
                <img src={preview} alt={`Preview ${index}`} style={{ maxWidth: '100px', maxHeight: '100px' }} />
                {selectedFiles[index] && selectedFiles[index].name}
                <button onClick={() => handleRemoveFile(index)}>Remove</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default FileUpload
