const path = require('path');
const express = require('express');
const formidableMiddleware = require('express-formidable');
const app = express();
const port = process.env.PORT || 3000;



const {
	addBooks,
	getBooks
} = require('./db/db');


app.use(express.static('public'));
app.use(formidableMiddleware());

app.post('/addRecipe', addBooks);
app.get('/getRecipe', getBooks);

app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname, '../public/index.html'))
});

app.listen(port, () => console.log('server start port: ' + port));
