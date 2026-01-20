import express from "express";
import cors from "cors";
import routes from "./routes";

const app = express();

app.use(cors());
// app.use(
//   cors({
//     origin: process.env.FE_URL,
//     methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
//     credentials: true,
//   })
// );
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Athlete Performance Tracker Backend Running");
});

// Routes
app.use("/api/v1", routes);

export default app;
