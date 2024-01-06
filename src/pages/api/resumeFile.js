import formidable from 'formidable';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(req, res) {
  const form = new formidable.IncomingForm();

  const uploadDir = path.join(process.cwd(), 'public', 'PDF_File'); // กำหนดโฟลเดอร์ที่จะบันทึกไฟล์

  form.uploadDir = uploadDir;

  form.parse(req, (err, fields, files) => {
    if (err) {
      res.status(500).json({ error: 'Error parsing form data.' });
      return;
    }

    const newFilename = fields.FileName;

    const oldPath = files.file.path;
    const newPath = path.join(uploadDir, newFilename);

    mv(oldPath, newPath, function (err) {
      if (err) {
        res.status(500).json({ error: 'Error moving file.' });
        return;
      }

      res.status(200).json({ message: 'File moved successfully.' });
    });
  });
}
