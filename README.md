# TalentDesk Platform Tech Test

## Setup

```
cp .env.example .env
npm i
npm run start-backend
npm run start-frontend
```

## Assignment

We have provided a basic application, where a form submits and the back-end returns what has been submitted.

Make the following changes:

1. Add styling to the form
2. Add selecting a file to the form, this should be stored in a directory in the back-end and the path to the file returned to the front-end on submission. Selecting the file should support drag and drop
3. Add validation to the form
4. Add linting to the application, following AirBnb's linting rules
5. Add front-end and back-end tests to the application

You may add any relevant 3rd party libraries. Please explain why you have chosen them.

### Explanations

TailwindCSS - This was added as I'm most comfortable using this for frontend - it's also fairly standard for new projects.

Multer - For easy handling of multipart form data, also provides disk storage control for setting where files are stored and named.

React Dropzone - Easy to use hook for drag-and-drop input with an easy api and allows easy custom styling.

ESLint - For project linting - used as it's pretty much the gold stadard.

## Bonus

Add an AI agent method (e.g. a Claude Code skill) to run linting and automatically fix any issues found
