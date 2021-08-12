const mongoose = require("mongoose");

const dbConnection = async () => {
    try {
        await mongoose.connect(
            process.env.DB_CONNECTION,
            {
                useCreateIndex: true,
                useFindAndModify: false,
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        );
        console.log("Connection with DB is OK");
    } catch (e) {
        console.log(`Failed: Error to connect with DataBase \nError ${e}`);
    }
};

module.exports = { dbConnection };