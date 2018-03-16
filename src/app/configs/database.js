'use strict';

const database = {
    development: {
        client: 'mysql',
        connection: {
            host: 'localhost',
                user: '',
            password: '',
            database: '',
            charset: 'utf8'
        },
        seeds: {
            directory: './src/database/seeders'
        },
        migrations: {
            tableName: 'migrations',
            directory: './src/database/migrations'
        }
    },
    production: {
        client: 'mysql',
        connection: {
            host: '127.0.0.1',
            user: '',
            password: '',
            database: '',
            charset: 'utf8'
        },
        seeds: {
            directory: './src/database/production_seeders'
        },
        migrations: {
            tableName: 'migrations',
            directory: './src/database/migrations'
        }
    }
};

export default database[process.env.NODE_ENV || 'development'];
