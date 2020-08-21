const blogsRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const Blog = require('../models/blog');
const User = require('../models/user');
const { request, response } = require('express');

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
        .find({})
        .populate('user', { username: 1, name: 1, id: 1 });
    response.json(blogs.map(blog => blog.toJSON()));

});

blogsRouter.get('/:id', async (request, response, next) => {
    const blog = await Blog.findById(request.params.id);
    if (blog) {
        response.json(blog.toJSON());
    } else {
        response.status(404).end();
    }
});

blogsRouter.post('/', async (req, res) => {
    const body = req.body;
    if (!req.token) {
        return res.status(401).json({ error: 'token missing' });
    }
    const decodedToken = jwt.verify(req.token, process.env.SECRET);

    if (!decodedToken.id) {
        return res.status(401).json({ error: 'invalid token' });
    }
    const user = await User.findById(decodedToken.id);

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes === undefined ? 0 : body.likes,
        user: user._id
    });

    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();
    res.json(savedBlog.toJSON());

});

blogsRouter.delete('/:id', async (req, res) => {
    if (!req.token) {
        return res.status(401).json({ error: 'token missing' });
    }
    const decodedToken = jwt.verify(req.token, process.env.SECRET);

    if (!decodedToken.id) {
        return res.status(401).json({ error: 'invalid token' });
    }

    const user = await User.findById(decodedToken.id);
    const poistettava = await Blog.findById(req.params.id);

    if (poistettava.user.toString() === user._id.toString()) {
        await Blog.findByIdAndRemove(poistettava._id);
        user.blogs = user.blogs.filter(id => id.toString() !== poistettava._id.toString());
        await user.save();
        res.status(204).end();
    } else {
        res.status(401).json({ error: 'unauthorized user' });
    }

});

blogsRouter.put('/:id', async (request, response, next) => {
    const body = request.body;

    const blog = {
        likes: body.likes
    }

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true });
    response.json(updatedBlog.toJSON());

});

module.exports = blogsRouter;
