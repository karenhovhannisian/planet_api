
import { PlanetController } from './comment.controller.js';
import middlewares from '../../middlewares';
import schemas from './schemas';

export default (router) => {
    const {
        comment
    } = CommentController;

    router.post('/comment', ...middlewares(schemas, 'comment'), comment);
    router.get('/comment', ...middlewares(schemas, 'comment'), comment);
};
