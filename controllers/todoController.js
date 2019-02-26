var bodyParser = require("body-parser");
var mongoose = require("mongoose");
const keys = require("../configs/keys");
const Todo = require("../models/todo-model")
//Connect to the database


//Create a schema - like a blueprint

// var itemOne = Todo({item: "Buy slave"}).save(function(err){
//     if(err) throw err;
//     console.log("Item saved to Database");
// });

//var data = [{item:"get milk"}, {item:"walk nan"}, {item:"code for a bit"}];
var urlencodedParser = bodyParser.urlencoded({ extended: false });

const authCheck = (req, res, next) =>{
    if(!req.user){
        //executed if user isn't logged in
        res.redirect("/");
    } else {
        //if logged in
        //console.log(req.user);
        next(); // fires to the next functionS
    }
};


module.exports = function(app){
    
    

    app.get("/todo", authCheck, function(req, res){
        //Get data from mongoDB andd pass through view
        console.log(req.user.googleID);
        Todo.find({googleID:req.user.googleID}, function(err, data){
            if (err) throw err;
            console.log(data);
            res.render("todo", {todos:data});
        });
        
    });
    

    app.post("/todo", authCheck, urlencodedParser,function(req, res){
        //get data from view and put it in the database
        //console.log(req.user.googleID);
        var newTodo = new Todo({item: req.body.item, googleID:req.user.googleID}).save(function(err, data){
             if (err) throw err;
             res.json(data);
            
         });
    });

    app.delete("/todo/:item", function(req, res){
        // delete requested item from the database
        Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err, data){
            if(err) throw err;
            res.json(data);
        });
        
    });
};
