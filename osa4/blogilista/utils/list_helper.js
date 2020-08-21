const dummy = (blogs) => {
    return 1;
}

const totalLikes = (blogs) => blogs.reduce((sum, blog) => sum + blog.likes, 0);

const mostLikes = (blogs) => blogs.reduce((prev, current) =>
    prev.likes > current.likes ? prev : current, {});


module.exports = {
    dummy,
    totalLikes,
    mostLikes
}