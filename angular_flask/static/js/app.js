require.config({
    waitSeconds : 2,
    paths : {
        text : '/static/lib/bower_components/requirejs-plugins/lib/text', //text is required
        json : '/static/lib/bower_components/requirejs-plugins/src/json' //alias to plugin
    }
});

var init = false;

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
        if (!init) {
          init = true;
          return dataStore.init();
        }
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
