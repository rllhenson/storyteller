'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Crudstory = mongoose.model('Crudstory'),
	_ = require('lodash');

/**
 * Create a Crudstory
 */
exports.create = function(req, res) {
	var crudstory = new Crudstory(req.body);
	crudstory.user = req.user;

	crudstory.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(crudstory);
		}
	});
};

/**
 * Show the current Crudstory
 */
exports.read = function(req, res) {
	res.jsonp(req.crudstory);
};

/**
 * Update a Crudstory
 */
exports.update = function(req, res) {
	var crudstory = req.crudstory ;

	crudstory = _.extend(crudstory , req.body);

	crudstory.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(crudstory);
		}
	});
};

/**
 * Delete an Crudstory
 */
exports.delete = function(req, res) {
	var crudstory = req.crudstory ;

	crudstory.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(crudstory);
		}
	});
};

/**
 * List of Crudstories
 */
exports.list = function(req, res) { 
	Crudstory.find().sort('-created').populate('user', 'displayName').exec(function(err, crudstories) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(crudstories);
		}
	});
};

/**
 * Crudstory middleware
 */
exports.crudstoryByID = function(req, res, next, id) { 
	Crudstory.findById(id).populate('user', 'displayName').exec(function(err, crudstory) {
		if (err) return next(err);
		if (! crudstory) return next(new Error('Failed to load Crudstory ' + id));
		req.crudstory = crudstory ;
		next();
	});
};

/**
 * Crudstory authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.crudstory.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
