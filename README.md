# Blog Application API

A secure RESTful API for a blog application built with NestJS, Prisma, and Firebase Authentication. It supports CRUD operations, role-based access control, and file uploads.

## Features

- **Authentication:** Firebase Authentication for user login.
- **Role-Based Access Control:** Restrict operations based on roles with the help of Firebase Custom Claims.
- **CRUD Operations:** Create, read, update, and delete blog posts.
- **File Upload:** Save post images locally (multipart/form-data).
- **Pagination:** Retrieve paginated posts.

## Setup
#### Prerequisites

- Node.js (v16+)
- PostgreSQL
- Firebase project setup.

#### Instruction to run


1. Install dependencies:

    ```
    npm install
    ```

2. Copy `.env.example` to `.env` and fill the variables.

3. Generate Prisma client and apply database migrations:

    ```
    npm run db:gen
    npm run db:migrate
    ```

4. Run the application

   - Development mode:
      ```
      npm run start:dev
      ```

   - Production mode:

      ```
      npm run build
      npm run start:prod
      ```

## Endpoints

>  `GET /posts` - List all posts (supports pagination).
>
>  `GET /posts/:id` - Retrieve a post by ID.
>
>  `POST /posts` - Create a post (author-only).
>
>  `PUT /posts/:id` - Update a post (author-only).
>
>  `DELETE /posts/:id` - Delete a post (author-only).

## Architecture Decisions

  - **NestJS Framework:** Chosen for its modular structure, built-in support for dependency injection, and ease of scaling.
  - **Prisma ORM:** Selected for its developer-friendly schema definition and integration with TypeScript.
  - **Firebase Authentication:** Utilized Firebase for authentication, ensuring secure and scalable authentication with minimal effort.
  - **Role-Based Access Control:** Leveraged Firebase Custom Claims for role management and used decorators and guards for clean separation of concerns.
  - **File Uploads:** Handled via Multer for its seamless support for multipart/form-data and ease of integration with NestJS.