import express from 'express';
import cors from 'cors';
import RateLimit from 'express-rate-limit';
import passport from 'passport';
import helmet from 'helmet';
import {json, urlencoded} from 'body-parser';
import enableModules from './modules';
import limiter from './configs/limiter';
import corsOptions from './configs/cors';
import params from './configs/params';
import configPassport from './strategies/passport-jwt';
import {BAD_REQUEST_CODE} from './configs/status-codes';
import cookieParser from 'cookie-parser';
import expressValidator from 'express-validator';
import {ServiceUnavailable} from './errors';

class Application {
    app;
    router;

    constructor () {
        this.app = express();
        this.initApp();
    }
    initApp() {
        this.configApp();
        this.configPassport();
        this.setParams();
        this.setRouter();
        this.setErrorHandler();
        this.enableModules();
    }

    configApp() {
        this.app.use(cors(corsOptions))
            .use(this.createLimiter())
            .use(json())
            .use(expressValidator())
            .use(urlencoded({ extended: true }))
            .use(cookieParser())
            .use(helmet());
    }

    createLimiter() {
        return new RateLimit(limiter);
    }

    setParams() {
        this.app.set('json spaces', 4);
    }

    configPassport() {
        configPassport(params.tokenSecret, passport);
        this.app.use(passport.initialize())
            .use(passport.session());
    }

    setRouter() {
        this.router = express.Router();
        this.app.use(`/api`, this.router);
    }

    setErrorHandler() {
        this.app.use(async (err, req, res, next) => {
            if(!err.status) {
                next(new ServiceUnavailable(err.message));
            }

            let status = err.status || BAD_REQUEST_CODE;

            return res.status (status).json({
                status: status,
                data: null,
                message: err.message || '',
                errors: err.errors || null,
                body: req.body
            });
        });
    }

    enableModules() {
        enableModules(this.router);
    }
}

export default () => new Application().app;
