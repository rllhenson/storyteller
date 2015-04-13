'use strict';

//Setting up route
angular.module('crudstories').config(['$stateProvider',
	function($stateProvider) {
		// Crudstories state routing
		$stateProvider.
		state('listCrudstories', {
			url: '/crudstories',
			templateUrl: 'modules/crudstories/views/list-crudstories.client.view.html'
		}).
		state('createCrudstory', {
			url: '/crudstories/create',
			templateUrl: 'modules/crudstories/views/create-crudstory.client.view.html'
		}).
		state('viewCrudstory', {
			url: '/crudstories/:crudstoryId',
			templateUrl: 'modules/crudstories/views/view-crudstory.client.view.html'
		}).
		state('editCrudstory', {
			url: '/crudstories/:crudstoryId/edit',
			templateUrl: 'modules/crudstories/views/edit-crudstory.client.view.html'
		});
	}
]);