'use strict';

// Configuring the Articles module
angular.module('crudstories').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Crudstories', 'crudstories', 'dropdown', '/crudstories(/create)?');
		Menus.addSubMenuItem('topbar', 'crudstories', 'List Crudstories', 'crudstories');
		Menus.addSubMenuItem('topbar', 'crudstories', 'New Crudstory', 'crudstories/create');
	}
]);