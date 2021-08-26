const jwtHelpers = require("../helpers/jwt.helper");
const User = require('../models/User')
const bcrypt = require('bcrypt')

const token_key = process.env.ACCESS_TOKEN_SECRET

let register = async (req, res) => {
    try {
        const { first_name, last_name, username, password } = req.body;

        if (!(username && password && first_name && last_name)) {
            res.status(400).json({
                message: "All input is required"
            });
        }

        const oldUser = await User.findOne({ username });

        if (oldUser) {
            return res.status(409).json({
                message: "User already Exist. Please Login"
            });
        }

        const newUser = await User.create({
            first_name,
            last_name,
            username,
            password,
        });

        const token = await jwtHelpers.createToken(newUser, token_key, "2h")

        // save user token
        newUser.token = token;

        // return new user
        res.status(201).json({
            data: newUser,
            message: 'User created successfull'
        });
    } catch (err) {
        console.log(err);
    }
}

let login = async (req, res) => {
    try {
        // Get user input
        const { username, password } = req.body;

        // Validate user input
        if (!(username && password)) {
            res.status(400).json({
                message: "All input is required"
            });
        }

        const user = await User.findOne({ username });

        if (user && (await bcrypt.compare(password, user.password))) {
            const token = await jwtHelpers.createToken(user, token_key, "2h")
            user.token = token;

            res.status(200).json({
                data: user,
                message: 'login successfully'
            });
        }
        res.status(400).json({
            message: "Login failed"
        });
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    register,
    login
}