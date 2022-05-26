const Movie = require('/models/Movie')
const {validationResult} = require("express-validator");
const User = require("./models/User");
class movieController{
    async create(req,res){
        try{
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({message: 'Creating error', errors})
            }
            const name=req.body.name
            const poster=req.body.poster
            const url=req.body.url
            const country=req.body.country
            const year=req.body.year
            const genre=req.body.genre
            const imdb=req.body.imdb
            const movie = new Movie({name,poster,url,country,year,genre,imdb})
            await movie.save()
        } catch (e) {
            console.log(e)
        }
    }

    async find(req,res){
        try{
            const name=req.body.name
            const movie = await Movie.find({name: name})
            if (!movie[0]){
                return res.status(400).json({message:"Фильм "+username+" не найден"})
            }
            res.render('movietemp',{ movie: movie ,title:'Movies'})
        } catch (e) {
            console.log(e)
        }
    }
}
