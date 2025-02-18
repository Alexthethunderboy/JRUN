# JRun

JRun is a platform that connects clients with service providers for various tasks such as cleaning, laundry, car wash, and more. This Next.js application allows users to register as either clients or workers, book services, and manage their accounts.

## Features

- User authentication (registration and login)
- Email verification for new users
- Different dashboards for clients and workers
- Service booking system
- Real-time notifications
- Profile management

## Technologies Used

- Next.js 13 (App Router)
- React
- Prisma ORM
- MongoDB
- NextAuth.js
- Tailwind CSS
- Framer Motion
- Lucide React Icons
- Node.js
- Nodemailer

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v14 or later)
- npm or yarn
- MongoDB database

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-username/jrun.git
   cd jrun
   ```

2. Install the dependencies:
   ```
   npm install
   ```
   or
   ```
   yarn install
   ```

3. Set up your environment variables by creating a `.env.local` file in the root directory:
   ```
   DATABASE_URL="your_mongodb_connection_string"
   NEXTAUTH_SECRET="your_nextauth_secret"
   NEXTAUTH_URL="http://localhost:3000"
   GOOGLE_CLIENT_ID="your_google_client_id"
   GOOGLE_CLIENT_SECRET="your_google_client_secret"
   EMAIL_SERVER_HOST="your_smtp_host"
   EMAIL_SERVER_PORT="your_smtp_port"
   EMAIL_SERVER_USER="your_smtp_username"
   EMAIL_SERVER_PASSWORD="your_smtp_password"
   EMAIL_FROM="noreply@yourdomain.com"
   ```

4. Set up the database:
   ```
   npx prisma generate
   npx prisma db push
   ```

## Running the Application

To run the application in development mode:

```
npm run dev
```
or
```
yarn dev
```

The application will be available at `http://localhost:3000`.

## Deployment

To deploy the application to production:

1. Build the application:
   ```
   npm run build
   ```
   or
   ```
   yarn build
   ```

2. Start the production server:
   ```
   npm start
   ```
   or
   ```
   yarn start
   ```

## Project Structure

- `/app`: Contains the Next.js 13 app router pages and API routes
- `/components`: React components used throughout the application
- `/lib`: Utility functions and modules
- `/prisma`: Prisma schema and database configuration
- `/public`: Static assets
- `/styles`: Global styles and Tailwind CSS configuration

## Contributing

Contributions to JRun are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Make your changes and commit them: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Submit a pull request

