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

    this.shuffleArray = function(array) {
      var m = array.length, t, i;

      // While there remain elements to shuffle
      while (m) {
        // Pick a remaining element…
        i = Math.floor(Math.random() * m--);

        // And swap it with the current element.
        t = array[m];
        array[m] = array[i];
        array[i] = t;
      }

      return array;
    };

    this.init = function() {
      console.log('initing');
      var deferred = $q.defer();
      require(['json!./static/img/images.json', 'json!./static/img/captions.json'], function(images, captions) {
        dataStore.images = images;
        dataStore.captions = captions;
        // create array that is len(images), len(captions)
        // check to make sure they are the same
        // shuffle that array
        // need to keep track of original index as well as array index
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
        console.log(dataStore.results);
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
