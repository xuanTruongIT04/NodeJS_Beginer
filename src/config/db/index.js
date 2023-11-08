const mongoose = require('mongoose');

async function connect() {
    await mongoose
        .connect('mongodb://localhost:27017/f8_education_dev', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        })
        .then((res) => {
            console.log('Connect successfully');
        })
        .catch((e) => {
            console.log('Connect failed');
        });
}

module.exports = { connect };
