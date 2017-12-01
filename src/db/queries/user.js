// @flow
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from '../models/user';

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


async function checkUser(username: string, password: string, res: $Response): $Response {
    const user: ?SequelProResultType = await User.findOne({ where: { username } });
    const userData = user ? user.dataValues : null;
    if (userData) {
        bcrypt.compare(password, userData.password, (err?: Error, valid: ?boolean): $Response => {
            if (err || !valid) {
                return res.status(403).json({
                    error: 'Wrong credentials',
                });
            }

            const token = jwt.sign(userData, process.env.HASH, {
                expiresIn: 60 * 60 * 24, // expires in 24 hours
            });
            return res.status(200)
                .json({
                    user:
                        {
                            name: userData.username,
                            email: userData.email,
                        },
                    token,
                });
        });
    } else if (!user) {
        return res.status(403).json({
            error: 'Wrong credentials',
        });
    } else {
        return res.status(404);
    }
}

async function createUser(username: string, password: string, res: $Response): $Response {
    const user: ?SequelProResultType = await User.findOne({ where: { username } });
    const userData = user ? user.dataValues : null;
    if (userData) {
        bcrypt.compare(password, userData.password, (err?: Error, valid: ?boolean): $Response => {
            if (err || !valid) {
                return res.status(403).json({
                    error: 'Wrong credentials',
                });
            }

            const token = jwt.sign(userData, process.env.HASH, {
                expiresIn: 60 * 60 * 24, // expires in 24 hours
            });
            return res.status(200)
                .json({
                    user:
                        {
                            name: userData.username,
                            email: userData.email,
                        },
                    token,
                });
        });
    } else if (!user) {
        return res.status(403).json({
            error: 'Wrong credentials',
        });
    } else {
        return res.status(404);
    }
}

export {
    checkUser, createUser,
};

