const express = require('express');
const product = require("./routes/productRoutes");
const user = require("./routes/userRoutes");
const order = require("./routes/orderRoutes");
const errorMiddleware = require("./middleware/error");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());

app.use(cookieParser());

app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);

app.use(errorMiddleware);

module.exports = app;