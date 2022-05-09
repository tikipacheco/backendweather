const request = require('supertest');
const should = require('should');
const app = require('../app');


//==================== user API test ====================

describe('GET /location', function () {
    it('responde con json contiendo la ubicación', done => {
        request(app)
            .get('/v1/location')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(function(res){                
                should(res.body).have.property('status');
                should(res.body).have.property('message');
                should(res.body).have.property('data');
            })
            .expect(200, done)
    });
})

describe('GET /current', function () {
    it('responde con json contiendo la ubicación y el clima', done => {
        request(app)
            .get('/v1/current')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(function(res){                
                should(res.body).have.property('status');
                should(res.body).have.property('message');
                should(res.body).have.property('data');
                should(res.body.data).have.property('ubicacion');
                should(res.body.data).have.property('clima');
            })
            .expect(200, done)
    });
})

describe('GET /current/:city', function () {
    it('responde con json contiendo la ubicación y el clima', done => {
        request(app)
            .get('/v1/current/Santiago del Estero')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(function(res){                
                should(res.body).have.property('status');
                should(res.body).have.property('message');
                should(res.body).have.property('data');
                should(res.body.data).have.property('ubicacion');
                should(res.body.data).have.property('clima');
            })
            .expect(200, done)
    });
})

describe('GET /current/:city', function () {
    it('responde con json y un status http 400', done => {
        request(app)
            .get('/v1/current/234')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(function(res){                                
                should(res.body).have.property('message');                
                should(res.body.message).equal('la ciudad debe ser una cadena de caracteres')                
            })
            .expect(400, done)
    });
})

describe('GET /forecast', function () {
    it('responde con json contiendo la ubicación y el clima', done => {
        request(app)
            .get('/v1/forecast')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(function(res){                                
                should(res.body).have.property('status');
                should(res.body).have.property('message');
                should(res.body).have.property('data');
                should(res.body.data).have.property('ubicacion');
                should(res.body.data).have.property('clima');               
            })
            .expect(200, done)
    });
})

describe('GET /forecast/:city', function () {
    it('responde con json contiendo la ubicación y el clima', done => {
        request(app)
            .get('/v1/forecast/Santiago del Estero')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(function(res){                                
                should(res.body).have.property('status');
                should(res.body).have.property('message');
                should(res.body).have.property('data');
                should(res.body.data).have.property('ubicacion');
                should(res.body.data).have.property('clima');               
            })
            .expect(200, done)
    })
})

describe('GET /forecast/:city', function () {
    it('responde con json y un status http 400', done => {
        request(app)
            .get('/v1/forecast/456')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(function(res){                                
                should(res.body).have.property('message');                
                should(res.body.message).equal('la ciudad debe ser una cadena de caracteres')       
            })
            .expect(400, done)
    });
})
/*
describe('GET /rest-controller', function () {
    it('GET /location', done => {
        request(app)
            .get('/v1/location')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done)
    });
    it('GET /current', done => {
        request(app)
            .get('/v1/current')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(function(res){                
                should(res.body).have.property('status');
                should(res.body).have.property('message');
                should(res.body).have.property('data');
            })
            .expect(200, done)
    })
    /*it('GET /forecast', done => {
        request(app)
            .get('/v1/forecast?city=santiago del estero')
            .set('Accept', 'application/json')
            //.expect('Content-Type', /json/)
            .expect(function(res){                
                should(res.body).have.property('field')
                //res.body.should.be.a('object');
            })
            .expect(200, done)
    });
    it('GET /forecast with query', done => {
        request(app)
            .get('/v1/forecast?ciudad=45')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done)
    });
    
});*/