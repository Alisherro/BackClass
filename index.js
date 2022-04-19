import express from 'express'
import path from 'path'
import {requestTime,logger} from './middlewares.js'

const __dirname=path.resolve()
const PORT=3000
const app=express()

app.set('view engine','ejs')
app.set('views',path.resolve(__dirname,'ejs'))


app.use(express.static(path.resolve(__dirname,'static')))


app.get('/',(req,res)=>{
    res.render('index',{title:'Main page ', active:'main'})
})

app.get('/features',(req,res)=>{2
    res.render('features',{title:'Movies', active:'features'})
})

app.get('/log',(req,res)=>{
    res.render('log',{title:'Logging', active:'log'})
})

app.get('/anime',(req,res)=>{2
    res.render('anime',{title:'Anime', active:'anime'})
})

app.get('/serials',(req,res)=>{2
    res.render('serials',{title:'Serials', active:'serial'})
})


app.listen(PORT,()=>{
    console.log("Сервер запущен на порте",PORT)
})

