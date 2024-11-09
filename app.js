require('dotenv').config();
const express = require('express');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const pool = require('./db/pool'); 
const authRoutes = require("./routes/authRoutes");
const sessionConfig = require("./sessions");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(session(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));


app.use("/", authRoutes);

app.use((req, res) => {
  res.status(404).send('Page not found');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});