const { DB_USER, DB_PASSWORD, DB_NAME } = process.env;
const mongoUri = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.rqxwr.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;
const mongoOptions = { useNewUrlParser: true, useUnifiedTopology: true };

module.exports = { mongoUri, mongoOptions };
