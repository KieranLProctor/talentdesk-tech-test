import { config } from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
// eslint-disable-next-line import/extensions
import app from './app.js';

config({ path: path.join(path.dirname(fileURLToPath(import.meta.url)), '../../.env') });
// eslint-disable-next-line no-undef
const { BACKEND_PORT } = process.env;

// eslint-disable-next-line no-console
app.listen(BACKEND_PORT, () => console.log(`Server running on port ${BACKEND_PORT}`));
