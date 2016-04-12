require.config({
  waitSeconds : 2,
  paths : {
    text : '/static/lib/bower_components/requirejs-plugins/lib/text', //text is required
    json : '/static/lib/bower_components/requirejs-plugins/src/json' //alias to plugin
  }
});

var init = false;

angular.module('AngularFlask', ['ngRoute', 'angularFlaskServices', 'angularFlaskFilters', 'angularFlaskDirectives'])
.config([ '$routeProvider', '$locationProvider', function($routeProvider, $locationProvider, dataStore) {
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
  .when('/image', {
    templateUrl: 'static/partials/image.html',
    controller: ImageController
  })
  .when('/quiz', {
    templateUrl: 'static/partials/quiz.html',
    controller: QuizController
  })
  .when('/end', {
    templateUrl: 'static/partials/end.html',
    controller: EndController
  })
  .otherwise({
    redirectTo: '/'
  });
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: true
  });
}]);
