'use strict';

import { BAD_REQUEST_CODE } from '../configs/status-codes';
import { SOMETHING_WENT_WRONG } from '../configs/response-messages';
import params from '../configs/params';
import File from '../helpers/file';
import * as moment from 'moment';

export default class ServiceUnavailable extends Error {
    status = BAD_REQUEST_CODE;
    message = SOMETHING_WENT_WRONG;
    errors;

    constructor(message, errors = null) {
        super();

        if (errors) {
            this.message = message;
            this.errors = errors;
        } else {
            if (typeof message === 'string') {
                this.message = message;
            } else {
                this.errors = message;
            }
        }

        const file = new File(params.logFile, 'a+');

        file.open().then(() => {
            file.read().then((content) => {
                const log =
                    `Date and Time: ${moment().format('YYYY-MM-DD HH:mm:ss')}
                     Actual Status: ${this.errors ? this.errors.status : 'no status'}
                     Developer Message: ${this.message}
                     Error Message: ${this.errors ? this.errors.message : ''}`;

                const newContent = content ? `${content}\n\n${log}` : log;
                file.replaceContent(newContent).then(() => {
                    console.dir('Loged', {colors: true, depth: 10});
                });
            });
        });
    }
}