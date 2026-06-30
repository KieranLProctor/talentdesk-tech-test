import { config } from 'dotenv';
import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { mkdirSync } from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

config({ path: path.join(__dirname, '../../.env') });
const { BACKEND_PORT } = process.env;

const uploadsDir = path.join(__dirname, '../uploads');
mkdirSync(uploadsDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadsDir),
  filename: (_req, file, cb) => {
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${unique}${path.extname(file.originalname)}`);
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

// eslint-disable-next-line no-console
app.listen(BACKEND_PORT, () => console.log(`Server running on port ${BACKEND_PORT}`));
