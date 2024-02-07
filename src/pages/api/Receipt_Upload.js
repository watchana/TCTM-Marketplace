import { IncomingForm } from 'formidable'
import mv from 'mv'

export const config = {
  api: {
    bodyParser: false
  }
}

export default async (req, res) => {
  const form = new IncomingForm()

  form.parse(req, (err, fields, files) => {
    if (err) {
      res.status(500).json({ error: 'Error parsing form data.' })

      return
    }

    // ตรวจสอบว่า fields.FileName และ files.file มีค่าหรือไม่
    if (!fields.FileName || !files.file) {
      res.status(400).json({ error: 'Missing FileName or file in form data.' })

      return
    }

    // ตรวจสอบว่า fields.FileName และ files.file เป็นอาร์เรย์และมีองค์ประกอบอย่างน้อยหนึ่งตัว
    if (
      !Array.isArray(fields.FileName) ||
      fields.FileName.length === 0 ||
      !Array.isArray(files.file) ||
      files.file.length === 0
    ) {
      res.status(400).json({ error: 'Invalid format for FileName or file in form data.' })

      return
    }

    const newFilename = fields.FileName[0]
    const oldPath = files.file[0].path // ใช้ 'path' แทน 'filepath'
    const newPath = `public/receipt/${newFilename}`

    mv(oldPath, newPath, function (err) {
      if (err) {
        res.status(500).json({ error: 'Error moving file.' })

        return
      }

      res.status(200).json({ message: 'File moved successfully.' })
    })
  })
}
