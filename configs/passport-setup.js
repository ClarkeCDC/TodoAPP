const passport = require("passport");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require("./keys");
const User = require("../models/user-model");
const mongoose = require("mongoose")

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    });
});


passport.use(
    new GoogleStrategy ({
    //optons for google stratergy
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret,
        callbackURL: "/auth/google/redirect"
    }, (accessToken, refreshToken, profile, done) => {
        //Check if user already exists
        User.findOne({googleID: profile.id}).then((currentUser) => {
            if(currentUser){
                //User already exists
                done(null, currentUser);
            } else {
                //If they do not exist add them to the DB
                new User ({
                    username: profile.displayName,
                    googleID: profile.id
                }).save().then((newUser) => {
                    console.log("New user created: ", newUser);
                    done(null, newUser);
                });
            }
        });
        
    }
));