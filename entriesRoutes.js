'use strict';

require('dotenv').config();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const { localStrategy, jwtStrategy } = require('./auth')
const passport = require('passport');
mongoose.Promise = global.Promise;

const { DATABASE_URL, PORT } = require('./config');
const { Entry } = require('./entry-model');
const { User } = require('./users')

const router = express.Router();

const jwtAuth = passport.authenticate("jwt", { session: false });


// Get the entries of a specific user
router.get('/', jwtAuth, (req, res) => {
    User
        .findOne({username: req.user.username})
        .then(user => {
            return Entry.find({user})
        })
        .then(entries => {
            res.json({
                entries: entries.map(
                    (entry) => entry.serialize())
            });
        })
        .catch(
        err => {
            console.error(err);
            res.status(500).json({ message: 'Internal server error' });
        });
});

// router.get('/', jwtAuth, (req, res) => {
//     Entry
//         .find({ user: req.user.id })
//         .then(entries => {
//             res.json({
//                 entries: entries.map(
//                     (entry) => entry.serialize())
//             });
//         })
//         .catch(
//         err => {
//             console.error(err);
//             res.status(500).json({ message: 'Internal server error' });
//         });
// });

//get entries of specific user of specific id 
router.get("/:id", jwtAuth, (req, res) => {
    Entry
        .findById(req.params.id)
        .then(entry => {
            res.json(entry.serialize());
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({
                error: 'Internal server error' });
        });
});

//create a new entry 
router.post('/', jwtAuth, jsonParser, (req, res) => {
    const requiredFields = ['image_url', 'photo_meaning', 'grateful','best_self'];
    for (let i = 0; i < requiredFields.length; i++) {
        const field = requiredFields[i];
        if (!(field in req.body)) {
            const message = `Missing \`${field}\` in request body`;
            console.error(message);
            return res.status(400).send(message);
        }
    }

    //create new entry from user
    Entry.create({
        image_url: req.body.image_url,
        photo_meaning: req.body.photo_meaning,
        grateful: req.body.grateful,
        best_self: req.body.best_self,
        user: req.user.id
    })
        .then(newEntry => res.status(201).json(newEntry.serialize()))
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
        });
});

//Update entry by id
router.put('/:id', jwtAuth, jsonParser, (req, res) => {
    if (!(req.params.id && req.body.id && req.params.id === req.body.id)) {
        res.status(400).json({
            error: "Request path id and request body id values must match"
        });
    }

    const updatedEntry = {
        image_url: req.body.image_url,
        photo_meaning: req.body.photo_meaning,
        grateful: req.body.grateful,
        best_self: req.body.best_self,
    };

    //update entry with specific ID with updated input
    Entry.findByIdAndUpdate(
        { _id: req.body.id },
        { $set: updatedEntry },
        { new: true }
    ).then(updatedEntry => {
        res.status(204).end();
    })
    .catch(err => res.status(500).json({ message: 'Internal server error' }));
});


//Delete entry by id 
router.delete('/:id', jwtAuth, (req, res) => {
    Entry.findByIdAndRemove(req.params.id)
        .then(() => {
            res.status(204).end();
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
        });
});

module.exports = { router };

