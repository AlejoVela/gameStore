const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { dbConnection } = require("./db/db");
//routes
const User = require("./routes/user");
const Product = require("./routes/product");

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/user", User);
app.use("/api/product", Product);

app.listen(
    process.env.PORT, 
    console.log(`Server running OK, on port ${process.env.PORT}`)
);


dbConnection();
