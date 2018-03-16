if (process.env.NODE_ENV === 'test') {
    require('dotenv').load({ path: '.env.test' });
} else if (process.env.NODE_ENV !== 'production') {
    require('dotenv').load();
}

import env from 'env-var';

export const databaseUrl = env.get('DATABASE_URL').asString();
export const dbUsername = env.get('PLANET_APP_DB_USERNAME').asString();
export const dbPassword = env.get('PLANET_APP_DB_PASSWORD').asString();
export const dbDatabase = env.get('PLANET_APP_DB_DATABASE').asString();
export const dbHost = env.get('PLANET_APP_DB_HOST').asString();
export const planetApiUrl = env.get('PLANET_APP_PLANET_API_URL').asString();

export const apiURL = env.get('PLANET_APP_API_URL').asString();
export const port = env.get('PORT').asInt();
export const tokenSecret = env.get('PLANET_APP_TOKEN_SECRET').required()
    .asString();
export const refreshSecret = env.get('PLANET_APP_REFRESH_SECRET').required()
    .asString();
