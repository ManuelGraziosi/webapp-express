import express from "express";
import handleErrors from "./middlewares/handleErrors.js";
import movieRouter from "./routers/movies.js";

const app = express();
const port = 3000;

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("Benvenuto su webapp-express");
});

app.use("/api/movies", movieRouter);

app.use(handleErrors);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
