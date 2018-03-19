import { Model, ValidationError, ref } from 'objection';
import {
    UNIQUE
} from '../app/configs/messages';

export class Comment extends Model {
    name;

    static tableName = 'comment';

    static jsonSchema = {
        type: 'object',
        required: [
            'name'
        ],
        properties: {
            text: {
                type: 'string'
            },
            id: {
                type: 'integer',
                uniqueItems: true
            },
            // author: {
            //     type: Schema.ObjectId,
            //     ref: 'user'
            // },
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

    $beforeInsert() {

        return CommentService.getCommentById(this.id)
            .then((dbComment) => {
                if (dbComment && dbComment.length > 0) {
                    throw new ValidationError({ id: UNIQUE('id') });
                }

                return dbComment;
            });
    }

    $beforeDelete(opt) {

        if (this.id && this.id !== opt.old.id) {
            return CommentService.getCommentById(this.id)
                .then(dbComment => {
                    if (dbComment) {
                        throw new ValidationError({ id: UNIQUE('id') });
                    }

                    return dbComment;
                });
        }
    }

    getFields() {
        return [
            'id',
            'name'
        ];
    }
}
