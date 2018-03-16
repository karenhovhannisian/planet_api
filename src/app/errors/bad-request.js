'use strict';

import { BAD_REQUEST_CODE } from '../configs/status-codes';

export class BadRequest extends Error {
    status = BAD_REQUEST_CODE;
    message;
    errors;

    constructor(message, errors = null) {
        super();
        this.message = message;
        this.errors = errors;
    }
}
