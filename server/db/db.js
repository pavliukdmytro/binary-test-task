const MongoClient = require("mongodb").MongoClient;
// создаем объект MongoClient и передаем ему строку подключения
const mongoClient = new MongoClient("mongodb://localhost:27017/", { useNewUrlParser: true });
const ObjectId = require("mongodb").ObjectID;

function addBooks(req, res) {
	//console.log('addRecipe', req.fields.recipe);
	mongoClient.connect((err, client) => {
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
			dateCreate: dateNow,
			modify: false
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
	mongoClient.connect((err,client) => {
		if(err) return console.log(err);

		const db = client.db('Cookbook');
		const collection = db.collection('books');

		collection.find().toArray(function(err, results) {
			if(err) return console.log(err);
			res.send(results);
		});
	});
};

function deleteRecipe(req, res) {
	mongoClient.connect((err, client) => {
		if(err) return console.log(err);

		const db = client.db('Cookbook');
		const collection = db.collection('books');

		collection.findOneAndDelete({_id: ObjectId(req.fields._id)}, (err, result) => {
			res.send(JSON.stringify(result.value));
			client.close(result);
		});
	});
	mongoClient.connect()
};

function putRecipe (req, res) {
	// console.log(req.fields.id, req.fields.recipe);
	mongoClient.connect((err, client) => {
		if(err) return console.log(err);

		const db = client.db('Cookbook');
		const collection = db.collection('books');

		collection.findOneAndUpdate({_id: ObjectId(req.fields.id)}, {$set: {recipe: req.fields.recipe}}, function (err, result) {
			if(err) return console.log(err);
			console.log(result);
			res.send({
				_id: result.value._id,
				recipe: req.fields.recipe
			});
			client.close();
		})
	});
}

module.exports = {
	addBooks,
	getBooks,
	deleteRecipe,
	putRecipe
};
