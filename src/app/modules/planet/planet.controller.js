import { SUCCESS_CODE } from '../../configs/status-codes';
import { PlanetService } from '../../services';

export class PlanetController {

    static async planetC(req, res, next) {
        const { name } = req.body;
        let planet;
        try {
            // Check if planet exists by given name
            planet = await PlanetService.getPlanet();

            return res.status(SUCCESS_CODE).json({
                planet: {
                    name: this.planet.name
                }
            });
        }
        catch (err) {
            return next(err);
        }
    }
}