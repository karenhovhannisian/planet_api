import {
    dbHost,
    dbUsername,
    dbPassword,
    dbDatabase,
    databaseUrl
} from '../helpers/config';

let connection = {
    host: dbHost,
    user: dbUsername,
    password: dbPassword,
    database: dbDatabase,
    charset: 'utf8'
};

if (typeof(databaseUrl) !== 'undefined' && databaseUrl !== '') {
    connection = databaseUrl;
}

export default {
    client: 'pg',
    connection,
    seeds: {
        directory: './src/database/seeders'
    },
    migrations: {
        tableName: 'migrations',
        directory: './src/database/migrations'
    }
};
