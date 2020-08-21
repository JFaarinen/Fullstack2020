const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const api = supertest(app);

const usersInDb = async () => {
    const users = await User.find({});
    return users.map(u => u.toJSON());
}

describe('when there is initially one user at db', () => {
    beforeEach(async () => {
        await User.deleteMany({});
        const passwordHash = await bcrypt.hash('salasana', 10);
        const user = new User({ username: 'king', name: 'henry', passwordHash });
        await user.save();
    });

    test('creation with already used username fails with error code 400', async () => {
        const usersAtStart = await usersInDb();
        const newUser = {
            username: 'king',
            name: 'Duke Nukem',
            password: 'Hail to the King'
        }
        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/);

        const usersAtEnd = await usersInDb();
        expect(usersAtEnd).toHaveLength(usersAtStart.length);

    });

    test('creation with too short username fails with error code 400', async () => {
        const usersAtStart = await usersInDb();
        const newUser = {
            username: 'jf',
            name: 'Juho Faarinen',
            password: 'kalavana'
        }
        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/);

        const usersAtEnd = await usersInDb();
        expect(usersAtEnd).toHaveLength(usersAtStart.length);

    })

    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await usersInDb();

        const newUser = {
            username: 'fjuho',
            name: 'Juho Faarinen',
            password: 'monkeyisland'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/);

        const usersAtEnd = await usersInDb();
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

        const usernames = usersAtEnd.map(u => u.username);
        expect(usernames).toContain(newUser.username);
    });
});

afterAll(() => {
    mongoose.connection.close();
});