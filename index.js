const express = require('express')
const path=require('path')
const mongoose = require('mongoose')
// const __dirname=path.resolve()
const PORT=8000
const app=express()
const db='mongodb+srv://Alisher:kihfa7689@cluster0.hvz0m.mongodb.net/auth_roles?retryWrites=true&w=majority'

mongoose
    .connect(db)
    .then(res=>console.log('DB Connected'))
    .catch(err=>err)

app.set('view engine','ejs')
app.set('views',path.resolve(__dirname,'ejs'))

app.use(express.static(path.resolve(__dirname,'static')))

app.get('/',(req,res)=>{
    res.render('index',{title:'Main page ', active:'main'})
})

app.get('/features',(req,res)=>{2
    res.render('features',{title:'Catalog', active:'features'})
})

app.get('/log',(req,res)=>{
    res.render('log',{title:'Logging', active:'log'})
})

app.get('/anime',(req,res)=>{
    res.render('anime',{title:'Chinese cartoons', active:'features'})
})

app.get('/serials',(req,res)=>{
    res.render('anime',{title:'Serials', active:'features'})
})

app.get('/sign',(req,res)=>{
    res.render('sign',{title:'sign'})
})

app.listen(PORT,()=>{
    console.log("Сервер запущен на порте",PORT)
    console.log("http://localhost:"+PORT)
})

