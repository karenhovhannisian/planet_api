import { apiURL, planetApiUrl, port, refreshSecret, tokenSecret } from "../helpers/config";

const params = {
    development: {
        apiUrl: apiURL,
        apiPort: port,
        tokenSecret: tokenSecret,
        refreshSecret: refreshSecret,
        planetApiUrl: planetApiUrl
    },
    production: {
        apiUrl: apiURL,
        apiPort: port,
        tokenSecret: tokenSecret,
        refreshSecret: refreshSecret,
        planetApiUrl: planetApiUrl
    },
    test: {
        apiUrl: apiURL,
        apiPort: port,
        appUrl: 'http://localhost:3000',
        tokenSecret: tokenSecret,
        refreshSecret: refreshSecret,
        planetApiUrl: planetApiUrl
    }
};

export default params[process.env.NODE_ENV || 'development'];
