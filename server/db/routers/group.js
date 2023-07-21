const express = require('express')
const Group = require('../models/group')
const router = new express.Router()

// post or put?
router.post('/admin/groups', async (req, res) => {
    const group = new Group(req.body)

    try {
        await group.save()
        res.status(201).send(group)
    } catch (e) {
        res.status(400).send()
    }
})

router.get('/groups', async (req, res) => {
    try {
        const groups = await Group.find({})
        res.send(groups)
    } catch (e) {
        res.status(500).send()
    }
})

router.delete('/admin/groups', async (req, res) => {
    try {
        const ids = req.body.groupsToDelete;
        
        await Group.deleteMany({_id:{$in: ids}})

        res.status(200).send()
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router;