// @flow

import Sequelize from 'sequelize';

require('dotenv').config({ path: '.env.server.local' });

const DB = new Sequelize(process.env.SQL_DB, process.env.SQL_LOGIN, process.env.SQL_PASSWORD, {
    host: process.env.SQL_HOST,
    dialect: 'mysql',

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
});

DB.authenticate()
    .catch((err: RuntimeTypeError) => {
        // eslint-disable-next-line
        console.error('Unable to connect to the database:', err);
    });

export {
    DB as default,
};
