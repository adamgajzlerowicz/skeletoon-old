// @flow
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from '../db/models/user';

type UserType = {
    id: number,
    username: string,
    email: string,
    password: string,
    createdAt: Date,
    updatedAt: Date
};

type SequelProResultType = {
    dataValues: UserType,
    _previousDataValues: UserType,
    _changed: {},
    _modelOptions: {},
    _options: {},
    isNewRecord: boolean
};

type UserReturnType = {
    user: {
        name: string,
        email: string
    },
    token: string
};

const login = async (username: string, password: string): Promise<*> | Error | UserReturnType => {
    const user: ?SequelProResultType = await User.findOne({ where: { username } });
    const userData = user ? user.dataValues : null;

    if (userData) {
        const valid = bcrypt.compareSync(password, userData.password);

        if (!valid) {
            throw new Error('Wrong Credentias');
        }

        const token = jwt.sign(userData, process.env.HASH, {
            expiresIn: 60 * 60 * 24, // expires in 24 hours
        });

        return {
            user: {
                name: userData.username,
                email: userData.email,
            },
            token,
        };
    } else if (!user) {
        throw new Error('Wrong Credentias');
    } else {
        throw new Error('Server error');
    }
};

async function register(username: string, password: string, email: string): Promise<*> | Error | UserReturnType { //eslint-disable-line
    const usernameTest: ?SequelProResultType = await User.findOne({ where: { username } });
    const usernameTestData = usernameTest ? usernameTest.dataValues : null;
    if (usernameTestData) {
        throw new Error('This username is already taken');
    }

    const emailTest: ?SequelProResultType = await User.findOne({ where: { email } });
    const emailTestData = emailTest ? emailTest.dataValues : null;
    if (emailTestData) {
        throw new Error('This email is already taken');
    }

    const hash = bcrypt.hashSync(password, 10);
    const user: ?SequelProResultType = await User.create({ username, password: hash, email });

    if (user) {
        const result = await login(username, password);
        return result;
    }
    throw new Error('Server error');
}


export {
    login, register,
};

