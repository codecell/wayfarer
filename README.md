[![Build Status](https://travis-ci.org/codecell/wayfarer.svg?branch=develop)](https://travis-ci.org/codecell/wayfarer) <a href="https://codeclimate.com/github/codecell/wayfarer/maintainability"><img src="https://api.codeclimate.com/v1/badges/11c37e220fbf05e79456/maintainability" /></a> [![Coverage Status](https://coveralls.io/repos/github/codecell/wayfarer/badge.svg?branch=ch-setup-swagger-docs-167270588)](https://coveralls.io/github/codecell/wayfarer?branch=ch-setup-swagger-docs-167270588)

# wayfarer
WayFarer is a public bus transportation booking server. Users can view a list of trips and make bookings.

[Click here](https://alfrednoble-wayfarer.herokuapp.com/api/v1) to view the app on heroku.

## Features

The app has three levels of authorization;
- A client can
    - view public documents on the website
    - signup for an account to use the service

- A normal user can:
    - view the list of available trips
    - search trips by origin or destination
    - make bookings
    - view all bookings made by them
    - delete their bookings 
    - signin into their accounts.

- An admin user has all the privileges of a regular user but the admin can also perform the following actions:
    - view all users.
    - post(create) buses that can be used for the trips
    - the admin can also view, update and remove a bus 
    - create trips that users can book from
    - cancel a trip

## Technologies
The application was developed with [NodeJs](http://nodejs.org/), [Express](http://expressjs.com/) was used for routing and [Postgres](http://postgresql.com/)  for database management.

## Installation
Follow the steps below to setup a local development environment. First ensure you have [Postgresql](https://www.postgresql.org/) installed, and a version of [Node.js](http://nodejs.org/) equal or greater than v6.10.0 .

1. Clone the repository from a terminal `https://github.com/codecell/wayfarer.git`.
2. Navigate to the project directory `cd wayfarer`
3. Rename `.env_sample` to `.env` and add the required DATABASE settings(DB_PROD, ...).
4. Install project dependencies `npm install`
5. Start the express server `npm run start:dev` if in development.

## Testing
Ensure that project dependencies are installed before running tests.

### Server and Client tests
1. Open a terminal and navigate to the project directory
2. Add a test database url (DB_TEST) to the `.env` file.
3. Run `npm run test`

## API Summary
View full API documentation [here](https://alfrednoble-wayfarer.herokuapp.com/api-docs/)

### Auth
EndPoint                      |   Functionality
------------------------------|------------------------
POST api/v1/auth/signup       |   Allows a client to create an account.
POST api/v1/auth/signin       |   signs in a user.

### Users
EndPoint                      |   Functionality
------------------------------|------------------------
GET api/v1/users              |   Allows an admin to view all users.
GET api/v1/users/:userId      |   Allows an admin to view a specific user.

### Buses
EndPoint                      |   Functionality
------------------------------|------------------------
POST api/v1/buses             |   Allows an admin to post a bus.
GET api/v1/buses              |   Allows an admin to view all buses.
GET api/v1/buses/:busId       |   Allows an admin to view a specific bus.
PATCH api/v1/buses/:busId     |   Allows an admin to update a specific bus.
DELETE api/v1/buses/:busId    |   Allows an admin to delete a specific bus

### Trips
EndPoint                       |   Functionality
-------------------------------|------------------------
POST api/v1/trips              |   Allows an admin to create a trip.
GET api/v1/trips               |   Allows users to view all trips.
GET api/v1/trips/:tripId       |   Allows an admin to view a specific trip.
GET search/trips?q=${query}    |   Allows users get trips from the same origin or the ones headed for same destination. 
PATCH api/v1/trips/:tripId     |   Allows an admin to cancel a specific trip.
DELETE api/v1/trips/:tripId    |   Allows an admin to delete a specific trip

### Bookings
EndPoint                             |   Functionality
-------------------------------------|------------------------
POST api/v1/bookings                 |   Allows user to make a booking.
GET api/v1/bookings                  |   Allows an admin to view all bookings & allows a user to view all of his/her bookings only.  
DELETE api/v1/bookings/:bookingId    |   Allows user to delete their bookings only.

### Limitations
Currently, this app can only handle server side requests, but i hope to make its user interface soon.


### Contributing
Contributions are most welcome. Simply fork the repository, work on the feature and raise a PR.

### Licence
MIT