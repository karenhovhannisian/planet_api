import { Planet, Customer, CustomerInvite } from '../../models';
// import {
//     APPROVED,
//     CUSTOMER_ENUM,
//     PENDING,
//     SEND_REMINDERS_FIELDS
// } from '../configs/messages';

export class PlanetService {

    constructor() { }

    static getPlanet() {
        return Planet.query().where()
        // .select(ref('user'))
        // .limit(10)
        // .offset(30)
    }
    static getPlanetById() {
        return Planet.query().findById(id)
    }
}
