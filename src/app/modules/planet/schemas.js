import { REQUIRED } from '../../configs/messages';

export default {
    planets: {
        validation: {
            'name': {
                in: 'body',
                notEmpty: {
                    errorMessage: REQUIRED('name')
                }
            },
        }
    }
};
