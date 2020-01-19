const MongoClient = require("mongodb").MongoClient;
// создаем объект MongoClient и передаем ему строку подключения
const mongoClient = new MongoClient("mongodb://localhost:27017/", { useNewUrlParser: true });

function addBooks(req, res) {
	//console.log('addRecipe', req.fields.recipe);
	mongoClient.connect(function(err,client) {
		if(err) return console.log(err);
		const db = client.db('Cookbook');
		const collection = db.collection('books');

		const options = {
			year: 'numeric',
			month: 'numeric',
			day: 'numeric',
			hour: 'numeric',
			minute: 'numeric',
			second: 'numeric',
			hour12: false
		};
		const date = new Date();
		const dateNow = date.toLocaleString('ua', options)
						.replace(/\//g, '.');

		const recipe = {
			recipe: req.fields.recipe,
			dateCreate: dateNow
		};

		collection.insertOne(recipe, function(err, result) {
			if(err) {
				return console.log(err);
			}
			console.log(result.ops[0]);
			res.send({book: result.ops[0]});
			client.close();

		})
	});
};

function getBooks(req, res) {
	console.log('get');

	mongoClient.connect(function(err,client) {
		if(err) return console.log(err);

		const db = client.db('Cookbook');
		const collection = db.collection('books');

		collection.find().toArray(function(err, results) {
			if(err) return console.log(err);
			console.log('good');
			console.log(results);
			res.send(results);
			//console.log(client.close);
			//client.close();
			console.log('close');
		})
	});
};

module.exports = {
	addBooks,
	getBooks
}
