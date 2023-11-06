const mongoose = require('mongoose');

async function connect() {
    await mongoose
        .connect('mongodb://127.0.0.1:27017/f8_education_dev', {})
        .then((res) => {
            console.log('Connect successfully');
        })
        .catch((e) => {
            console.log('Connect failed');
        });
}

module.exports = { connect };
