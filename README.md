# E-Commerce Platform

## Description

This is a full-stack e-commerce project with a frontend built using Next.js and a backend built using Spring Boot. The project supports both admin and user roles, providing a comprehensive solution for online shopping and management.

## Features

- User registration and authentication
- Admin and user roles with different access levels
- Product management (CRUD operations)
- Order management
- Order processing
- Responsive design

## Project Structure

```
e-commerce/
    .gitattributes
    .gitignore
    .idea/
    .mvn/
    HELP.md
    mvnw
    mvnw.cmd
    pom.xml
    src/
        main/
        test/
    target/
    uploads/
frontend-ecommerce/
    .env.local
    .envexample
    .gitignore
    .next/
    eslint.config.mjs
    next-env.d.ts
    next.config.ts
    package.json
    pnpm-lock.yaml
    postcss.config.mjs
    public/
    README.md
    src/
    tailwind.config.ts
    tsconfig.json
```

## Getting Started

### Backend

1. Navigate to the `e-commerce` directory.
2. Make sure you have Java and Maven installed.
3. Update the database configuration in `src/main/resources/application.properties`.
4. Run the backend server:

```bash
./mvnw spring-boot:run
```

The backend server will be running at [http://localhost:8080](http://localhost:8080).

### Frontend

1. Navigate to the `frontend-ecommerce` directory.
2. Make sure you have Node.js and pnpm installed.
3. Install the dependencies:

```bash
pnpm install
```

4. Run the development server:

```bash
pnpm dev
```

The frontend server will be running at [http://localhost:3000](http://localhost:3000).

## Learn More

To learn more about the technologies used in this project, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Spring Boot Documentation](https://spring.io/projects/spring-boot) - learn about Spring Boot features and API.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## License

This project is licensed under the MIT License.

## Contributing

Feel free to contribute to this project by submitting issues or pull requests.