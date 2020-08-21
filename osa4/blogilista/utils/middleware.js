const unknownEndpoint = (req, res, next) => {
    res.status(404).send({ error: 'unknown endpoint' });
    next();
}

const errorHandler = (error, req, res, next) => {
    console.log(error.message);

    if (error.name === 'CastError') {
        return res.status(400).send({ error: 'malformatted id' });
    } else if (error.name === 'ValidationError') {
        return res.status(400).json({ error: error.message });
    }
    next(error);
}

const tokenExtractor = (req, res, next) => {
    const authorization = req.get('authorization');
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        req.token = authorization.substring(7);
    } else {
        req.token = null;
    }
    next();
}

module.exports = {
    unknownEndpoint,
    errorHandler,
    tokenExtractor
}