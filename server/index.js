const path = require('path');
const express = require('express');
const formidableMiddleware = require('express-formidable');
const app = express();
const port = process.env.PORT || 3000;



const {
	addBooks,
	getBooks,
	deleteRecipe
} = require('./db/db');


app.use(express.static('public'));
app.use(formidableMiddleware());
// app.use(function (req, res, next) {
// 	console.log(req);
// 	next();
// })

app.post('/addRecipe', addBooks);
app.get('/getRecipe', getBooks);
app.delete('/deleteRecipe', deleteRecipe);

app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname, '../public/index.html'))
});

app.listen(port, () => console.log('server start port: ' + port));
