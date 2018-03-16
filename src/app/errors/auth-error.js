'use strict';

import { UNAUTHORIZED_CODE } from '../configs/status-codes';

export default class AuthError extends Error {
    status = UNAUTHORIZED_CODE;
    message;
    errors;

    constructor(message, errors = null) {
        super();
        this.message = message;
        this.errors = errors;
    }
}
