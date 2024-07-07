# weatherApp

# Full Stack Weather Application

This is a full-stack weather application built with Node.js, Express, PostgreSQL, Prisma, and React (Vite). It provides user authentication, weather data integration, and features like favorites and historical weather data.

open weathermap and visual crossing APIs are used for weather data integration

## 1 Features

- User registration and authentication using JWT
- Current weather, 5-day forecast, and 5-day historical weather data(since i am using free vertion of open weathermap )
- Favorite cities functionality
- RESTful API endpoints for weather data and user management
- PostgreSQL database with Prisma ORM
- React frontend with Vite for fast development and building

## 2 Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v14 or later)
- npm (v6 or later)
- PostgreSQL (v12 or later)
- Git

## 3 Installation

1. Clone the repository:
   git clone https://github.com/Nikhilmk27/weatherApp.git
   cd weather-app
2. Install backend dependencies:
   cd backend
   npm install
3. Install frontend dependencies:
   cd ../frontend
   npm install

## 4 Configuration

1. Backend configuration:

- coppy the `.env.sample` file to `.env` in the `backend` directory:
- Open the `.env` file and fill in the required environment variables:

DATABASE_URL=`"postgresql://postgres:Nikhil@9526@localhost:5432/wetherApp?schema=public"`
(here in the url replace usename with you postgreSQL username and password with your postgreSQL password 5432 with your port number)

JWT_SECRET="your_jwt_secret"
WEATHER_API_KEY="d743b890d118e5db4ce7017eb32d42f5"
VISUAL_CROSSING_API_KEY = 'TH4MYG4QXDYSEWCD4M44SNW3T'

(note: you only need to change the DATABASE_URL in the .env and copy pase all the data in the .env.sample file in the backend folder)

5. Frontend configuration:
   leave as it is

## 6 Database Setup and Prisma Configuration

After cloning the repository and installing dependencies, you need to set up the database and run Prisma migrations. This process creates the necessary tables in your PostgreSQL database based on the Prisma schema.

1. Ensure your PostgreSQL server is running and you have created a database for this project.

2. Update the `DATABASE_URL` in your `.env` file with the correct credentials:
   DATABASE_URL="postgresql://username:password@localhost:5432/weather_app"

3. Generate Prisma client:
   cd backend
   npx prisma generate
   This command generates the Prisma client based on your schema, which is necessary for database operations in your application.

4. Run database migrations:
   npx prisma migrate deploy

This command will apply all existing migrations to your database, creating the necessary tables based on the Prisma schema.

## Running the Application

1. Start the backend server:
   cd backend
   npm run dev
2. Start the frontend development server:
   cd frontend
   npm run dev

3. Open your browser and navigate to `http://localhost:5173` to access the application.

## API Documentation

API documentation is available in the `apidocs` folder.
