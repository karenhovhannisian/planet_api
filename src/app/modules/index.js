import { AuthModule } from './auth/index';
import { PlanetModule } from './planet/index';
import { CommentModule } from './comment';

export default (router) => {

    const auth = new AuthModule(router);
    const modules = [
        auth
    ];

    modules.forEach((module) => module.createEndpoints());
}


module.export = (router) => {

    const planet = new PlanetModule(router);
    const modules = [
        planet
    ];

    modules.forEach((module) => module.createEndpoints());
}

module.export = (router) => {

    const comment = new CommentModule(router);
    const modules = [
        comment
    ];

    modules.forEach((module) => module.createEndpoints());
}
