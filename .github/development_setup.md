# Development Setup

You will need [Node.js](https://nodejs.org/en) **version 20+**, [PNPM](https://pnpm.io/) **version 9+**, [Docker](https://www.docker.com/) **version 20+**, and [docker compose](https://docs.docker.com/compose/) **version 2+**.

After cloning the repo:

- Configure environment variable values ​​in the `.env` file.
- Run the following commands:

  ```sh
  docker compose up # setup the local services
  pnpm i # install the dependencies of the project
  pnpm dev # start the development server
  ```

## Tools used

A high level overview:

- [Nuxt](https://nuxt.com/) as back-end and front-end development framework
- [TypeScript](https://www.typescriptlang.org/) as the development language
- [Nuxt UI](https://ui.nuxt.com/) as components library
- [Tailwind CSS](https://tailwindcss.com/) as CSS utility first framework
- [jsPlumb CE](https://docs.jsplumbtoolkit.com/community/6.x/) as diagramming library
- [TypeORM](https://typeorm.io/) as ORM
- [Vitest](https://vitest.dev/) for unit testing
- [Prettier](https://prettier.io/) for code formatting
- [ESLint](https://eslint.org/) for static error prevention (outside of types)
