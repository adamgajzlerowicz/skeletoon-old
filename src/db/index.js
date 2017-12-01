// @flow

import Sequelize from 'sequelize';

require('dotenv').config({ path: '.env.server.local' });

const DB = process.env.SQL_DB || '';
const SQL_LOGIN = process.env.SQL_LOGIN || '';
const SQL_PASSWORD = process.env.SQL_PASSWORD || '';
const SQL_HOST = process.env.SQL_HOST || '';

const connection = new Sequelize(DB, SQL_LOGIN, SQL_PASSWORD, {
    host: SQL_HOST,
    dialect: 'mysql',

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
});

connection.authenticate()
    .catch((err: {}) => {
        // eslint-disable-next-line
        console.error('Unable to connect to the database:', err);
    });

export {
    connection as default,
};
