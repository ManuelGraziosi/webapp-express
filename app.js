import express from "express";
import handleErrors from "./middlewares/handleErrors";

const app = express();
const port = 3000;

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("Benvenuto su webapp-express");
});

app.use(handleErrors);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
