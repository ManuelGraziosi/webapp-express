import express from "express";
import movieRouter from "./routers/movies.js";
import handleErrors from "./middlewares/handleErrors.js";
import handleNotFound from "./middlewares/handleNotFound.js";
import cors from "cors";

const app = express();
const port = 3000;

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
  }),
);

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("Benvenuto su webapp-express");
});

app.use("/api/movies", movieRouter);

app.use(handleNotFound);
app.use(handleErrors);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
