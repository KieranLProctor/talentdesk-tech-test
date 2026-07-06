import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { mkdirSync } from 'fs';

const uploadsDir = path.join(path.dirname(fileURLToPath(import.meta.url)), '../uploads');
mkdirSync(uploadsDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadsDir),
  filename: (_req, file, cb) => {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage });

const app = express();

app.use(express.json());

app.post('/api/submit', upload.single('file'), (req, res) => {
  const { name, message } = req.body;
  const filePath = req.file ? req.file.path : null;
  res.json({ name, message, filePath });
});

export default app;
