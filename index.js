require('./config/mongoose');
const express = require('express');
const cors = require('cors');
const app = express();

const productRouter = require("./router/product");

app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(productRouter);

app.listen(process.env.PORT, () => {
  console.log( `⚡ Server started on port ${process.env.PORT}`);
});