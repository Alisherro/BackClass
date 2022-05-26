const {Schema} = require('mongoose')
const {model} = require('mongoose')

const Movie = new Schema({
    name:{type:String, required:true},
    poster:{type:String, required:true},
    url:{type:String, required:true},
    country:{type:String, required:true},
    year:{type:String, required:true},
    genre:{type:String, required:true},
    imdb:{type:String, required:true}
})

module.exports = model('Movie', Movie)