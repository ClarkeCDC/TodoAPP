/* Copyright (C) Christian Clarke
 * Unauthorized copying of this file and all other files in the folder(s), via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Christian Clarke <christian_clarke@icloud.com>, 2018
 */

const express = require("express");
const todoController = require("./controllers/todoController");
const authRoutes = require("./routes/auth-routes");
const mongoose = require("mongoose")
const app = express();
const keys = require("./configs/keys");
const passport = require("passport");
const passportSetup = require("./configs/passport-setup");
const cookieSession = require("cookie-session");
//set up template engine

app.set("view engine", "ejs");

mongoose.connect(keys.mongodb.dbURL,() => {
    console.log("connected to mongodb server");
});

//Set cookieSession
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
}));

//initialise passport
app.use(passport.initialize());
app.use(passport.session());


//static files

app.use(express.static("./public"));


//Create Routes
app.use("/auth",authRoutes);

//fire controllers
todoController(app);

//Create home route
app.get("/", (req, res) => {
    res.render("home");
})
//listen to port
app.listen(3000);
console.log("listening on port 3000");