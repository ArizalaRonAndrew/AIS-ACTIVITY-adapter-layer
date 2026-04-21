import express from "express";
import "dotenv/config.js";
import authRoutes from "./routes/authRoutes.js";


const app = express();

// Middleware
app.use(express.json());

const port = process.env.PORT || 4000;

try {
  app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
  });
} catch (e) {
  console.log(e);
}

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/auth", authRoutes);