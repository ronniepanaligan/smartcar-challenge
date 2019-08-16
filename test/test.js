var expect = require('chai').expect;
var should =require('chai').should
var sinon = require('sinon');
var proxyquire = require('proxyquire');
var supertest = require('supertest');

var vehicleStub ={}
vehicleStub.post = sinon.stub();
var smartCarAPI = proxyquire('./../app.js', { 'request': vehicleStub });
var request = supertest(smartCarAPI);

var gmApiResponses = require('./gmApiResponse')

var id = '1234';

describe('/GET vehicle/:id', function() {
  it('returns vehicle info', function(done) {

    vehicleStub.post.yields(null, {statusCode: 200}, gmApiResponses.info);

    request
      .get('/vehicles/' + id)
      .expect("Content-type",/json/)
      .expect(200)
      .end(function(err, res) {
        expect(res.body.vin).to.equal('123123412412')
        expect(res.body.color).to.equal('Metallic Silver')
        expect(res.body.doorCount).to.equal(4)
        expect(res.body.driveTrain).to.equal('v8')
        done();
      });
  });

  it('Empty request from GM API returns an error', function(done) {
    vehicleStub.post.yields(null, {statusCode: 500}, {});

    request
      .get('/vehicles/' + id)
      .expect(500)
      .end(function(err, res) {
        expect(res.error.text).to.equal("Error occured when sending request to GM API")
        expect(res.error.status).to.equal(500)
        done();
      });
  })
});

describe('/GET vehicle/:id/doors', function() {
  it('returns vehicle door info', function(done) {

    vehicleStub.post.yields(null, {statusCode: 200}, gmApiResponses.security);

    request
      .get('/vehicles/doors/' + id)
      .expect("Content-type",/json/)
      .expect(200)
      .end(function(err, res) {
        done();
      });
  });

  it('Empty request from GM API returns an error', function(done) {
    vehicleStub.post.yields(null, {statusCode: 500}, {});

    request
      .get('/vehicles/' + id + '/doors')
      .expect(500)
      .end(function(err, res) {
        expect(res.error.text).to.equal("Error occured when sending request to GM API")
        expect(res.error.status).to.equal(500)
        done();
      });
  })
});

describe('/GET vehicle/:id/fuel', function() {
  it('returns vehicle fuel info', function(done) {

    vehicleStub.post.yields(null, {statusCode: 200}, gmApiResponses.energy);

    request
      .get('/vehicles/' + id + '/fuel')
      .expect("Content-type",/json/)
      .expect(200)
      .end(function(err, res) {
        expect(res.body.percent).to.equal('30')
        done();
      });
  });

  it('Empty request from GM API returns an error', function(done) {
    vehicleStub.post.yields(null, {statusCode: 500}, {});
    request
      .get('/vehicles/' + id + '/fuel')
      .expect(500)
      .end(function(err, res) {
        expect(res.error.text).to.equal("Error occured when sending request to GM API")
        expect(res.error.status).to.equal(500)
        done();
      });
  })
});

describe('/GET vehicle/:id/battery', function() {
  it('returns vehicle battery info', function(done) {

    vehicleStub.post.yields(null, {statusCode: 200}, gmApiResponses.energy);

    request
      .get('/vehicles/' + id + '/battery')
      .expect("Content-type",/json/)
      .expect(200)
      .end(function(err, res) {
        expect(res.body.percent).to.equal(0)
        done();
      });
  });

  it('Empty request from GM API returns an error', function(done) {
    vehicleStub.post.yields(null, {statusCode: 500}, {});
    request
      .get('/vehicles/' + id + '/battery')
      .expect(500)
      .end(function(err, res) {
        expect(res.error.text).to.equal("Error occured when sending request to GM API")
        expect(res.error.status).to.equal(500)
        done();
      });
  })
});

describe('/POST vehicle/:id/engine', function() {
  it('returns if successful', function(done) {

    vehicleStub.post.yields(null, {statusCode: 200}, gmApiResponses.Engine);

    request
      .post('/vehicles/' + id + '/engine')
      .expect("Content-type",/json/)
      .expect(200)
      .end(function(err, res) {
        expect(res.body.status).to.equal('success')
        done();
      });
  });

  it('Empty request from GM API returns an error', function(done) {
    vehicleStub.post.yields(null, {statusCode: 500}, {});
    request
      .post('/vehicles/' + id + '/engine')
      .expect(500)
      .end(function(err, res) {
        expect(res.error.text).to.equal("Error occured when sending request to GM API")
        expect(res.error.status).to.equal(500)
        done();
      });
  })
});
