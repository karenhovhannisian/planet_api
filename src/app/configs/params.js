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
    }
};

export default params[process.env.NODE_ENV || 'development'];
