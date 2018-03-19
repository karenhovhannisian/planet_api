import { Comment, Customer, CustomerInvite } from '../../models';
// import {
//     APPROVED,
//     CUSTOMER_ENUM,
//     PENDING,
//     SEND_REMINDERS_FIELDS
// } from '../configs/messages';

export class CommentService {

    constructor() { }

    static getComment() {
        return Comment.query().where()
    }
}
