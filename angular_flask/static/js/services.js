angular.module('angularFlaskServices', ['ngResource'])
  // .factory('getGraphData', function($resource) {
  //   return $resource('/api/graphdata', {}, {
  //     retrieve: {
  //       method: 'POST',
  //     },
  //     get: {
  //       method: 'GET'
  //     }
  //   });
  // })
  // .factory('getReccData', function($resource) {
  //   return $resource('/api/reccdata', {}, {
  //     get: {
  //       method: 'GET'
  //     }
  //   });
  // })
  .service('dataStore', function($rootScope) {
    this.currentImg = undefined;
    this.currentData = undefined;
    this.currentIndex = 0;
  });

// angular.module('dataServices', [])
//   .service('dataStore', function($rootScope, getGraphData) {
//     this.uploadData = {};
//     this.storedData = undefined;

//     this.storeAllData = function(dataStore, cb) {
//       getGraphData.get(this.uploadData, function(data) {
//         dataStore.storedData = data;
//         cb(data);
//       });
//     };
// });
