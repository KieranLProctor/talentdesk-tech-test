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

Multer - This was added as it is an easy way handling of multipart form data, it also provides disk storage control for setting where files are stored and named.

React Dropzone - This was added as it is an easy to use hook for drag-and-drop input with an easy api and allows easy custom styling, this helps as I then don't need to add in this functionality manually/customise another package heavily. I've also used this in other projects so it's what I'm most familiar with.

ESLint - This was added for project linting - used as it's pretty much the gold stadard.

Vitest - This was added as it is a vite native test runner which means it fits into the project perfectly and doesn't require extra configuring.

React Testing Library + User Event - These we're added as they are (in my opinion) pretty much the standard test stack for a React project and allows for testing of the components from a users perspective easily making the testing more thorough.

Jest DOM - This was added for better code readability, adding DOM matchers which read more naturally so make more sense for a team of devs reading the tests.

Supertest - This was added as it allows for the backend to be running as a test HTTP server which lets you make real requests without having to bind any ports etc - essentially allows you to use the project as it would be but without having to manage a server in the tests.

## Bonus

Add an AI agent method (e.g. a Claude Code skill) to run linting and automatically fix any issues found
