import Auth from '../controllers/auth';
import verifyToken from '../middleware/verifyToken';


export default function (app) {
    app.route('/api/v1/auth/signup')
        .post(Auth.postUser);
        
    app.route('/api/v1/auth/signin')
        .post([verifyToken], Auth.login);
}