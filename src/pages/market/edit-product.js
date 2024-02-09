// ** React Imports
import React, { useState, useEffect } from 'react'

// ** Axios Import
import axios from 'axios'

// ** Auth Check Import
import { withAuth } from 'src/@core/utils/AuthCheck'
import multer from 'multer'
import nextConnect from 'next-connect'
import path from 'path'

const handler = nextConnect()


// ** Switch Alert Import
const Swal = require('sweetalert2')

const EditProduct = ({ productCategories }) => {
const [file, setFile] = useState(null)

const handleFileChange = event => {
  setFile(event.target.files[0])
}

const handleUpload = async () => {
  if (!file) {
    alert('Please select a file.')

    return
  }

  const formData = new FormData()
  formData.append('file', file)

  try {
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData
    })

    if (response.ok) {
      const data = await response.json()
      alert('File uploaded successfully.')
      console.log('File Path:', data.filePath)
    } else {
      console.error('Error uploading file:', response.statusText)
      alert('Error uploading file. Please try again.')
    }
  } catch (error) {
    console.error('Error uploading file:', error)
    alert('Error uploading file. Please try again.')
  }
}

return (
  <div>
    <input type='file' onChange={handleFileChange} />
    <button onClick={handleUpload}>Upload File</button>
  </div>
)
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/')
  },
  filename: function (req, file, cb) {
    const timestamp = Date.now()
    const fileExtension = path.extname(file.originalname)
    const newFilename = `${timestamp}${fileExtension}`
    cb(null, newFilename)
  }
})

const upload = multer({ storage: storage })

handler.use(upload.single('file')).post((req, res) => {
  const { file } = req

  if (!file) {
    return res.status(400).json({ error: 'No file uploaded.' })
  }

  // Optionally, you can do something with the uploaded file here

  const { filename } = file
  const filePath = `/uploads/${filename}`

  res.status(200).json({ success: true, filePath })
})

export default withAuth(EditProduct)
