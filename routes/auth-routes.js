const router = require("express").Router();
const passport = require("passport");
//auth login
//auth logout
router.get("/logout", (req, res)=> {
    //handle with passport
    req.logOut();
    res.redirect("/");
})

//auth with google
router.get("/google", passport.authenticate("google",{
    scope:["profile"]
}));

//callback route for google to redirect to
router.get("/google/redirect", passport.authenticate("google"), (req, res)=> {
    //res.send(req.user);
    res.redirect("/todo")
});

module.exports = router;