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

var sortCoors = function(a, b) {
  if (a[1] == b[1]) return a[0] - b[0];
  return a[1] - b[1];
};

var sortCoorsMacro = function(a, b) {
  // maybe should actually sort too
  var val_a = a.points[0];
  var val_b = b.points[0];
  return sortCoors(val_a, val_b);
};

var ImageController = function($scope, $location, dataStore) {
  var segmentation = dataStore.currentData.segmentation;

  // console.log(segmentation);
  segmentation.sort(sortCoorsMacro);
  // console.log(segmentation);

  $scope.allObjects = null;
  // Get screen width/height
  // play with this
  var w = document.documentElement.clientWidth;
  var h = document.documentElement.clientHeight * 0.75;

  var categories = {};
  for (i=0; i<segmentation.length; i++) {
    categories[segmentation[i].category_name] = categories[segmentation[i].category_name] + 1 || 1;
  }

  var categoryStr = ['All Objects'];
  for (var category in categories) {
    var subStr = [];
    subStr.push(categories[category], category);
    categoryStr.push(subStr.join(' '));
  }
  categoryStr = categoryStr.join(', ');
  // console.log(categoryStr);
  $scope.allObjects = categoryStr;
  // var button = document.createElement('button');
  // var textNode = document.createTextNode('Hover for All Objects');
  // button.appendChild(textNode);
  // button.className = 'mdl-button mdl-js-button mdl-button--raised mdl-button--accent mdl-cell mdl-cell--12-col';
  // // button.className = 'large expanded button';
  // button.setAttribute('aria-label', categoryStr);
  // button.id = 'obj-button';
  // componentHandler.upgradeElement(button);
  // document.getElementById('grid').insertBefore(button, document.getElementById('next-button'));

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

    // get captions
    // To make this strawman -- Comment everything in this loop except the last line
    for (var i=0; i<segmentation.length; i++) {
      // for each caption - draw a svg element (labeled with category name)
      newElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      newElement.setAttribute('role', 'img');
      var svg_id = 'svg-' + i;
      newElement.setAttribute('id', svg_id);
      newElement.setAttribute('aria-label', segmentation[i].category_name);
      iarea.appendChild(newElement);
      sub_svg = document.getElementById(svg_id);

      // draw the actual polygon
      newElement = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
      newElement.style.stroke = '#ffffff';
      newElement.style['fill-opacity'] = 0;
      newElement.style['stroke-opacity'] = 0;
      var pointStr = [];
      // scale the points according to scale factors
      for (var j = 0; j < segmentation[i].points.length; j++) {
        var newx = (segmentation[i].points[j][0] * scale_x);
        var newy = (segmentation[i].points[j][1] * scale_y);
        pointStr.push(newx);
        pointStr.push(newy);
      }
      // stringify to put it into html
      pointStr = pointStr.join(' ');
      newElement.setAttribute('points', pointStr);
      sub_svg.appendChild(newElement);
    }
  };

  $scope.next = function() {
    $location.path('/middle');
  };
};
