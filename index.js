import express from 'express';

import cors from 'cors';

import dotenv from 'dotenv';

import mongoose from 'mongoose';

import companyRouter from './routes/CompanyRoutes.js';
import userRouter from './routes/UserRoutes.js';

const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();

app.get("/", (req, res) => {
  res.send("Server Working 👍🎊🎊");
});
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected To DataBase");
  })
  .catch(() => {
    console.log("Error While Connecting the database");
  });

app.use("/api/users", userRouter);
app.use("/api/companies", companyRouter);
  const PORT = process.env.PORT || 8000;

  app.listen(PORT, () =>
    console.log(`Server Running Successfully on PORT ${PORT}`)
  );
