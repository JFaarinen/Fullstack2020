require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const Contact = require('./models/contact');
const app = express();

app.use(express.json());
app.use(express.static('build'));
app.use(cors());
app.use(morgan('tiny'));

app.get('/', (request, response) => {
    response.send('<h1>Täällä ei ole mitään</h1>');
});

app.get('/api/persons', (request, response) => {
    Contact.find({}).then(contacts => {
        response.json(contacts);
    });
});

app.get('/api/persons/:id', (request, response, next) => {
    Contact.findById(request.params.id)
        .then(contact => {
            if (contact) {
                response.json(contact);
            } else {
                response.status(404).end();
            }
        })
        .catch(error => next(error));
});

app.get('/info', (request, response) => {
    Contact.countDocuments({})
        .then(result => {
            response.send(`<div><div>Phonebook has info for ${result} people</div>Today is ${Date()}<div></div></div>`);
        });
});

app.delete('/api/persons/:id', (request, response, next) => {
    Contact.findByIdAndRemove(request.params.id)
        .then(result => {
            response.status(204).end();
        })
        .catch(error => next(error));
});

app.post('/api/persons', (request, response, next) => {
    //const id = (Math.random() * 100000).toFixed(0);
    const newperson = request.body;

    const contact = new Contact({
        name: newperson.name,
        number: newperson.number
    });
    contact.save()
        .then(savedContact => {
            response.json(savedContact);
        })
        .catch(error => next(error));
});

app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body;

    const contact = {
        name: body.name,
        number: body.number,
    };
    Contact.findByIdAndUpdate(request.params.id, contact, { new: true })
        .then(updatedContact => {
            response.json(updatedContact);
        })
        .catch(error => next(error));
});

const errorHandler = (error, request, response, next) => {
    console.error(error.message);

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' });
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message });
    }
    next(error);
};
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});