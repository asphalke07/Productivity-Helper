const express =require("express");
const bodyParser= require("body-parser");
const { redirect } = require("express/lib/response");

const app=express();
app.use(express.static("public"));

var items=["Eat Food","Cook Food","Buy Food"];
var workItems=[];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));


//Get methods


app.get("/", function (req, res) {
    res.sendFile(__dirname + "/homepage.html");
  });

app.get("/todo",function(req,res){
    
    var today=new Date();
 
    var options={
        weekday:"long",
        day:"numeric",
        month:"long"
    };

    var day=today.toLocaleDateString("en-US",options);

    res.render("list",{listTitle : day,newListItems :items});
});

app.get("/calender", function (req, res) {

    res.render("calender");
  });

  app.get("/pomodoro", function (req, res) {
    res.render("pomodoro");
  });

  
  app.get("/notes", function (req, res) {
    res.render("notes");
  });

app.get("/work",function(req,res){
    res.render("list",{listTitle:"Work List",newListItems: workItems})
});

app.get("/about",function(req,res){
    res.render("about");
});



//post methods

app.post("/todo",function(req,res){
    console.log(req.body);
    var item =req.body.newItem;
    
    if(req.body.list=== "Work"){
        workItems.push(item);
        res.redirect("/work");
    } else{
        items.push(item);
        res.redirect("/todo");
    }
});




app.listen(process.env.PORT || 3000,function(){
    console.log("Server started on port 3000");
});
