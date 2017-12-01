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

type ResponseType = {
    user: {
        name: string,
        email: string
    },
    token: string
};


async function login(username: string, password: string): ResponseType {
    const user: ?SequelProResultType = await User.findOne({ where: { username } });
    const userData = user ? user.dataValues : null;
    if (userData) {
        const valid = bcrypt.compareSync(password, userData.password);

        if (!valid) {
            throw 'Wrong Credentias';
        }

        const token = jwt.sign(userData, process.env.HASH, {
            expiresIn: 60 * 60 * 24, // expires in 24 hours
        });

        return {
            user:
                {
                    name: userData.username,
                    email: userData.email,
                },
            token,
        };
    } else if (!user) {
        throw 'Wrong Credentias';
    } else {
        throw 'Server error';
    }
}

// async function register(username: string, password: string, ): $Response {
//     const user: ?SequelProResultType = await User.findOne({ where: { username } });
//     const userData = user ? user.dataValues : null;
//     if (userData) {
//         bcrypt.compare(password, userData.password, (err?: Error, valid: ?boolean): $Response => {
//             if (err || !valid) {
//                 return res.status(403).json({
//                     error: 'Wrong credentials',
//                 });
//             }

//             const token = jwt.sign(userData, process.env.HASH, {
//                 expiresIn: 60 * 60 * 24, // expires in 24 hours
//             });
//             return res.status(200)
//                 .json({
//                     user:
//                         {
//                             name: userData.username,
//                             email: userData.email,
//                         },
//                     token,
//                 });
//         });
//     } else if (!user) {
//         return res.status(403).json({
//             error: 'Wrong credentials',
//         });
//     } else {
//         return res.status(404);
//     }
// }

export {
    login, // register,
};

