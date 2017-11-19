import Sequelize from 'sequelize';
import bcrypt from 'bcrypt';

import sequelize from '../index';

// type UserType = {
//    firstName: string,
//    lastName: string
// };

const User = sequelize.define('user', {
    firstName: {
        type: Sequelize.STRING,
    },
    lastName: {
        type: Sequelize.STRING,
    },
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
    User.sync({ force: true }).then(() => {
        bcrypt.hash('dupa', 10, (err, hash) => {
            User.create({
                firstName: 'Adam',
                lastName: 'Gajzlerowicz',
                username: 'nelf',
                password: hash,
                email: 'nelf86@gmail.com',
            });
        });

        bcrypt.hash('dupa', 10, (err, hash) => {
            User.create({
                firstName: 'John',
                lastName: 'Hancock',
                username: 'jh',
                password: hash,
            });
        });
    });
}


export default User;
