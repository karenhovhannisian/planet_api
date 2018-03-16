import { AuthModule } from './auth/index';

export default (router) => {

    const auth = new AuthModule(router);
    const modules = [
        auth
    ];

    modules.forEach((module) => module.createEndpoints());
}
