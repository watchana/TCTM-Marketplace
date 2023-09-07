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

  const newPath = 'D:/Work T/RealMarketplace/TCTM-Marketplace/public/imgTctmProduct' // กำหนดตำแหน่งที่ต้องการเก็บไฟล์ให้กับ newPath

  form.parse(req, async (err, fields, files) => {
    if (err) {
      res.status(500).json({ error: 'Error parsing form data.' })

      return
    }

    const filepaths = []

    Object.values(files).forEach(fileArray => {
      fileArray.forEach(file => {
        const originalFilename = file.originalFilename
        const newPathWithFilename = path.join(newPath, originalFilename)
        filepaths.push({ oldPath: file.filepath, newPath: newPathWithFilename })
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

          // ลบไฟล์เดิมหลังจากคัดลอกเสร็จสิ้น
          fs.unlink(oldPath, err => {
            if (err) {
              console.error('Error deleting old file.', err)
            }

            if (index === filepaths.length - 1) {
              res.status(200).json({
                message: 'File(s) moved and temporary files deleted successfully.'
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
