import multer from 'multer'
import path from 'path'

export const config = {
  api: {
    bodyParser: false
  }
}

// กำหนดตำแหน่งที่จะเก็บไฟล์
const upload = multer({
  storage: multer.diskStorage({
    destination: './public/PDF_File',
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
})

export default function handler(req, res) {
  if (req.method === 'POST') {
    upload.single('PDF_File')(req, res, function (err) {
      if (err) {
        res.status(500).json({ error: 'Error uploading file.' })

        return
      }

      res.status(200).json({ message: 'File uploaded successfully.' })
    })
  } else {
    res.status(405).json({ error: 'Method Not Allowed' })
  }
}
