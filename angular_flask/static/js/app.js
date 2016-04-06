require.config({
    waitSeconds : 2,
    paths : {
        text : '/static/lib/bower_components/requirejs-plugins/lib/text', //text is required
        json : '/static/lib/bower_components/requirejs-plugins/src/json' //alias to plugin
    }
});

angular.module('AngularFlask', ['ngRoute', 'angularFlaskServices', 'angularFlaskFilters'])
.config([
	'$routeProvider', '$locationProvider',
	function($routeProvider, $locationProvider, dataStore) {
	$routeProvider
	.when('/', {
		templateUrl: 'static/partials/landing.html',
		controller: IndexController,
    resolve: {
      data: function (dataStore) {
        return dataStore.init();
      }
    }
	})
	.otherwise({
		redirectTo: '/'
	});
	$locationProvider.html5Mode({
		enabled: true,
		requireBase: false
	});
}
]);
