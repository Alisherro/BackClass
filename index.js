const express = require('express')
const path=require('path')
const mongoose = require('mongoose')
const controller = require("./authController");
const roleMiddleware = require("./middlewaree/roleMiddlaware");
const app=express()
const authMiddleware= require('./middlewaree/authMiddleware')
const bodyParser = require('body-parser')

const PORT=8000
const db='mongodb+srv://Alisher:kihfa7689@cluster0.hvz0m.mongodb.net/auth_roles?retryWrites=true&w=majority'
const urlencodedParser = bodyParser.urlencoded({ extended: false })

app.set('view engine','ejs')
app.set('views',path.resolve(__dirname,'ejs'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.resolve(__dirname,'static')))


app.get('/',(req,res)=>{
    res.render('index',{title:'Main page ', active:'main'})
})

app.get('/features',(req,res)=>{2
    res.render('features',{title:'Catalog', active:'features'})
})

app.get('/login',(req,res)=>{
    res.render('log',{title:'Logging', active:'log'})
})

app.get('/delete',(req,res)=>{
    res.render('delete',{title:'delete', active:'delete'})
})

app.get('/anime',(req,res)=>{
    res.render('anime',{title:'Chinese cartoons', active:'features'})
})

app.get('/serials',(req,res)=>{
    res.render('anime',{title:'Serials', active:'features'})
})

app.get('/registration',(req,res)=>{
    res.render('sign',{title:'sign'})
})
app.post('/delete',controller.delete)
app.post('/registration', urlencodedParser,controller.registration)
app.post('/login', controller.login)
app.get('/users', roleMiddleware(['admin']),controller.getUsers)


const start =async () => {
    try{
        await mongoose.connect(db);
        app.listen(PORT, ()=>console.log(`listening on port ${PORT}...`))
    }catch (e){
        console.log(e)
    }
}
start()

