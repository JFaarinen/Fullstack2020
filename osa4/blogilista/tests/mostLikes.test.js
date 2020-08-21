const mostLikes = require('../utils/list_helper').mostLikes;
const blogs = require('./testblogs');

describe('most likes', () => {
    const listWithOneBlog = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        }
    ];

    test('when list has only one blog returns that blog', () => {
        const result = mostLikes(listWithOneBlog);
        expect(result).toEqual(listWithOneBlog[0]);
    });

    test('of empty list is empty object', () => {
        const result = mostLikes([]);
        expect(result).toEqual({});
    });

    test('of a bigger list is blog with most likes', () => {
        const result = mostLikes(blogs);
        expect(result).toEqual(blogs[2]);
    });
});