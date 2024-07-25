import express, { Express } from "express";

const port = 4000;
const app: Express = express();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
