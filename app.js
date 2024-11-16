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
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(sessionConfig);
app.use(passport.session());


app.use("/", authRoutes);
app.use("/", messageRoutes);

app.use((req, res) => {
  res.status(404).send('Page not found');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});