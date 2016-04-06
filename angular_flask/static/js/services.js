angular.module('angularFlaskServices', ['ngResource'])
  .service('dataStore', function($rootScope, $q) {
    this.data = null;
    this.currentImg = null;
    this.currentData = null;
    this.currentIndex = null;

    var dataStore = this;

    this.init = function() {
      console.log('initing');
      var deferred = $q.defer();
      require(['json!./static/img/test.json'], function(data) {
        dataStore.data = data;
        dataStore.currentIndex = 0;
        dataStore.currentImg = '/static/img/' + dataStore.data[dataStore.currentIndex].file_name;
        dataStore.currentData = dataStore.data[dataStore.currentIndex];
        deferred.resolve('Done');
      });
      return deferred.promise;
    };

    this.next = function() {
      dataStore.currentIndex++;
      dataStore.currentImg = '/static/img/' + dataStore.data[dataStore.currentIndex].file_name;
      dataStore.currentData = dataStore.data[dataStore.currentIndex];
    };

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
