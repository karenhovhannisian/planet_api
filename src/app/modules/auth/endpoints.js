import { AuthController } from './auth.controller.js';
import middlewares from '../../middlewares';
import schemas from './schemas';

export default (router) => {
    const {
        login
    } = AuthController;

    router.post('/login', ...middlewares(schemas, 'login'), login);
};
