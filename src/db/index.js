// @flow

import Sequelize from 'sequelize';

// $FlowFixMe
import { sqlHost, sqlLogin, sqlPassword, sqlDB } from '../../.env.json';

const DB = new Sequelize(sqlDB, sqlLogin, sqlPassword, {
    host: sqlHost,
    dialect: 'mysql',

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
});

DB.authenticate()
    .catch((err: string) => {
        // eslint-disable-next-line
        console.error('Unable to connect to the database:', err);
    });

export {
    DB as default,
};
