const User = require('./models/User')
const Role = require('./models/Role')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')
const {secret}= require("./config")
const generateAccessToken = (id, role) => {
    const payload= {
        id,
        role
    }
    return jwt.sign(payload, secret, {expiresIn:"1h"})
}
class authController {
    async registration(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({message: 'Registration error', errors})
            }
            const username = req.body.signName
            const password = req.body.signPassword
            const confirmPass = req.body.signPassword2
            if(password !== confirmPass){
                return res.status(400).json({message: 'Password is not correct'})
            }
            const candidate = await User.findOne({username})
            if (candidate) {
                return res.status(400).json({message: 'A user with this name already exists'})
            }
            const hashPassword = bcrypt.hashSync(password, 7);
            const userRole = await Role.findOne({value: 'USER'})
            const user = new User({username, password:hashPassword,roles: [userRole.value]})
            await user.save()
            return res.json({message: 'The user has been successfully registered'})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Registration error'})
        }
    }

    async login(req, res){
        try {
            const username=req.body.username
            const password=req.body.password

            const user = await User.findOne({username})
            if(!user){
                return res.status(400).json({message:"Пользователь "+username+" не найден"})
            }
            const validPassword = bcrypt.compareSync(password, user.password)
            if(!validPassword){
                return res.status(400).json({message:` Введен неверный пароль`})
            }
            const token = generateAccessToken(user._id, user.roles)
            return res.json({token})
        }catch (e){
            console.log(e)
            res.status(400).json({message: 'Login Error'})
        }
    }
    async getUsers(req, res){
        try {
            const users = await User.find()
            res.json(users)
            res.json

        }catch (e){
            console.log(e)
        }
    }
}

module.exports = new authController()