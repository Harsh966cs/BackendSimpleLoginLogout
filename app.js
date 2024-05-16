const bodyParser = require('body-parser');
const express =  require('express');
const { default: mongoose } = require('mongoose');
const passport = require('passport');
const LocalStrategy = require("passport-local");
const conected = require('./model/Conected');
const app = express();
const port = 3001;
const User = require('./model/User')

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(require("express-session")({
    secret: "Rusty is a dog",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.get('/',(req,res)=>{
    res.render("home");
})

app.get('/login',(req,res)=>{
    res.render("login");
})

app.get('/register',(req,res)=>{
    res.render("register");
})
app.post('/register',async(req,res)=>{
    const user = await User.create({
        username:req.body.username,
        password:req.body.password
    });
    return res.status(200).json(user)
})

app.get('/secret',(req,res)=>{
    res.render("secret");
})
 
app.post('/login',async(req,res)=>{
    try {
        const user = await User.findOne({username:req.body.username});
        if(user)
        {
            const result = user.password === req.body.password;
            if(result)
              {
                    res.render("secret")
              }
            else
            {
                res.status(400).json({error:"password not match"});
            }
        }
        else
        {
            res.status(400).json({error:"User doesn't exist"});
        }
    } catch (error) {
        console.error(error);
    }
       
})

app.get('/logout',(req,res)=>{
   
    req.logOut((err)=>{
         if(err){return next(err);}
         res.redirect("/")
    })
})

function isLoggedIn(req,res,next)
{
    if(req.isAuthenticate()) return next;
    res.redirect("/login")
}
conected();
app.listen(port,()=>{
    console.log(`the port is runing on ${port}`)
})

