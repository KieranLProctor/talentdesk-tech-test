module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  overrides: [
    {
      files: ['frontend/**/*.{js,jsx}'],
      extends: ['airbnb'],
      env: { browser: true, es2022: true },
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
      rules: {
        // Not required with the React 17+ JSX transform
        'react/react-in-jsx-scope': 'off',
        // Airbnb sets assert:'both' (htmlFor + nesting); 'either' is the standard behaviour
        'jsx-a11y/label-has-associated-control': ['error', { assert: 'either' }],
        // react-dropzone's API requires spreading getRootProps/getInputProps — unavoidable
        'react/jsx-props-no-spreading': 'off',
      },
    },
    {
      // Vite config legitimately imports devDependencies; @tailwindcss/vite is unresolvable by the import plugin
      files: ['frontend/*.config.js', 'vitest.config.js'],
      rules: {
        'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
        'import/no-unresolved': 'off',
      },
    },
    {
      files: ['backend/**/*.js'],
      extends: ['airbnb-base'],
      env: { node: true, es2022: true },
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      rules: {
        // __dirname is the standard ESM polyfill — not a private variable
        'no-underscore-dangle': ['error', { allow: ['__dirname', '__filename'] }],
        // Node.js ESM requires explicit .js extensions on relative imports
        'import/extensions': ['error', 'ignorePackages', { js: 'always' }],
      },
    },
  ],
  ignorePatterns: ['node_modules/', 'backend/uploads/'],
};
