import User from '../controllers/users';

export default function (app) {
    app.route('/api/v1/users')
        .get(User.getUsers);

    app.route('/api/v1/users/:id')
        .get(User.getUserById);    
}


