var mongoose = require('mongoose');
var Topic = mongoose.model('Topic');

/**
 * List
 */
exports.all = function(req, res) {
	Topic.find({}).exec(function(err, topics) {
		if(!err) {
			res.json(topics);
		}else {
			console.log('Error in first query');
		}
	});
};

/**
 * Add a Topic
 */
exports.add = function(req, res) {
	Topic.create(req.body, function (err) {
		if (err) console.log ('Error on save!')
			res.status(200).send('Added successfully');
	});
};

/**
 * Update a topic
 */
exports.update = function(req, res) {
	var query = { id: req.body.id };
	var data = {
		$set : req.body
	};
	Topic.findOneAndUpdate(query, data, function(err, data) {
		if(err) console.log('Error on save!');
		res.status(200).send('Updated successfully');
	});
};

/**
 * Remove a topic
 */
exports.remove = function(req, res) {
	var query = { id: req.body.id };
	Topic.findOneAndRemove(query, function(err, data) {
		if(err) console.log('Error on delete');
		res.status(200).send('Removed Successfully');
	});
};