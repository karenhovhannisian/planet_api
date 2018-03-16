'use strict';

import { Model } from 'objection';
import User from './user';
import { ACTIVATION_REASON, PASSWORD_RESET_REASON } from '../app/configs/constants';

export default class Token extends Model {
    id;
    user_id;
    token;
    expiration;
    reason;
    user;

    static tableName = 'user_tokens';

    static jsonSchema = {
        type: 'object',
        required: [
            'token',
            'expiration',
            'reason'
        ],
        properties: {
            id: {
                type: 'integer'
            },
            user_id: {
                type: 'number'
            },
            token: {
                type: 'string'
            },
            expiration: {
                type: 'string'
            },
            reason: {
                'enum': [
                    ACTIVATION_REASON,
                    PASSWORD_RESET_REASON
                ]
            }
        }
    };

    static relationMappings = {
        user: {
            relation: Model.HasOneRelation,
            modelClass: User,
            join: {
                from: 'user_tokens.user_id',
                to: 'users.id'
            }
        }
    };
}
