'use strict';

import { VALIDATION_ERROR_CODE } from '../configs/status-codes';
import { VALIDATION_ERROR } from '../configs/response-messages';

export default class ValidationError extends Error {

    status = VALIDATION_ERROR_CODE;
    message = VALIDATION_ERROR;
    errors;

    constructor(errors) {
        super();
        this.errors = errors;
    }
}
