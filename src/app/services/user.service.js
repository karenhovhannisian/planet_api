import { User, Customer, CustomerInvite } from '../../models';
import {
    APPROVED,
    CUSTOMER_ENUM,
    PENDING,
    SEND_REMINDERS_FIELDS
} from '../configs/messages';

export class UserService {

    constructor () {}

    static getUserByEmail(email) {
        return User.query().where('email', email)
                .first();
    }

    static getUserById(id) {
        return User.query().findById(id);
    }
}
