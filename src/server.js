import express from "express";
import path from "path";
import dotenv from "dotenv";
import connectDB from "./database/db.js";
import colors from "colors";
import morgan from "morgan";
import swaggerUI from "swagger-ui-express";

// const color = require('color');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

//Routes files
import users from "./server/routes/register.js";
import products from "./server/routes/product.js";

const app = express();

// Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Body parser
app.use(express.json());

//Mount routers
app.use("/api/v1/auth", users);
app.use("/api/v1/product", products);

//Swagger
// app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(docs));

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

// Handle unhandled promise rejection
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`);

  //Close the server & exit process
  server.close(() => process.exit(1));
});