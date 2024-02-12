import { IncomingForm } from 'formidable'
import fs from 'fs'
import path from 'path'

export const config = {
  api: {
    bodyParser: false
  }
}

export default async (req, res) => {
  const form = new IncomingForm()

  const newPath = 'public/imageInfor'

  form.parse(req, async (err, fields, files) => {
    if (err) {
      res.status(500).json({ error: 'Error parsing form data.' })

      return
    }

    const filepaths = []

    const uploadedFileNames = [] // New array to store the uploaded file names

    Object.values(files).forEach(fileArray => {
      fileArray.forEach(file => {
        const originalFilename = file.originalFilename

        const date = new Date()
        const options = { timeZone: 'Asia/Bangkok' }
        const timestamp = date.toLocaleString('en-GB', options).replace(/[\/:]/g, '-')
        const newFilename = `${timestamp}_${originalFilename}`

        const newPathWithFilename = path.join(newPath, newFilename)
        filepaths.push({ oldPath: file.filepath, newPath: newPathWithFilename })

        // Store the new filename
        uploadedFileNames.push(newFilename)
      })
    })

    const moveFile = index => {
      if (index < filepaths.length) {
        const { oldPath, newPath } = filepaths[index]
        fs.copyFile(oldPath, newPath, err => {
          if (err) {
            console.error('Error moving file.', err)
            res.status(500).json({ error: 'Error moving file.' })

            return
          }

          fs.unlink(oldPath, err => {
            if (err) {
              console.error('Error deleting old file.', err)
            }

            if (index === filepaths.length - 1) {
              // Send the uploaded file names in the response
              res.status(200).json({
                message: 'File(s) moved and temporary files deleted successfully.',
                uploadedFileNames
              })
            } else {
              moveFile(index + 1)
            }
          })
        })
      }
    }

    moveFile(0)
  })
}
