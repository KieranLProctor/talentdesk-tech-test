import { config } from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
// eslint-disable-next-line import/extensions
import app from './app.js';

config({ path: path.join(path.dirname(fileURLToPath(import.meta.url)), '../../.env') });
const { BACKEND_PORT } = Node.process.env;

// eslint-disable-next-line no-console
app.listen(BACKEND_PORT, () => console.log(`Server running on port ${BACKEND_PORT}`));
