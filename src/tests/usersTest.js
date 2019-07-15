/* eslint-disable no-undef */
import chai, { assert } from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.use(chaiHttp);

const user = {
  email: 'test@domain.com',
  first_name: 'john',
  last_name: 'doe',
  password: 'test'
};

const user2 = {
  email: 'test2@domain.com',
  first_name: 'oke',
  last_name: 'ramos',
  password: 'test'
};

const login = {
  email: 'test@domain.com',
  password: 'test'
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
  year: '2017',
  capacity: 35
};

const booking = {
  user_id: 2,
  trip_id: 1,
  trip_date: '2019-04-05',
  seat_number: 4,
  first_name: 'john',
  last_name: 'doe',
  email: 'test@domain.com'
};

let token;

describe('POST api/v1/auth/signup', () => {
  it('should register a client', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((err, res) => {
        assert.equal(res.status, 201);
        done();
      });
  });

  it('should return user\'s firstname', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send(user2)
      .end((err, res) => {
        assert.equal(res.body.data.first_name, 'oke');
        done();
      });
  });

  it('should not register client if a required field is not provided', (done) => {
    user.email = '';
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((err, res) => {
        assert.equal(res.status, 401);
        done();
      });
  });
});

describe('POST /auth/signin', () => {
  it('should not login a client without an existing data ', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: 'prob@email.com',
        password: 'may123'
      }) 
      .end((err, res) => {
        assert.equal(res.status, 401);
        assert.equal(res.body.error, 'Incorrect Credentials');
        done();
      });
  });

  it('Should login a user', (done) => {
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

describe('GET /trips endpoint', () => {
  it('should grant a user access to view all trips', (done) => {
    chai.request(app)
      .get('/api/v1/trips')
      .set('x-auth-token', token)
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.typeOf(res.body, 'object');
        done();
      });
  });
});

describe('FILTER GET /trips endpoint', () => {
  it('should grant a user access to view all trips from the same on origin', (done) => {
    chai.request(app)
      .get('/api/v1/trips?origin=ilasa')
      .set('x-auth-token', token)
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.typeOf(res.body, 'object');
        done();
      });
  });

  it('should grant a user access to view all trips headed to same destination', (done) => {
    chai.request(app)
      .get('/api/v1/trips?destination=agungu')
      .set('x-auth-token', token)
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.typeOf(res.body, 'object');
        done();
      });
  });
});

describe('POST /buses endpoint', () => {
  it('should not allow a user who is NOT AN ADMIN access to post a bus', (done) => {
    chai.request(app)
      .post('/api/v1/buses')
      .send(bus)
      .set('x-auth-token', token)
      .end((err, res) => {
        assert.equal(res.status, 403);
        assert.typeOf(res.body, 'object');
        assert.equal(res.body.error, 'ACCESS DENIED, YOU ARE NOT AN ADMIN');
        done();
      });
  });
});

describe('POST /trips endpoint', () => {
  it('should not allow a user who is NOT AN ADMIN access to create a trip', (done) => {
    chai.request(app)
      .post('/api/v1/trips')
      .send(trip)
      .set('x-auth-token', token)
      .end((err, res) => {
        assert.equal(res.status, 403);
        assert.typeOf(res.body, 'object');
        assert.equal(res.body.error, 'ACCESS DENIED, YOU ARE NOT AN ADMIN');
        done();
      });
  });
});


describe('PATCH /trips endpoint', () => {
  it('should NOT ALLOW a user who is NOT an ADMIN access to CANCEL a trip', (done) => {
    chai.request(app)
      .patch('/api/v1/trips/1')
      .set('x-auth-token', token)
      .send({ status: 'cancelled' })
      .end((err, res) => {
        assert.equal(res.status, 403);
        assert.typeOf(res.body, 'object');
        assert.equal(res.body.error, 'ACCESS DENIED, YOU ARE NOT AN ADMIN');
        done();
      });
  });
});

describe('POST /bookings endpoint', () => {
  it('should allow a user access to place a booking', (done) => {
    chai.request(app)
      .post('/api/v1/bookings')
      .set('x-auth-token', token)
      .send(booking)
      .end((err, res) => {
        assert.equal(res.status, 201);
        assert.typeOf(res.body, 'object');
        console.log('RES.BODY===BOOKIN: ', res.body);
        assert.equal(res.body.data.email, 'test@domain.com');
        done();
      });
  });
});

describe('POST /bookings endpoint', () => {
  it('should RETURN if the booking is already accepted, to avoid multiple instances of same booking ', (done) => {
    chai.request(app)
      .post('/api/v1/bookings')
      .set('x-auth-token', token)
      .send(booking)
      .end((err, res) => {
        assert.equal(res.status, 400);
        assert.typeOf(res.body, 'object');
        assert.equal(res.body.error, 'Booking with this Email and Trip Id already made');
        done();
      });
  });
});


describe('GET /bookings endpoint', () => {
  it('should allow a user access to view only THEIR booking(s)', (done) => {
    chai.request(app)
      .get('/api/v1/users/2/bookings')
      .set('x-auth-token', token)
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.typeOf(res.body, 'object');
        done();
      });
  });
});

describe('DELETE /bookings endpoint', () => {
  it('should allow a user access to DELETE only THEIR booking(s)', (done) => {
    chai.request(app)
      .delete('/api/v1/bookings/1')
      .set('x-auth-token', token)
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.typeOf(res.body, 'object');
        assert.equal(res.body.error, 'Booking deleted successfully');
        done();
      });
  });
});

describe('user DELETE /trips endpoint', () => {
  it('should NOT allow a user who is NOT an ADMIN access to DELETE a trip', (done) => {
    chai.request(app)
      .delete('/api/v1/trips/2')
      .set('x-auth-token', token)
      .end((err, res) => {
        assert.equal(res.status, 403);
        assert.typeOf(res.body, 'object');
        assert.equal(res.body.error, 'ACCESS DENIED, YOU ARE NOT AN ADMIN');
        done();
      });
  });
});
