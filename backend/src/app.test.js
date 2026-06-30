// @vitest-environment node
import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from './app.js';

describe('POST /api/submit', () => {
  it('returns submitted name and message with null filePath when no file is attached', async () => {
    const res = await request(app)
      .post('/api/submit')
      .field('name', 'Jane')
      .field('message', 'Hello');

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ name: 'Jane', message: 'Hello', filePath: null });
  });

  it('stores an uploaded file and returns its path', async () => {
    const res = await request(app)
      .post('/api/submit')
      .field('name', 'Jane')
      .field('message', 'Hello')
      .attach('file', Buffer.from('test content'), 'test.txt');

    expect(res.status).toBe(200);
    expect(res.body.filePath).toMatch(/uploads/);
    expect(res.body.filePath).toMatch(/\.txt$/);
  });
});
