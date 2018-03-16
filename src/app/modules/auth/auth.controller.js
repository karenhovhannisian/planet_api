import {SUCCESS_CODE} from '../../configs/status-codes';
import {BadRequest,} from '../../errors';
import {MERCHANT_ENUM, REFRESH_TOKEN_COOKIE_CONFIG, USER_NOT_EXIST} from '../../configs/messages';
import {User} from '../../../models';
import {UserService} from '../../services';
import Utils from '../../helpers/utils';

export class AuthController {

    /**
     * Sign In User to the app.
     *
     * @param req
     * @param res
     * @param next
     * @returns {Promise.<*>}
     */
    static async login(req, res, next) {
        const { email, password } = req.body;

        let user;
        try {
            // Check if user exists by given email
            user = await UserService.getUserByEmail(email);

            // Check password
            if (!user || !(user instanceof User) || !user.validatePassword(password) || user.role === MERCHANT_ENUM) {
                return next(new BadRequest(USER_NOT_EXIST));
            }

            const tokenInfo = Utils.signJWTToken(user);
            res.cookie('refresh_token', tokenInfo.refreshToken, REFRESH_TOKEN_COOKIE_CONFIG);

            const customer = await UserService.getCustomerByUser(user);

            return res.status(SUCCESS_CODE).json({
                access_token: tokenInfo.token,
                refresh_token: tokenInfo.refreshToken,
                user: {
                    id: user.id,
                    name: user.name,
                    status: user.status,
                    email: user.email
                }
            });
        }
        catch (err) {
            return next(err);
        }
    }

}
