import chai, { assert } from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

require('dotenv').config();

chai.use(chaiHttp);

let token;

const login = {
  email: process.env.ADMIN_EMAIL,
  password: process.env.ADMIN_PASS,
};

const trip = {
  bus_id: 1,
  origin: 'ilasa',
  destination: 'agungu',
  fare: 30.5
};


const bus = {
  number_plate: 'abc1',
  manufacturer: 'toyota',
  model: 'c-class',
  year_manufactured: '2017',
  capacity: 35
};

describe('POST /auth/signin', () => {
  it('Should login an admin user', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(login)
      .end((err, res) => {
        token = res.body.data.token;
        assert.equal(res.status, 200);
        assert.typeOf(res.body.data, 'object');
        done();
      });
  });
});
describe('POST /buses endpoint', () => {
  it('should allow an Admin user access to post a bus', (done) => {
    chai.request(app)
      .post('/api/v1/buses')
      .send(bus)
      .set('x-auth-token', token)
      .end((err, res) => {
        assert.equal(res.status, 201);
        assert.typeOf(res.body, 'object');
        done();
      });
  });
});

describe('POST /trips endpoint', () => {
  it('should allow an Admin user access to create a trip', (done) => {
    chai.request(app)
      .post('/api/v1/trips')
      .set('x-auth-token', token)
      .send(trip)
      .end((err, res) => {
        assert.equal(res.status, 201);
        assert.typeOf(res.body, 'object');
        done();
      });
  });
});

describe('GET /trips/:id endpoint', () => {
  it('should allow an Admin user access to view a particular trip', (done) => {
    chai.request(app)
      .get('/api/v1/trips/1')
      .set('x-auth-token', token)
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.typeOf(res.body, 'object');
        done();
      });
  });
});

describe('PATCH /trips endpoint', () => {
  it('should allow an Admin user access to CANCEL a trip', (done) => {
    chai.request(app)
      .patch('/api/v1/trips/1')
      .set('x-auth-token', token)
      .send({ status: 'cancelled' })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.typeOf(res.body, 'object');
        assert.equal(res.body.data.message, 'Trip cancelled successfully');
        done();
      });
  });
});