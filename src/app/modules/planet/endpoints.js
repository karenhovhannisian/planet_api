import { PlanetController } from './planet.controller.js';
import middlewares from '../../middlewares';
import schemas from './schemas';




export default (router) => {
    const {
        planetC
    } = PlanetController;

    router.post('/planetC', ...middlewares(schemas, 'planetC'), planetC);
    router.get('/planetC', ...middlewares(schemas, 'planetC'), planetC);
    router.delete('/planetC', ...middlewares(schemas, 'planetC'), planetC);
};
