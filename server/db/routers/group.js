const express = require('express')
const Group = require('../models/group')
const router = new express.Router()

// post or put?
router.post('/admin/groups', async (req, res) => {
    const newGroup = req.body.group;
    const gropus = await Group.findOneAndUpdate({}, { $push: { groups: newGroup }})

    try {
        res.status(201).send(gropus)
    } catch (e) {
        res.status(400).send()
    }
})

router.get('/groups', async (req, res) => {
    try {
        const groups = await Group.findOne({})
        res.send(groups)
    } catch (e) {
        res.status(500).send()
    }
})

router.delete('/admin/groups', async (req, res) => {
    try {
        const groupsToDelete = req.body.groupsToDelete;
        const {groups} = await Group.findOne({})

        const filteredGroups = groups.filter((group) => {
            return !groupsToDelete.includes(group)
        })

        await Group.findOneAndUpdate({}, {$set: {groups: filteredGroups}})

        res.status(200).send()
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router;