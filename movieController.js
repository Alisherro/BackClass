const Movie = require('./models/Movie')
const express = require("express");
const app=express()
const path = require("path");
const User = require("./models/User");
app.use(express.static(path.resolve(__dirname,'static')))

class movieController{
    async create(req,res){
        try{
            const name=req.body.name
            const poster=req.body.poster
            const url=req.body.url
            const country=req.body.country
            const year=req.body.year
            const genre=req.body.genre
            const imdb=req.body.imdb
            const movie = new Movie({name,poster,url,country,year,genre,imdb})
            await movie.save()
            res.json({message:'Movie created successfully'})
        } catch (e) {
            console.log(e)
        }
    }

    async find(req,res){
        try{
            const name=req.body.name
            const movie = await Movie.find({name: name})
            if (!movie[0]){
                return res.status(400).json({message:"Фильм "+name+" не найден"})
            }
            res.render('movietemp',{movie: movie,title: 'Movies',active: 'adminmovie'})
        } catch (e) {
            console.log(e)
        }
    }

    async delete(req,res){
        try{
            const erase= req.body.name
            const erasey= req.body.year
            await Movie.deleteOne({name: erase,year:erasey}).then(data => {
                if (data.deletedCount===0) {
                    res.json("Movie not found")
                } else {
                    res.json("Movie "+erase+" deleted successfully!")
                }
            }).catch(err => {
                res.json(err.message)
            });
        }catch (e){
            console.log(e)
        }
    }


}
module.exports = new movieController()