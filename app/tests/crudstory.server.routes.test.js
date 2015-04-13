'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Crudstory = mongoose.model('Crudstory'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, crudstory;

/**
 * Crudstory routes tests
 */
describe('Crudstory CRUD tests', function() {
	beforeEach(function(done) {
		// Create user credentials
		credentials = {
			username: 'username',
			password: 'password'
		};

		// Create a new user
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: credentials.username,
			password: credentials.password,
			provider: 'local'
		});

		// Save a user to the test db and create new Crudstory
		user.save(function() {
			crudstory = {
				name: 'Crudstory Name'
			};

			done();
		});
	});

	it('should be able to save Crudstory instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Crudstory
				agent.post('/crudstories')
					.send(crudstory)
					.expect(200)
					.end(function(crudstorySaveErr, crudstorySaveRes) {
						// Handle Crudstory save error
						if (crudstorySaveErr) done(crudstorySaveErr);

						// Get a list of Crudstories
						agent.get('/crudstories')
							.end(function(crudstoriesGetErr, crudstoriesGetRes) {
								// Handle Crudstory save error
								if (crudstoriesGetErr) done(crudstoriesGetErr);

								// Get Crudstories list
								var crudstories = crudstoriesGetRes.body;

								// Set assertions
								(crudstories[0].user._id).should.equal(userId);
								(crudstories[0].name).should.match('Crudstory Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Crudstory instance if not logged in', function(done) {
		agent.post('/crudstories')
			.send(crudstory)
			.expect(401)
			.end(function(crudstorySaveErr, crudstorySaveRes) {
				// Call the assertion callback
				done(crudstorySaveErr);
			});
	});

	it('should not be able to save Crudstory instance if no name is provided', function(done) {
		// Invalidate name field
		crudstory.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Crudstory
				agent.post('/crudstories')
					.send(crudstory)
					.expect(400)
					.end(function(crudstorySaveErr, crudstorySaveRes) {
						// Set message assertion
						(crudstorySaveRes.body.message).should.match('Please fill Crudstory name');
						
						// Handle Crudstory save error
						done(crudstorySaveErr);
					});
			});
	});

	it('should be able to update Crudstory instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Crudstory
				agent.post('/crudstories')
					.send(crudstory)
					.expect(200)
					.end(function(crudstorySaveErr, crudstorySaveRes) {
						// Handle Crudstory save error
						if (crudstorySaveErr) done(crudstorySaveErr);

						// Update Crudstory name
						crudstory.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Crudstory
						agent.put('/crudstories/' + crudstorySaveRes.body._id)
							.send(crudstory)
							.expect(200)
							.end(function(crudstoryUpdateErr, crudstoryUpdateRes) {
								// Handle Crudstory update error
								if (crudstoryUpdateErr) done(crudstoryUpdateErr);

								// Set assertions
								(crudstoryUpdateRes.body._id).should.equal(crudstorySaveRes.body._id);
								(crudstoryUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Crudstories if not signed in', function(done) {
		// Create new Crudstory model instance
		var crudstoryObj = new Crudstory(crudstory);

		// Save the Crudstory
		crudstoryObj.save(function() {
			// Request Crudstories
			request(app).get('/crudstories')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Crudstory if not signed in', function(done) {
		// Create new Crudstory model instance
		var crudstoryObj = new Crudstory(crudstory);

		// Save the Crudstory
		crudstoryObj.save(function() {
			request(app).get('/crudstories/' + crudstoryObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', crudstory.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Crudstory instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Crudstory
				agent.post('/crudstories')
					.send(crudstory)
					.expect(200)
					.end(function(crudstorySaveErr, crudstorySaveRes) {
						// Handle Crudstory save error
						if (crudstorySaveErr) done(crudstorySaveErr);

						// Delete existing Crudstory
						agent.delete('/crudstories/' + crudstorySaveRes.body._id)
							.send(crudstory)
							.expect(200)
							.end(function(crudstoryDeleteErr, crudstoryDeleteRes) {
								// Handle Crudstory error error
								if (crudstoryDeleteErr) done(crudstoryDeleteErr);

								// Set assertions
								(crudstoryDeleteRes.body._id).should.equal(crudstorySaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Crudstory instance if not signed in', function(done) {
		// Set Crudstory user 
		crudstory.user = user;

		// Create new Crudstory model instance
		var crudstoryObj = new Crudstory(crudstory);

		// Save the Crudstory
		crudstoryObj.save(function() {
			// Try deleting Crudstory
			request(app).delete('/crudstories/' + crudstoryObj._id)
			.expect(401)
			.end(function(crudstoryDeleteErr, crudstoryDeleteRes) {
				// Set message assertion
				(crudstoryDeleteRes.body.message).should.match('User is not logged in');

				// Handle Crudstory error error
				done(crudstoryDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Crudstory.remove().exec();
		done();
	});
});