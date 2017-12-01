// @flow

import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import bodyParser from 'body-parser';

import type { $Request, $Response } from 'express';
import User from './db/models/user';
import { checkUser } from './db/queries/user';

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
        const result = await checkUser(username, password, res);
        return result;
    } catch (e) {
        console.log('catching');
    }
});


app.post('/rest/auth/register', (req: $Request, res: $Response): $Response => {
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

    if (!email) {
        return res.status(403).json({
            error: 'Email is missing',
        });
    }
    return checkUser(username, password, res);
});

app.use('/static', express.static(path.join(__dirname, '../build/static')));

app.all('*', (req: $Request, res: $Response) => {
    res.sendFile(path.join(`${__dirname}/../build/index.html`));
});


app.listen(port);
// eslint-disable-next-line
console.log(`http://localhost:${port}`);
