import { SUCCESS_CODE } from '../../configs/status-codes';
import * as jwt from 'jsonwebtoken';
import params from '../../configs/params';
import { BadRequest } from '../../errors/bad-request';
import AuthError from '../../errors/auth-error';
import { INVALID_BASE64, INVALID_REFRESH_TOKEN, USER_NOT_EXIST, INVALID_AUTHORIZATION_HEADER
} from '../../configs/response-messages';
import User from '../../../models/user';
// import File from '../../helpers/file';
// import ServiceUnavailable from '../../errors/service-unavailable';
// import moment from 'moment';

export class UserController {

    static async getUser(req, res, next) {
        const userId = req.user.id;
        // const authHeader = req.header('Authorization') || '';
        // let baseToken,
        //     data;
        let user = undefined;
        // if (!authHeader.includes(' ')) {
        //     return next(new AuthError(INVALID_AUTHORIZATION_HEADER));
        // }
        // if (typeof authHeader === 'string') {
        //     baseToken = authHeader.split(' ')[1];
        // }

        if (!userId) {
            return next(new BadRequest(USER_NOT_EXIST));
        } else {
            user = await User.query().where('users.id', userId).first();
        }
        if (!user || !(user instanceof User)) {
            return next(new BadRequest(USER_NOT_EXIST));
        }
        //
        // if (baseToken) {
        //     const file = new File(params.blackListFile, 'a+');
        //     try {
        //         await file.open();
        //         data = await file.read();
        //     } catch (error) {
        //         return next(new ServiceUnavailable({message: error.message}));
        //     }
        //     if (data) {
        //         data = `${data}\n${baseToken} - ${moment().format('YYYY-MM-DD HH:mm:ss')}`;
        //     } else {
        //         data = `${baseToken} - ${moment().format('YYYY-MM-DD HH:mm:ss')}`;
        //     }
        //     try {
        //         await file.replaceContent(data);
        //     } catch (error) {
        //         return next(new ServiceUnavailable({message: error.message}));
        //     }
        // }
        return res.status(SUCCESS_CODE).json({
            id: user.id,
            name: user.name,
            email: user.email
        });
    }
}
