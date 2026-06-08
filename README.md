# Vehicle Inventory Management System

A full-stack vehicle inventory management app built with Node.js, Express, MongoDB Atlas, Mongoose and React. The application allows a user to create, view, update, and delete vehicle records through a simple web interface.

## Live Application

Deployed application:

https://mongodb-app-akr8.onrender.com/

## GitHub Repository

https://github.com/Joselin229/MONGODB_APP

## Features

- Add new vehicle records
- View all vehicles in the inventory
- Edit existing vehicle records
- Delete vehicle records
- Store data in MongoDB Atlas

## Technology Stack

### Backend

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- CORS
- dotenv

### Frontend

- React
- Vite
- Plain CSS

### Deployment

- Render
- MongoDB Atlas cloud database


## Database Model


Each vehicle contains:

- `vehicleType` - Car, Motorbike, or Van
- `manufacturer` - vehicle manufacturer
- `model` - vehicle model
- `releaseYear` - year of release
- `price` - vehicle price
- `milleage` - vehicle mileage
- `createdAt` and `updatedAt` timestamps


## Environment Variables

Create a `.env` file inside the `Backend` folder for local development:

PORT= your_port_of_choice
MONGODB_URL=your_mongodb_atlas_connection_string


The `.env` file should not be committed to GitHub.

## Running The Project Locally

Clone the repository:

git clone https://github.com/Joselin229/MONGODB_APP.git

After cloning, go into the Backend folder before running any npm commands:

cd MONGODB_APP/Backend

Install backend dependencies:


npm i

Install frontend dependencies:

npm --prefix frontend install

Create the `.env` file in the `Backend` folder and add the required environment variables.

Run the project:


npm run dev

Open the application:

http://localhost:your_port_of_choice

## Production Build

The backend serves the built React frontend from `Backend/frontend/dist`.

Build the frontend:

npm --prefix frontend run build

Start the backend:

npm start


## Security Notes

- The MongoDB connection string is stored in environment variables.
- `.env` is ignored by Git and should not be uploaded.
- The database is hosted on MongoDB Atlas.
- CORS is enabled so the frontend can communicate with the backend.
