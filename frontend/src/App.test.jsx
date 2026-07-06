import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  vi, describe, it, expect, beforeEach,
} from 'vitest';
import App from './App';

// eslint-disable-next-line no-undef
global.fetch = vi.fn();

describe('App', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders all form fields and the submit button', () => {
    render(<App />);
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Message')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
  });

  it('shows required errors for both fields when submitting empty', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole('button', { name: 'Submit' }));
    expect(screen.getByText('Name is required')).toBeInTheDocument();
    expect(screen.getByText('Message is required')).toBeInTheDocument();
  });

  it('clears the field error as soon as the user starts typing', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole('button', { name: 'Submit' }));
    expect(screen.getByText('Name is required')).toBeInTheDocument();
    await user.type(screen.getByLabelText('Name'), 'Jane');
    expect(screen.queryByText('Name is required')).not.toBeInTheDocument();
  });

  it('calls fetch and displays the JSON response on successful submit', async () => {
    const user = userEvent.setup();
    // eslint-disable-next-line no-undef
    global.fetch.mockResolvedValueOnce({
      json: async () => ({ name: 'Jane', message: 'Hello', filePath: null }),
    });
    render(<App />);
    await user.type(screen.getByLabelText('Name'), 'Jane');
    await user.type(screen.getByLabelText('Message'), 'Hello');
    await user.click(screen.getByRole('button', { name: 'Submit' }));
    await waitFor(() => {
      expect(screen.getByText(/"name": "Jane"/)).toBeInTheDocument();
    });
    // eslint-disable-next-line no-undef
    expect(global.fetch).toHaveBeenCalledWith('/api/submit', expect.objectContaining({ method: 'POST' }));
  });
});
