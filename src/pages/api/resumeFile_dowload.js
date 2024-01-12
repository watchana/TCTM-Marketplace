import fs from 'fs'
import path from 'path'

export default async function DownloadDocument(req, res) {
  const { fileName } = req.body
  try {
    const filePath = path.join('public', 'PDF_File', fileName)

    // Stream the file as the response
    const fileStream = fs.createReadStream(filePath)

    // Set the appropriate Content-Type header for a PDF
    res.setHeader('Content-Type', 'application/pdf')

    // Pipe the file stream to the response
    fileStream.pipe(res)

    // Handle errors during the streaming
    fileStream.on('error', error => {
      res.status(500).json({ error: 'Error streaming the file' })
    })
  } catch (err) {
    console.error(err) // Log the error for debugging
    res.status(500).json({ error: 'Internal Server Error' })
  }
}
