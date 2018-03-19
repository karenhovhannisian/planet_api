import { Model, ValidationError, ref } from 'objection';
import {
    NAME_MAX_LENGTH,
    UNIQUE
} from '../app/configs/messages';

export class Planet extends Model {
    name;

    static tableName = 'planetapp';

    static jsonSchema = {
        type: 'object',
        required: [
            'name'
        ],
        properties: {
            name: {
                type: 'string',
                uniqueItems: true,
                maxLength: NAME_MAX_LENGTH
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

        return PlanetService.getPlanetByName(this.name)
            .then((dbPlanet) => {
                if (dbPlanet && dbPlanet.length > 0) {
                    throw new ValidationError({ name: UNIQUE('name') });
                }

                return dbPlanet;
            });
    }

    $beforeDelete(opt) {

        if (this.id && this.id !== opt.old.id) {
            return PlanetService.getPlanetById(this.id)
                .then(dbPlanet => {
                    if (dbPlanet) {
                        throw new ValidationError({ id: UNIQUE('id') });
                    }

                    return dbPlanet;
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
