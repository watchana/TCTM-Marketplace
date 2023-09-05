import fs from 'fs'
import path from 'path'
import { IncomingForm } from 'formidable'

export const config = {
  api: {
    bodyParser: false
  }
}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const form = new IncomingForm()
    form.uploadDir = path.join(process.cwd(), 'public/imgStore')

    form.parse(req, (err, fields, files) => {
      if (err) {
        console.error(err)

        return res.status(500).json({ error: 'Error parsing form data' })
      }

      if (!files.image) {
        return res.status(400).json({ error: 'No image uploaded' })
      }

      const oldPath = files.image[0].filepath
      const newPath = path.join(form.uploadDir, files.image[0].originalFilename)

      fs.rename(oldPath, newPath, renameErr => {
        if (renameErr) {
          console.error(renameErr)

          return res.status(500).json({ error: 'Error moving image to imgStore' })
        }

        return res.status(200).json({ message: 'Image uploaded successfully' })
      })
    })
  } else {
    res.status(405).end() // Method Not Allowed
  }
}
