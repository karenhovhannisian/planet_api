'use strict';

import { GONE_CODE } from '../configs/status-codes';

export default class Gone extends Error {

    status = GONE_CODE;
    message;
    errors;

    constructor(message, errors = null) {
        super();
        this.message = message;
        this.errors = errors;
    }
}
