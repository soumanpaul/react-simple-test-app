const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const moviesRoute = require('./routes/movies.route');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.get('/', (req, res) => {
	res.json({ status: true })
});

//Route
app.use('/movies', moviesRoute);

// Connect to mongoDB
let mongoDB = process.env.MONGODB_URL || "mongodb://localhost:27017/mymoviesdb";
mongoose.connect(
	mongoDB,
	{ useNewUrlParser: true, useUnifiedTopology: true }
);
mongoose.Promise = global.Promise;

mongoose.connection.on('error', console.error.bind(console, 'MongoDB Connection Error...'));


module.exports = app;

// let port = 3000;

// app.listen(process.env.PORT || port, () => {
// 	console.log(`Server now up and running on port ${port}`);
// });



// Learn more or give us feedback
// const app = require('./index');

// let port = 3300;

// const server = app.listen(process.env.PORT || port, () => {
// 	console.log(`Server now up and running on port ${port}`);
// });

// module.exports = server;