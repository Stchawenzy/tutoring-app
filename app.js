const config = require("config");
const Joi = require("joi");
const users = require("./routes/users");
const tutors = require("./routes/tutors");
const auth = require("./routes/auth");
const categories = require("./routes/categories");
const subjects = require("./routes/subjects");
const lessons = require("./routes/lessons");
const mongoose = require("mongoose");
const express = require("express");
const app = express();

const dotenv = require("dotenv");
const PORT = process.env.PORT || 3000;
dotenv.config();
const url = process.env.MONGODB_URI;


//Endpoints
app.get("/", (req, res) => {
    res.send("Hello World");
});
app.use(express.json());
app.use("/api/v1/users", users);
app.use("/api/v1/tutors", tutors);
app.use("/api/v1/auth", auth);
app.use("/api/v1/categories", categories);
app.use("/api/v1/subjects", subjects);
app.use("/api/v1/lessons", lessons);


//Mongodb server
mongoose
.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true }
)
.then(result => {
    console.log("Database connected");
})
.catch(err => console.log(err));

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
