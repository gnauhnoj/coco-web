// /* Controllers */

var IndexController = function($scope, $location, dataStore) {
  $scope.go = function() {
    $location.path('/image');
  };
};

var MiddleController = function($scope, $location) {
  $scope.next = function() {
    $location.path('/quiz');
  };
};

var EndController = function($scope) {
};

var QuizController = function($scope, dataStore, $document) {
  $scope.myText='<b><emph>Select 1 of the 3 captions below by pressing the button belonging to the caption that best describes the image you just explored.</b></emph>';
  var quizOptions = dataStore.currentCaptions;
  quizOptions = dataStore.shuffleArray(quizOptions);

  $scope.captions = quizOptions.map(function(op) {
    return op[0].caption;
  });

  // console.log($scope.captions);
  $scope.next = function(index) {
    var quizResult = quizOptions[index];
    dataStore.results[dataStore.currentIndex] = quizResult;
    dataStore.next();
  };
};

var ImageController = function($scope, $location, dataStore) {
  var segmentation = dataStore.currentData.segmentation;
  $scope.allObjects = null;
  // Get screen width/height
  // play with this
  var w = document.documentElement.clientWidth;
  var h = document.documentElement.clientHeight * 0.75;

  var categories = {};
  for (var i=0; i<segmentation.length; i++) {
    categories[segmentation[i].category_name] = categories[segmentation[i].category_name] + 1 || 1;
  }

  var categoryStr = [];
  for (var category in categories) {
    var subStr = [];
    subStr.push(categories[category], category);
    categoryStr.push(subStr.join(' '));
  }
  categoryStr = categoryStr.join(', ');
  // console.log(categoryStr);
  $scope.allObjects = categoryStr;

  // read in image
  var _img = document.getElementById('id1');
  var newImg = new Image();
  newImg.src = dataStore.currentImg;

  newImg.onload = function() {
    // get image width, height, and scale ratio
    _img.src = newImg.src;
    var height = newImg.height;
    var width = newImg.width;
    var scale_x = w / width;
    var scale_y = h / height;

    // if it's taller than it is wide, warp it otherwise just fit to width
    // scale_y = (height > width) ? scale_y : scale_x;
    // _img.height = (height > width) ? h : height * scale_y;
    _img.height = h;
    _img.width = w;

    // draw the box with derived dimensions
    var iarea = document.getElementById('image-area');
    iarea.setAttribute('height', _img.height);
    iarea.setAttribute('width', _img.width);
    var newElement = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    newElement.setAttribute('height', _img.height);
    newElement.setAttribute('width', _img.width);
    // newElement.setAttribute('aria-label', 'image area');
    newElement.style.fill = '#D3D3D3';
    iarea.appendChild(newElement);
  };

  $scope.next = function() {
    $location.path('/middle');
  };

  $scope.doStuff = function (value) {//I change here
    while( $('#image-note h2').height() > $('.image-note').height() ) {
      $('#image-note h2').css('font-size', (parseInt($('#image-note h2').css('font-size')) - 1) + "px" );
    }
    return 0;
  };
};
