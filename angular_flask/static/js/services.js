angular.module('angularFlaskServices', ['ngResource'])
  .service('dataStore', function($rootScope, $q, $location, sendRecord) {
    this.images = null;
    this.captions = null;
    this.results = null;

    this.currentImg = null;
    this.currentData = null;
    this.currentCaptions = null;
    this.currentIndex = null;

    var dataStore = this;

    this.init = function() {
      console.log('initing');
      var deferred = $q.defer();
      require(['json!./static/img/images.json', 'json!./static/img/captions.json'], function(images, captions) {
        dataStore.images = images;
        dataStore.captions = captions;
        dataStore.currentIndex = 0;

        // TODO: this is def unnecessary...
        dataStore.currentImg = '/static/img/' + dataStore.images[dataStore.currentIndex].file_name;
        dataStore.currentData = dataStore.images[dataStore.currentIndex];
        // TODO: ppl can probably cheat if they want to by looking at this
        dataStore.currentCaptions = dataStore.captions[dataStore.currentIndex];
        deferred.resolve('Done');
      });

      dataStore.results = {};
      return deferred.promise;
    };

    this.next = function() {
      if (dataStore.currentIndex == this.images.length - 1) {
        console.log('ending');
        // console.log(dataStore.results);
        sendRecord.save(dataStore.results);
        $location.path('/end');
      } else {
        dataStore.currentIndex++;
        dataStore.currentImg = '/static/img/' + dataStore.images[dataStore.currentIndex].file_name;
        dataStore.currentData = dataStore.images[dataStore.currentIndex];
        dataStore.currentCaptions = dataStore.captions[dataStore.currentIndex];
        $location.path('/image');
      }
    };
  })
  .factory('sendRecord', function($resource) {
    return $resource('/record', {}, {
      save: {
        method: 'POST'
      }
    });
  });
