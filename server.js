'use strict';

//****************************************************
// Requires
//****************************************************

require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const mongoose = require('mongoose');
const morgan = require('morgan');
const passport = require('passport');
const { PORT, DATABASE_URL } = require('./config');

// Local Strategy & JWT Strategy 

const { localStrategy, jwtStrategy } = require('./auth')

// ****************************************************
// Passport
// ****************************************************

passport.use(localStrategy);
passport.use(jwtStrategy);

const jwtAuth = passport.authenticate('jwt', { session: false });

const app = express();
app.use(morgan('common'));
app.use(express.static('public'));

//****************************************************
// Mongoose 
//****************************************************
mongoose.Promise = global.Promise; 

//****************************************************
// CORS
//****************************************************
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
    if (req.method === 'OPTIONS') {
        return res.send(204);
    }
    next();
});

//****************************************************
// Routes
//****************************************************

const { router: usersRouter } = require('./users/router');
const { router: authRouter } = require('./auth/router');
const { router: entriesRouter } = require('./entriesRoutes');

app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/entries', entriesRouter);

app.use('*', (req, res) => {
    res.status(404).json({ message: 'Not Found' });
});

//****************************************************
// Test Server 
//****************************************************

let server;

function runServer(databaseUrl, port = PORT) {
    return new Promise((resolve, reject) => {
        mongoose.connect(databaseUrl, err => {
            if (err) {
                return reject(err);
            }
            server = app
                .listen(port, () => {
                    console.log(`Your app is listening on port ${port}`);
                    resolve();
                })
                .on('error', err => {
                    mongoose.disconnect();
                    reject(err);
                });
        });
    });
}

function closeServer() {
    return mongoose.disconnect().then(() => {
        return new Promise((resolve, reject) => {
            console.log('Closing server');
            server.close(err => {
                if (err) {
                    return reject(err);
                }
                resolve();
            });
        });
    });
}

if (require.main === module) {
    runServer(DATABASE_URL).catch(err => console.error(err));
}

module.exports = { app, runServer, closeServer };