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
  year_manufactured: '2017',
  capacity: 35
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
        assert.equal(res.body.data.message, 'Incorrect Credentials');
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

describe('GET /trips', () => {
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

describe('POST /trips endpoint', () => {
  it('should not allow a user who is NOT AN ADMIN access to create a trip', (done) => {
    chai.request(app)
      .post('/api/v1/trips')
      .send(trip)
      .set('x-auth-token', token)
      .end((err, res) => {
        assert.equal(res.status, 403);
        assert.typeOf(res.body, 'object');
        assert.equal(res.body.data.message, 'ACCESS DENIED, YOU ARE NOT AN ADMIN');
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
        assert.equal(res.body.data.message, 'ACCESS DENIED, YOU ARE NOT AN ADMIN');
        done();
      });
  });
});
