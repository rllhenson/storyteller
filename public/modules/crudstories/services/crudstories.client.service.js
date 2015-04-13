'use strict';

//Crudstories service used to communicate Crudstories REST endpoints
angular.module('crudstories').factory('Crudstories', ['$resource',
	function($resource) {
		return $resource('crudstories/:crudstoryId', { crudstoryId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);