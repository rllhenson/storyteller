'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Crudstory Schema
 */
var CrudstorySchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Crudstory name',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Crudstory', CrudstorySchema);