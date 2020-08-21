const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name: String,
    number: String
});

const Contact = mongoose.model('Contact', contactSchema);

if (process.argv.length === 3) {
    listContacts(process.argv[2]);
} else if (process.argv.length > 4) {
    addContact(process.argv[2], process.argv[3], process.argv[4]);

} else {
    console.log('List contacts in database: node mongo.js <password>');
    console.log('Adding person into database: node mongo.js <password> <name> <number>');
    process.exit(1);
}

function listContacts(password) {
    const url = `mongodb+srv://puhelinluettelo:${password}@phonebook.5smrr.mongodb.net/phonebook?retryWrites=true&w=majority`;
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

    console.log('Contacts in database:');
    Contact.find({}).then(result => {
        result.forEach(contact => {
            console.log(contact);
        });
        mongoose.connection.close();
    });
}

function addContact(password, name, number) {
    const url = `mongodb+srv://puhelinluettelo:${password}@phonebook.5smrr.mongodb.net/phonebook?retryWrites=true&w=majority`;
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

    const contact = new Contact({
        name: name,
        number: number
    });

    contact.save()
        .then(response => {
            console.log('contact saved');
        });
}



