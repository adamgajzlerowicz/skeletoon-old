// @flow

import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import bodyParser from 'body-parser';

import type { $Request, $Response } from 'express';
// $FlowFixMe
import { hash } from '../.env.json';
import User from './db/models/user';


const port = process.env.PORT || 8080;
const path = require('path');


const app = express();

app.use(bodyParser.urlencoded({
    extended: true,
}));

app.use(bodyParser.json());


app.post('/auth/login', (req: $Request, res: $Response): $Response => {
    const { body: { username, password } } = req;

    if (!username) {
        return res.status(403).json({
            error: 'Username is missing',
        });
    }

    if (!password) {
        return res.status(403).json({
            error: 'Password is missing',
        });
    }

    User.findOne({ where: { username } })
        .then((user): $Response => {
            console.log(user);
            if (!user) {
                return res.status(403).json({
                    error: 'Wrong credentials',
                });
            }

            bcrypt.compare(password, user.dataValues.password, (err, valid: ?boolean): $Response => {
                if (err || !valid) {
                    return res.status(403).json({
                        error: 'Wrong credentials',
                    });
                }

                const token = jwt.sign(user.dataValues, hash, {
                    expiresIn: 60 * 60 * 24, // expires in 24 hours
                });
                return res.status(200).json({ user: { name: user.dataValues.username, email: user.dataValues.email }, token });
            });

            return res.status(404);
        });
});

app.use('/static', express.static(path.join(__dirname, '../build/static')));

app.all('*', (req: $Request, res: $Response) => {
    res.sendFile(path.join(`${__dirname}/../build/index.html`));
});


app.listen(port);
// eslint-disable-next-line
console.log(`http://localhost:${port}`);
