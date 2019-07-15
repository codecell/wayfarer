/* eslint-disable no-undef */
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

const secondTrip = {
  bus_id: 1,
  origin: 'Lagos',
  destination: 'Madrid',
  fare: 50.7
};

const bus = {
  number_plate: 'abc1',
  manufacturer: 'toyota',
  model: 'c-class',
  year: '2017',
  capacity: 35
};

const secondBus = {
  number_plate: 'efg2',
  manufacturer: 'noble motors',
  model: 'a-class',
  year: '2018',
  capacity: 20
};

describe('POST /auth/signin', () => {
  it('Should login an admin user', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(login)
      .end((err, res) => {
        console.log(res.body.data.token)
        token = res.body.data.token;
        assert.equal(res.status, 200);
        assert.typeOf(res.body.data, 'object');
        done();
      });
  });
});

describe('GET /users endpoints', () => {
  it('should allow an admin access to view all users in the DB', (done) => {
    chai.request(app)
      .get('/api/v1/users')
      .set('x-auth-token', token)
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.typeOf(res.body, 'object');
        assert.equal(res.body.status, 'success');
        done();
      });
  });

  it('should allow an admin access to view a specific user in the DB', (done) => {
    chai.request(app)
      .get('/api/v1/users/1')
      .set('x-auth-token', token)
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.typeOf(res.body, 'object');
        assert.equal(res.body.status, 'success');
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

describe('POST /buses endpoint', () => {
  it('should allow an Admin user access to post a bus', (done) => {
    chai.request(app)
      .post('/api/v1/buses')
      .send(secondBus)
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
describe('POST /trips endpoint', () => {
  it('should allow an Admin user access to create a trip', (done) => {
    chai.request(app)
      .post('/api/v1/trips')
      .set('x-auth-token', token)
      .send(secondTrip)
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

describe('GET /bookings endpoint', () => {
  it('should allow an admin access to view all bookings in the DB', (done) => {
    chai.request(app)
      .get('/api/v1/bookings')
      .set('x-auth-token', token)
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.typeOf(res.body, 'object');
        done();
      });
  });
});

describe('DELETE /trips endpoint', () => {
  it('should allow an Admin access to DELETE a trip in the DB', (done) => {
    chai.request(app)
      .delete('/api/v1/trips/2')
      .set('x-auth-token', token)
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.typeOf(res.body, 'object');
        assert.equal(res.body.data.message, 'Trip deleted successfully');
        done();
      });
  });
});

describe('GET /buses endpoint', () => {
  it('should allow an Admin access to view all buses in the DB', (done) => {
    chai.request(app)
      .get('/api/v1/buses')
      .set('x-auth-token', token)
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.typeOf(res.body, 'object');
        assert.equal(res.body.status, 'success');
        done();
      });
  });
  it('should allow an Admin access to view particular bus in the DB', (done) => {
    chai.request(app)
      .get('/api/v1/buses/1')
      .set('x-auth-token', token)
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.typeOf(res.body, 'object');
        done();
      });
  });  
});

describe('PATCH /buses endpoint', () => {
  it('should allow an Admin access to update a particular bus in the DB', (done) => {
    chai.request(app)
      .patch('/api/v1/buses/1')
      .set('x-auth-token', token)
      .send({
        number_plate: 'abc22',
        manufacturer: 'toyot-update',
        model: 'c-class-update',
        year: '2020',
        capacity: 10
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.typeOf(res.body, 'object');
        assert.equal(res.body.data.message, 'Bus updated successfully');
        done();
      });
  });
});

describe('DELETE /buses endpoint', () => {
  it('should allow an Admin access to DELETE a bus in the DB', (done) => {
    chai.request(app)
      .delete('/api/v1/buses/2')
      .set('x-auth-token', token)
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.typeOf(res.body, 'object');
        assert.equal(res.body.data.message, 'Bus deleted successfully');
        done();
      });
  });
});
