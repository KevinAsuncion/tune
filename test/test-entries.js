'use strict'

const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const faker = require('faker');
const { app, runServer, closeServer } = require('../server');
const { JWT_SECRET, TEST_DATABASE_URL } = require('../config');
const { User } = require('../users');
const { Entry } = require('../entry-model');


const expect = chai.expect;

chai.use(chaiHttp);

function seedEntryData() {
    console.info('seeding entry data');
    const seedData = [];
    for (var i = 1; i <= 10; i++) {
        seedData.push({
            image_url: faker.image.imageUrl(),
            photo_meaning: faker.lorem.sentence(),
            grateful: faker.lorem.sentence(),
            best_self: faker.lorem.sentence()
        });
    }
    return Entry.insertMany(seedData);
}

function tearDownDb() {
    return new Promise((resolve, reject) => {
        console.warn('Deleting database');
        mongoose.connection
            .dropDatabase()
            .then(result => resolve(result))
            .catch(err => reject(err));
    });
}

describe('Entries API', function(){

    const username = 'exampleUser';
    const password = 'examplePassword';
    const token = jwt.sign(
        {
            user: {
                username
            }
        },
        JWT_SECRET,
        {
            algorithm: 'HS256',
            subject: username,
            expiresIn: '30d'
        }
    );


    before(function () {
        return runServer(TEST_DATABASE_URL);
    });

    beforeEach(function () {
        return seedEntryData();
    });

    afterEach(function () {
        return tearDownDb();
    });

    after(function () {
        return closeServer();
    });

    describe('Protected endpoint', function(){
        it('Should reject request with no credentials', function(){
           return chai
                .request(app)
                .get('/entries')
                .then(res => {
                    expect(res).to.have.status(401);
                })
        });
        it('Should reject requests with an invalid token',function(){
            const invalidToken = jwt.sign(
                {
                    user: username
                },
                'wrongSecret',
                {
                    algorithm: 'HS256',
                    subject: username,
                    expiresIn: '30d'
                }
            );
            return chai 
                .request(app)
                .get('/entries')
                .set('Authorization', `Bearer ${invalidToken}`)
                .then(res => {
                    expect(res).to.have.status(401);
                })
        });
    });


    describe('GET endpoint', function(){
        it('Should return all entries', function(){
            let res 
            return chai
                .request(app)
                .get('/entries')
                .set('Authorization',`Bearer ${token}`)
                .then(_res => {
                   res = _res;
                   expect(res).to.have.status(200);
                   expect(res.body.entries).to.have.length.of.at.least(1);
                   return Entry.count();
                })
                .then(count => {
                    expect(res.body.entries).to.have.lengthOf(count);
                })
                
        });

        it('Should return entries with the right fields', function(){
            let resEntry;
            return chai 
                .request(app)
                .get('/entries')
                .set('Authorization', `Bearer ${token}`)
                .then(res => {
                   expect(res).to.have.status(200);
                   expect(res).to.be.json;
                   expect(res.body.entries).to.be.a('array');
                   expect(res.body.entries).to.have.length.of.at.least(1);

                   res.body.entries.forEach(entry => {
                       expect(entry).to.be.a('object');
                       expect(entry).to.include.keys(
                           'id',
                           'image_url',
                           'grateful',
                           'best_self',
                           'photo_meaning',
                           'created_date'
                       );
                   });
                   resEntry = res.body.entries[0];
                   return Entry.findById(resEntry.id);
                })
                .then(entry => {
                    expect(resEntry.id).to.equal(entry.id);
                    expect(resEntry.image_url).to.equal(entry.image_url);
                    expect(resEntry.grateful).to.equal(entry.grateful);
                    expect(resEntry.photo_meaning).to.equal(entry.photo_meaning);
                    expect(resEntry.best_self).to.equal(entry.best_self);
                });
        });
    });

    describe('POST', function(){
        it('Should add a new entry', function(){
            const newEntry = {
                image_url: faker.image.imageUrl(),
                photo_meaning: faker.lorem.sentence(),
                grateful: faker.lorem.sentence(),
                best_self: faker.lorem.sentence()
            }
            return chai 
                .request(app)
                .post('/entries')
                .set('Authorization', `Bearer ${token}`)
                .send(newEntry)
                .then(function(res) {
                    expect(res).to.have.status(201);
                    expect(res).to.be.json;
                    expect(res.body).to.be.a('object');
                    expect(res.body).to.include.keys(
                       'id',
                       'image_url',
                       'photo_meaning',
                       'grateful',
                       'best_self',
                       'created_date'
                    );
                    expect(res.body.id).to.not.be.null;
                    expect(res.body.image_url).to.equal(newEntry.image_url);
                    expect(res.body.photo_meaning).to.equal(newEntry.photo_meaning);
                    expect(res.body.grateful).to.equal(newEntry.grateful);
                    expect(res.body.best_self).to.equal(newEntry.best_self);
                    return Entry.findById(res.body.id);
                })
                .then( entry => {
                    expect(entry.image_url).to.equal(newEntry.image_url);
                    expect(entry.photo_meaning).to.equal(newEntry.photo_meaning);
                    expect(entry.grateful).to.equal(newEntry.grateful);
                    expect(entry.best_self).to.equal(newEntry.best_self);
                })

        });
    });

    describe('DELETE endpoint', function () {
        it('should delete entry by id', function () {
            let entry;

            return Entry.findOne()
                .then(_entry => {
                    entry = _entry;
                    return chai
                        .request(app)
                        .delete(`/entries/${entry.id}`)
                        .set('Authorization', `Bearer ${token}`);
                })
                .then(res => {
                    expect(res).to.have.status(204);
                    return Entry.findById(entry.id);
                })
                .then(_entry => {
                    expect(_entry).to.be.null;
                });
        });
    });

    describe('PUT endpoint', function(){
        it('Should update an entry with the data sent',function(){
            const updateData = {
                image_url: 'www.hello.com',
                grateful:'everything',
                photo_meaning: 'everything',
                best_self: 'Good person'
            }
            return Entry.findOne()
                .then(entry => {
                    updateData.id = entry.id;
                    return chai
                        .request(app)
                        .put(`/entries/${entry.id}`)
                        .set('Authorization', `Bearer ${token}`)
                        .send(updateData);
                })
                .then(res => {
                    expect(res).to.have.status(204);
                    return Entry.findById(updateData.id);
                }) 
                .then(entry => {
                    expect(entry.image_url).to.equal(updateData.image_url)
                    expect(entry.grateful).to.equal(updateData.grateful)
                    expect(entry.photo_meaning).to.equal(updateData.photo_meaning)
                    expect(entry.best_self).to.equal(updateData.best_self)
                });
        });
    });

})