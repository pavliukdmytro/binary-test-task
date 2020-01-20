const MongoClient = require("mongodb").MongoClient;
// создаем объект MongoClient и передаем ему строку подключения
const mongoClient = new MongoClient("mongodb://localhost:27017/", { useNewUrlParser: true });
const ObjectId = require("mongodb").ObjectID;

function addBooks(req, res) {
	mongoClient.connect((err, client) => {
		if(err) return console.log(err);
		const db = client.db('Cookbook');
		const collection = db.collection('books');

		const date = +new Date();
		const recipe = {
			recipe: req.fields.recipe,
			dateCreate: date,
			modify: false
		};

		collection.insertOne(recipe, function(err, result) {
			if(err) {
				return console.log(err);
			}

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

		collection.find().sort({dateCreate: 1}).toArray(function(err, results) {
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
	mongoClient.connect((err, client) => {
		if(err) return console.log(err);

		const db = client.db('Cookbook');
		const collection = db.collection('books');

		collection.findOneAndUpdate({_id: ObjectId(req.fields._id)}, {
			$set: {recipe: req.fields.newRecipe, dateCreate: +new Date() },
			$push: {oldRecipe: {recipe: req.fields.recipe, dateCreate: req.fields.dateCreate}}
			},
			function (err, result) {
						if(err) return console.log(err);

						let oldPrice = [{recipe: req.fields.recipe, dateCreate: req.fields.dateCreate}];
						if(result.value.oldRecipe) {
							oldPrice = [...oldPrice, ...result.value.oldRecipe]
						}
						res.send({
							_id: result.value._id,
							recipe: req.fields.recipe,
							oldRecipe: oldPrice
						});
						client.close();
					})
	});
};

module.exports = {
	addBooks,
	getBooks,
	deleteRecipe,
	putRecipe
};
