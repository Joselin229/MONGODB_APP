# Vehicle Inventory Management System

This is a simple full-stack vehicle inventory app made for the Advanced Database Systems assignment. It lets a user add, view, update, and delete vehicle records.

## Links

Live app:

https://mongodb-app-akr8.onrender.com/

GitHub repo:

https://github.com/Joselin229/MONGODB_APP

## Main Features

- Add vehicle records
- View all vehicle records
- Edit existing vehicle records
- Delete vehicle records
- Store the data in MongoDB Atlas

## Technologies Used

- Node.js
- Express
- MongoDB Atlas
- Mongoose
- React
- Vite
- Plain CSS
- Render for deployment

## Project Structure

```text
MONGODB_APP
|-- Backend
|   |-- config.js
|   |-- index.js
|   |-- models
|   |   `-- vehicleModel.js
|   |-- routes
|   |   `-- vehiclesRoute.js
|   `-- frontend
|       `-- src
|           `-- App.jsx
`-- README.md
```

## Environment Variables

Create a `.env` file inside the `Backend` folder.

Example:

```env
PORT=5555
MONGODB_URL=your_mongodb_atlas_connection_string
```

The `.env` file is not uploaded to GitHub because it contains the MongoDB connection string.

## How To Run Locally

Important: run the project from the `Backend` folder.

Clone the repo:

```bash
git clone https://github.com/Joselin229/MONGODB_APP.git
```

Go into the backend folder:

```bash
cd MONGODB_APP/Backend
```

Install backend dependencies:

```bash
npm install
```

Install frontend dependencies:

```bash
npm --prefix frontend install
```

Create the `.env` file in the `Backend` folder and add the MongoDB connection string.

Run the app:

```bash
npm run dev
```

Open:

```text
http://localhost:5555
```

## Production / Deployment

The app is deployed on Render as one web service. The backend serves both the API and the built React frontend.

Render settings used:

```text
Root Directory: Backend
Build Command: npm install && npm --prefix frontend install && npm --prefix frontend run build
Start Command: npm start
```

Render environment variable:

```text
MONGODB_URL=your_mongodb_atlas_connection_string
```

## API Routes

Base route:

```text
/vehicles
```

| Method | Route | Purpose |
| --- | --- | --- |
| GET | `/vehicles` | Get all vehicles |
| GET | `/vehicles/:id` | Get one vehicle |
| POST | `/vehicles` | Add a vehicle |
| PUT | `/vehicles/:id` | Update a vehicle |
| DELETE | `/vehicles/:id` | Delete a vehicle |

## Notes

- MongoDB Atlas is used as the database.
- The project uses one main collection for vehicle records.
- The schema field for mileage is currently spelled `milleage` in the code.
- The free Render service may take a few seconds to wake up after inactivity.
