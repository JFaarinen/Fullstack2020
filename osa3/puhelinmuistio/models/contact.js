const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const { response } = require('express');
mongoose.set('useCreateIndex', true);

const url = process.env.MONGODB_URI;

console.log('connecting to', url);
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(response => {
        console.log('connected to MongoDB' + response);
    })
    .catch((error) => {
        console.log('error connecting to MongoDB: ', error.message);
    });

const contactSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 3, unique: true },
    number: { type: String, required: true, minlength: 8 }
});
contactSchema.plugin(uniqueValidator);

contactSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

module.exports = mongoose.model('Contact', contactSchema);