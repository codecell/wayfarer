import Auth from './../controllers/auth';

export default function (app) {
    app.route('/api/v1/auth/signup')
        .post(Auth.postUser);        
}