const mongoose = require('mongoose');
const supertest = require('supertest');
const bcrypt = require('bcrypt');
const app = require('../app');
const Blog = require('../models/blog');
const testdb = require('./testblogs');
const User = require('../models/user');
const api = supertest(app);

beforeEach(async () => {
    await Blog.deleteMany({});
    await User.deleteMany({});
    console.log('cleared');

    const blogObjects = testdb.map(blog => new Blog(blog));
    const promiseArray = blogObjects.map(blog => blog.save());
    await Promise.all(promiseArray);

    const passwordHash = await bcrypt.hash('salasana', 10);
    const rightUser = new User({
        username: "right",
        name: "Right User",
        passwordHash
    });
    await rightUser.save();


    const wrongUser = new User({
        username: 'wrong',
        name: 'Wrong User',
        passwordHash
    });
    await wrongUser.save();
});


test('blogs are returned as json', async () => {
    const result = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/);

    expect(result.body).toHaveLength(testdb.length);

});

test('identifying field is named id', async () => {
    const response = await api.get('/api/blogs');
    expect(response.body[0].id).toBeDefined();
});

test('a valid blog can be added to the database by authorized user', async () => {
    const user = await api
        .post('/api/login')
        .send({ username: 'right', password: 'salasana' })
        .expect(200);
    const token = 'bearer ' + user.body.token;

    const newBlog = {
        title: 'new blog that is added to the database',
        author: 'Mie Ite',
        url: 'http://www.blogi.fi',
        likes: 0
    }

    await api
        .post('/api/blogs')
        .set('Authorization', token)
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/);

    const response = await api.get('/api/blogs');

    const titles = response.body.map(r => r.title);

    expect(response.body).toHaveLength(testdb.length + 1);
    expect(titles).toContain('new blog that is added to the database');
});

test('trying to add blog without authorization fails with code 401', async () => {

    const newBlog = {
        title: 'new blog that is added to the database',
        author: 'Mie Ite',
        url: 'http://www.blogi.fi',
        likes: 0
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(401)

    const response = await api.get('/api/blogs');

    const titles = response.body.map(r => r.title);

    expect(response.body).toHaveLength(testdb.length);
    expect(titles).not.toContain('new blog that is added to the database');
});

test('a blog with undefined number of likes gets default value of 0', async () => {
    const user = await api
        .post('/api/login')
        .send({ username: 'right', password: 'salasana' })
        .expect(200);
    const token = 'bearer ' + user.body.token;

    const newBlog = {
        title: 'a blog no one likes :(',
        author: 'Some Sadguy',
        url: 'https://www.nobodylikesme.fi/i_hate_you_all.html'
    }

    const response = await api
        .post('/api/blogs')
        .set('Authorization', token)
        .send(newBlog)
        .expect('Content-Type', /application\/json/);

    expect(response.body.likes).toBe(0);
});

test('a put command updates the amount of likes on a blog', async () => {
    const blogToUpdate = testdb[0];
    const update = {
        likes: (blogToUpdate.likes + 1)
    }

    await api
        .put(`/api/blogs/${blogToUpdate._id}`)
        .send(update);

    const response = await api.get(`/api/blogs/${blogToUpdate._id}`);
    expect(response.body.likes).toBe(blogToUpdate.likes + 1);

});

test('a blog with a missing title will cause error: 400 bad request', async () => {
    const user = await api
        .post('/api/login')
        .send({ username: 'right', password: 'salasana' })
        .expect(200);
    const token = 'bearer ' + user.body.token;

    const newBlog = {
        author: 'Anonymous Blogger',
        url: 'https://www.nobodylikesme.fi/i_hate_you_all.html',
        likes: 10000
    }
    await api
        .post('/api/blogs')
        .set('Authorization', token)
        .send(newBlog)
        .expect(400);

});

test('a blog with a missing url will cause error: 400 bad request', async () => {
    const user = await api
        .post('/api/login')
        .send({ username: 'right', password: 'salasana' })
        .expect(200);
    const token = 'bearer ' + user.body.token;

    const newBlog = {
        title: 'The Lost Blog',
        author: 'Absent-Minded Blogger',
        likes: 1
    }
    await api
        .post('/api/blogs')
        .set('Authorization', token)
        .send(newBlog)
        .expect(400);

});

test('deleting a blog with creators token succeeds with status code 204', async () => {
    const blogsAtStart = await api.get('/api/blogs');

    const user = await api
        .post('/api/login')
        .send({ username: 'right', password: 'salasana' })
        .expect(200);
    const token = 'bearer ' + user.body.token;

    const newBlog = {
        title: 'a blog to be deleted :(',
        author: 'Soon Removed',
        url: 'https://www.pleasedestroyme.fi/'
    }

    const blogToDelete = await api
        .post('/api/blogs/')
        .set('Authorization', token)
        .send(newBlog)
        .expect(200);

    await request
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204);

    const blogsAtEnd = await api.get('/api/blogs');
    console.log('BLOGEJA ALUSSA', blogsAtStart.body.length);
    console.log('BLOGEJA LOPUSSA', blogsAtEnd.body.length);
    expect(parseInt(blogsAtEnd.body.length)).toHaveLength(blogsAtStart.body.length);

    const titles = blogsAtEnd.body.map(b => b.title);
    expect(titles).not.toContain(blogToDelete.title);
});

test('deleting a blog with a other than creators token fails with status code 401', async () => {
    const blogsAtStart = await api.get('/api/blogs');

    const rightuser = await api
        .post('/api/login')
        .send({ username: 'right', password: 'salasana' })
        .expect(200);
    const righttoken = 'bearer ' + rightuser.body.token;

    const wronguser = await api
        .post('/api/login')
        .send({ username: 'wrong', password: 'salasana' })
        .expect(200);
    const wrongtoken = 'bearer ' + wronguser.body.token;

    const newBlog = {
        title: 'a blog to be deleted :(',
        author: 'Soon Removed',
        url: 'https://www.pleasedestroyme.fi/'
    }

    const blogToDelete = await api
        .post('/api/blogs/')
        .set('Authorization', righttoken)
        .send(newBlog)
        .expect(200);

    await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(401);

    const titles = blogsAtEnd.body.map(b => b.title);
    expect(titles).toContain(blogToDelete.title);
});

test('deleting of a blog without token fails with status code 401', async () => {
    const blogsAtStart = await api.get('/api/blogs');
    const blogToDelete = blogsAtStart.body[0];

    await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(401);

    const blogsAtEnd = await api.get('/api/blogs');
    expect(blogsAtEnd.body).toHaveLength(testdb.length);

    const titles = blogsAtEnd.body.map(b => b.title);
    expect(titles).toContain(blogToDelete.title);
});

afterAll(() => {
    mongoose.connection.close();
});