import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name must be 100 characters or fewer'),
  message: z.string().min(1, 'Message is required').max(1000, 'Message must be 1000 characters or fewer'),
});

function App() {
  const [formData, setFormData] = useState({ name: '', message: '' });
  const [file, setFile] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) setFile(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, multiple: false });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const result = schema.safeParse(formData);
    if (!result.success) {
      const errors = {};
      result.error.issues.forEach((issue) => {
        errors[issue.path[0]] = issue.message;
      });
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});
    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('message', formData.message);
      if (file) data.append('file', file);

      const res = await fetch('/api/submit', { method: 'POST', body: data });
      const json = await res.json();
      setResponse(json);
    } catch (err) {
      setError(err.message);
    }
  };

  const inputClass = (field) => `block w-full rounded-lg border bg-gray-50 px-3.5 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition ${
    fieldErrors[field]
      ? 'border-red-300 focus:ring-red-400'
      : 'border-gray-200 focus:ring-green-500'
  }`;

  const dropzoneClass = () => {
    if (isDragActive) return 'border-green-400 bg-green-50';
    if (file) return 'border-green-300 bg-green-50';
    return 'border-gray-200 bg-gray-50 hover:border-gray-300 hover:bg-gray-100';
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">

        {/* Header */}
        <div className="mb-6 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 mb-4">
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Submit a form</h1>
          <p className="mt-1 text-sm text-gray-500">Fill in your details and attach a file below.</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <form onSubmit={handleSubmit} className="space-y-5" noValidate>

            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="John Doe"
                className={inputClass('name')}
                value={formData.name}
                onChange={handleChange}
              />
              {fieldErrors.name && (
                <p className="mt-1.5 text-xs text-red-500">{fieldErrors.name}</p>
              )}
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1.5">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={3}
                placeholder="Write your message here…"
                className={inputClass('message')}
                value={formData.message}
                onChange={handleChange}
              />
              {fieldErrors.message && (
                <p className="mt-1.5 text-xs text-red-500">{fieldErrors.message}</p>
              )}
            </div>

            {/* File drop zone */}
            <div>
              <p className="block text-sm font-medium text-gray-700 mb-1.5">
                Attachment
                {' '}
                <span className="text-gray-400 font-normal">(optional)</span>
              </p>
              <div
                {...getRootProps()}
                className={`flex flex-col items-center justify-center gap-2 w-full rounded-lg border-2 border-dashed px-4 py-7 cursor-pointer transition-colors ${dropzoneClass()}`}
              >
                <input {...getInputProps()} />
                {file ? (
                  <>
                    <div className="flex items-center justify-center w-9 h-9 rounded-full bg-green-100">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-sm font-medium text-gray-800">{file.name}</p>
                    <p className="text-xs text-gray-400">
                      {(file.size / 1024).toFixed(1)}
                      {' '}
                      KB
                    </p>
                  </>
                ) : (
                  <>
                    <div className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-200">
                      <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                      </svg>
                    </div>
                    <p className="text-sm text-gray-500">
                      {isDragActive ? 'Drop it here…' : 'Drag & drop or click to upload'}
                    </p>
                  </>
                )}
              </div>
              {file && (
                <button
                  type="button"
                  onClick={() => setFile(null)}
                  className="mt-1.5 text-xs text-gray-400 hover:text-red-500 transition-colors"
                >
                  Remove file
                </button>
              )}
            </div>

            {error && (
              <p className="text-sm text-red-500 bg-red-50 border border-red-100 rounded-lg px-3.5 py-2.5">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="w-full rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-700 active:bg-green-800 transition-colors"
            >
              Submit
            </button>
          </form>
        </div>

        {/* Response */}
        {response && (
          <div className="mt-4 bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <h2 className="text-sm font-semibold text-gray-700">Response</h2>
            </div>
            <pre className="text-xs text-gray-600 bg-gray-50 rounded-lg p-3 overflow-auto">
              {JSON.stringify(response, null, 2)}
            </pre>
          </div>
        )}

      </div>
    </div>
  );
}

export default App;
