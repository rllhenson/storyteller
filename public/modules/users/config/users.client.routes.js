'use strict';

// Setting up route
angular.module('users').config(['$stateProvider',
	function($stateProvider) {
		// Users state routing
		$stateProvider.
		state('edit', {
			url: '/settings/edit',
			templateUrl: 'modules/users/views/settings/edit.client.view.html'
		}).
		state('profile', {
			url: '/settings/profile',
			templateUrl: 'modules/users/views/settings/profile.client.view.html'
		}).
		state('profileUrl', {
			url: '/settings/user-profile',
			templateUrl: 'modules/users/views/settings/profile-url.client.view.html'
		}).
		state('users', {
			url: '/settings/users',
			templateUrl: 'modules/users/views/settings/users.client.view.html'
		}).
		state('account', {
			url: '/settings/account',
			templateUrl: 'modules/users/views/settings/account.client.view.html'
		}).
		// state('accounts', {
		// 	url: '/settings/accounts',
		// 	templateUrl: 'modules/users/views/settings/social-accounts.client.view.html'
		// }).
		state('signup', {
			url: '/signup',
			templateUrl: 'modules/users/views/authentication/signup.client.view.html'
		}).
		state('signin', {
			url: '/signin',
			templateUrl: 'modules/users/views/authentication/signin.client.view.html'
		}).
		state('forgot', {
			url: '/password/forgot',
			templateUrl: 'modules/users/views/password/forgot-password.client.view.html'
		}).
		state('reset-invalid', {
			url: '/password/reset/invalid',
			templateUrl: 'modules/users/views/password/reset-password-invalid.client.view.html'
		}).
		state('reset-success', {
			url: '/password/reset/success',
			templateUrl: 'modules/users/views/password/reset-password-success.client.view.html'
		}).
		state('reset', {
			url: '/password/reset/:token',
			templateUrl: 'modules/users/views/password/reset-password.client.view.html'
		});
	}
]);