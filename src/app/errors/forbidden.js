'use strict';

import { FORBIDDEN_CODE } from '../configs/status-codes';
import { PERMISSION_DENIED } from '../configs/response-messages';

export class Forbidden extends Error {

    status = FORBIDDEN_CODE;
    message = PERMISSION_DENIED;
    errors;

    constructor ( errors = null) {
        super();
        this.errors = errors;
    }
}
