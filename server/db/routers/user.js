const express = require('express')
const auth = require('../../middleware/auth')
const User = require('../models/user')
const router = new express.Router()


router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        // check if user exist then generate token
        
        const token = await user.generateAuthToken()
        // rename
        res.cookie('jwttoken', token)
        res.status(200).send();
        // .redirect('/admin');
        // redirect
    } catch (e) {
        res.status(400).send()
    }
})

router.get('/users/logout', async (req, res) => {
    try {
        console.log(req.user)
        req.user.tokens = req.user.tokens.filter((token) => {
            console.log(token.token)
            return token.token !== req.token
        })
        res.cookie('jwttoken', '')
        await req.user.save()

        res.status(200).send();
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router;