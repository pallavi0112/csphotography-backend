const mongoose =  require('mongoose');

function connectToDB() {
    mongoose.connect(process.env.DB_CONNECTION_STRING, { useNewUrlParser: true });

    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'Connection error:'));
    db.once('open', function() {
        console.log("Connected to Database");
    });
}

module.exports = connectToDB;
