require('dotenv').config();
const express = require('express');
const app = express();
const path = require('node:path');
const passport = require('./config/passport');
const pool = require('./db/pool'); 
const authRoutes = require("./routes/authRoutes");
const messageRoutes = require("./routes/messageRoutes");
const sessionConfig = require("./config/session");

app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(sessionConfig);
app.use(passport.session());

app.use("/", authRoutes);
app.use("/", messageRoutes);

app.use((req, res) => {
  res.status(404).render('error', {
    status: 404,
    message: 'Page not found',
    details: 'The page you are looking for does not exist.'
  });
});

app.use((err, req, res, next) => {
  const statusCode = err.status || 500;
  const message = err.message || 'Something went wrong. Please try again later.';
  const details = err.details || 'No additional details are available.';

  res.status(statusCode).render('error', {
    status: statusCode,
    message: message,
    details: details
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});