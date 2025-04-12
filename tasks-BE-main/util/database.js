const mongoose = require("mongoose");

const DBConcction = (callback) => {
    mongoose
        .connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => {
            console.log("DB Connected!!");
            callback();
        })
        .catch((err) => {
            console.error("Database connection failed:", err);
            throw err; // Stop the application if the database connection fails
        });
};

module.exports = { DBConcction }; // Export as part of an object