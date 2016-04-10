angular.module('angularFlaskServices', ['ngResource'])
  .service('dataStore', function($rootScope, $q) {
    this.images = null;
    this.captions = null;

    this.currentImg = null;
    this.currentData = null;
    this.currentCaption = null;
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
        dataStore.currentCaption = dataStore.captions[dataStore.currentIndex];
        deferred.resolve('Done');
      });
      return deferred.promise;
    };

    this.next = function() {
      dataStore.currentIndex++;
      dataStore.currentImg = '/static/img/' + dataStore.images[dataStore.currentIndex].file_name;
      dataStore.currentData = dataStore.images[dataStore.currentIndex];
      dataStore.currentCaption = dataStore.captions[dataStore.currentIndex];
    };
  });
