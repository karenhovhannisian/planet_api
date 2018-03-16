import {Model, ValidationError} from 'objection';
import {compareSync, genSaltSync, hashSync} from 'bcryptjs'
import {
    EMAIL_MAX_LENGTH,
    NAME_MAX_LENGTH,
    PASSWORD_MAX_LENGTH,
    PASSWORD_MIN_LENGTH,
    UNIQUE
} from '../app/configs/messages';

export class User extends Model {
    id;
    name;
    email;
    password;
    active;

    static tableName = 'users';

    static jsonSchema = {
        type: 'object',
        required: [
            'name',
            'email',
            'password'
        ],
        properties: {
            id: {
                type: 'integer'
            },
            name: {
                type: 'string',
                maxLength: NAME_MAX_LENGTH
            },
            email: {
                type: 'string',
                uniqueItems: true,
                maxLength: EMAIL_MAX_LENGTH
            },
            password: {
                type: 'string',
                minLength: PASSWORD_MIN_LENGTH,
                maxLength: PASSWORD_MAX_LENGTH
            },
            active: {
                type: 'integer'
            },
            created_at: {
                type: 'date'
            },
            updated_at: {
                type: 'date'
            }
        }
    };

    constructor() {
        super();
    }

    hashPassword() {
        this.password = hashSync(this.password, genSaltSync(8));
    }

    validatePassword(dbPass) {
        return compareSync(dbPass, this.password);
    }

    $beforeInsert() {
        this.hashPassword();

        return UserService.getUserByEmail(this.email)
            .then((dbUser) => {
                if (dbUser && dbUser.length > 0) {
                    throw new ValidationError({ email: UNIQUE('Email') });
                }

                return dbUser;
            });
    }

    $beforeUpdate(opt) {
        if (this.password) {
            this.hashPassword();
        }

        if (this.email && this.email !== opt.old.email) {
            return UserService.getUserByEmail(this.email)
                .then(dbUser => {
                    if (dbUser) {
                        throw new ValidationError({ email: UNIQUE('Email') });
                    }

                    return dbUser;
                });
        }
    }

    getFields() {
        return [
            'id',
            'name',
            'email',
            'active',
        ];
    }
}
