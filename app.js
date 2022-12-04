//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash")

const homeStartingContent = "Эта страница предоставлена для записи ежедневных планов, сделана с любовью, дабы каждый из вас мог сохранять в памяти каждую деталь своих задач и планов. Что бы начать запись необходимо просто нажать на кнопку Добавить запись. ";
const aboutContent = "Мы не являемся комерческой организацией, J&N - это стиль жизни, где каждый может проявить себя и помочь своему ближнему.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";
let composeContent = [];


const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let posts = [] 

app.get("/", function(req, res){
  res.render("home", {
    homePage: homeStartingContent,
    posts: posts 
  })
})

app.post("/", function(req, res){
  let lacus = req.body.newItem
  homeStartingContent.push(lacus)
  res.redirect("/")
})

app.get("/about", function(req, res){
  res.render('about', {
    homePage: "About Page",
    aboutPage: aboutContent
  })
})

app.post("/about", function(req, res){
  let info = req.body.newItem
  aboutContent.push(info)
  res.redirect('/about')
})

app.get("/contact", function(req, res){
  res.render('contact', {
    homePage: "Contact Page",
    contactPage: contactContent
  })
})

app.post("/contact", function(req, res){
  let contact = req.body.newItem
  contactContent.push(contact)
  res.redirect("/contact")
})

app.get("/compose", function(req, res){
  res.render('compose', {
    homePage: "Compose Page",
    composePage: composeContent
  })
})

app.post("/compose", function(req, res){
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody
  }
  posts.push(post)

  res.redirect("/")
})
 
app.get("/posts/:postName", function(req, res){
  let requestedTitle = _.lowerCase(req.params.postName)

  posts.forEach(function(post){
    let storedTitle = _.lowerCase(post.title)

    if (storedTitle == requestedTitle) {
      res.render("post", {
        title: post.title,
        content: post.content
      })
    }
  })
})
  
 
app.post("/post", function(req, res) {
  let post = {
    title: req.body.postTitle,
    content: req.body.postBody
  }
  posts.push(post)
  res.redirect("/post")
})



app.listen(3000, function() {
  console.log("Server started on port 3000");
});
