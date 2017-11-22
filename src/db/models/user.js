import Sequelize from 'sequelize';
import bcrypt from 'bcrypt';

import sequelize from '../index';

const User = sequelize.define('user', {
    username: {
        type: Sequelize.STRING,
    },
    email: {
        type: Sequelize.STRING,
    },
    password: {
        type: Sequelize.STRING,
    },
});

if (process.env.SEED) {
    /* eslint-disable */
    User.sync({ force: true }).then(() => {
        bcrypt.hash('dupa', 10, (err, hash) => {
            User.create({
                username: 'nelf',
                password: hash,
                email: 'nelf86@gmail.com',
            });
        });

        bcrypt.hash('dupa', 10, (err, hash) => { 
            User.create({
                username: 'jh',
                password: hash,
            });
        });
    });
    /* eslint-enable */
}


export default User;
