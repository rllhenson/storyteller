'use strict';

(function() {
	// Crudstories Controller Spec
	describe('Crudstories Controller Tests', function() {
		// Initialize global variables
		var CrudstoriesController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Crudstories controller.
			CrudstoriesController = $controller('CrudstoriesController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Crudstory object fetched from XHR', inject(function(Crudstories) {
			// Create sample Crudstory using the Crudstories service
			var sampleCrudstory = new Crudstories({
				name: 'New Crudstory'
			});

			// Create a sample Crudstories array that includes the new Crudstory
			var sampleCrudstories = [sampleCrudstory];

			// Set GET response
			$httpBackend.expectGET('crudstories').respond(sampleCrudstories);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.crudstories).toEqualData(sampleCrudstories);
		}));

		it('$scope.findOne() should create an array with one Crudstory object fetched from XHR using a crudstoryId URL parameter', inject(function(Crudstories) {
			// Define a sample Crudstory object
			var sampleCrudstory = new Crudstories({
				name: 'New Crudstory'
			});

			// Set the URL parameter
			$stateParams.crudstoryId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/crudstories\/([0-9a-fA-F]{24})$/).respond(sampleCrudstory);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.crudstory).toEqualData(sampleCrudstory);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Crudstories) {
			// Create a sample Crudstory object
			var sampleCrudstoryPostData = new Crudstories({
				name: 'New Crudstory'
			});

			// Create a sample Crudstory response
			var sampleCrudstoryResponse = new Crudstories({
				_id: '525cf20451979dea2c000001',
				name: 'New Crudstory'
			});

			// Fixture mock form input values
			scope.name = 'New Crudstory';

			// Set POST response
			$httpBackend.expectPOST('crudstories', sampleCrudstoryPostData).respond(sampleCrudstoryResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Crudstory was created
			expect($location.path()).toBe('/crudstories/' + sampleCrudstoryResponse._id);
		}));

		it('$scope.update() should update a valid Crudstory', inject(function(Crudstories) {
			// Define a sample Crudstory put data
			var sampleCrudstoryPutData = new Crudstories({
				_id: '525cf20451979dea2c000001',
				name: 'New Crudstory'
			});

			// Mock Crudstory in scope
			scope.crudstory = sampleCrudstoryPutData;

			// Set PUT response
			$httpBackend.expectPUT(/crudstories\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/crudstories/' + sampleCrudstoryPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid crudstoryId and remove the Crudstory from the scope', inject(function(Crudstories) {
			// Create new Crudstory object
			var sampleCrudstory = new Crudstories({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Crudstories array and include the Crudstory
			scope.crudstories = [sampleCrudstory];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/crudstories\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleCrudstory);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.crudstories.length).toBe(0);
		}));
	});
}());