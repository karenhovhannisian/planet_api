import { REQUIRED } from '../../configs/messages';

export default {
    comments: {
        validation: {
            'text': {
                in: 'body',
                notEmpty: {
                    errorMessage: REQUIRED('text')
                }
            },
        }
    }
};
