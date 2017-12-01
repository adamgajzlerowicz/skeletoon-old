// @flow

import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import bodyParser from 'body-parser';

import type { $Request, $Response } from 'express';
import User from './db/models/user';
import { login, register } from './auth/user';

const port = process.env.PORT || 8080;
const path = require('path');

require('dotenv').config({ path: '.env.server.local' });

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

const app = express();

const validateEmail = (email: string): boolean => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

const isStrongPassword = (password: string): boolean => {
    const regExp = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%&*()]).{8,}/;
    return regExp.test(password);
};

app.use(bodyParser.urlencoded({
    extended: true,
}));

app.use(bodyParser.json());


app.post('/rest/auth/login', async (req: $Request, res: $Response): $Response => {
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

    try {
        const user = await login(username, password);
        return res.status(200)
            .json(user);
    } catch (e) {
        return res.status(e === 'Server error' ? 404 : 403).json({
            error: e,
        });
    }
});


app.post('/rest/auth/register', async (req: $Request, res: $Response): $Response => {
    const { body: { username, password, email } } = req;

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

    if (!email || !validateEmail(email)) {
        return res.status(403).json({
            error: 'Email format is incorrect',
        });
    }

    if (!isStrongPassword(password)) {
        return res.status(403).json({
            error: 'Password is not complex enough',
        });
    }
    try {
        const user = await register(username, password, email);
        return res.status(200)
            .json(user);
    } catch (e) {
        return res.status(403).json({
            error: e,
        });
    }
});

app.use('/static', express.static(path.join(__dirname, '../build/static')));

app.all('*', (req: $Request, res: $Response) => {
    res.sendFile(path.join(`${__dirname}/../build/index.html`));
});


app.listen(port);
// eslint-disable-next-line
console.log(`http://localhost:${port}`);
