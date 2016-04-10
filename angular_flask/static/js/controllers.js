// /* Controllers */

var IndexController = function($scope, $location) {
  $scope.go = function() {
    $location.path('/image');
  };
};

var QuizController = function($scope, $location, dataStore) {
  $scope.next = function() {
    dataStore.next();
    // $route.reload();
    $location.path('/image');
  };
};

var ImageController = function($scope, $location, dataStore) {
  var segmentation = dataStore.currentData.segmentation;

  // Get screen width/height
  // play with this
  var w = document.documentElement.clientWidth;
  var h = document.documentElement.clientHeight * 0.75;

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
    scale_y = (height > width) ? scale_y : scale_x;
    _img.height = (height > width) ? h : height * scale_y;
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

    var categories = {};
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

      // build a global list of categories for strawman
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

    var button = document.createElement('div');
    // TODO: figure out how to deal with annoying text...
    // var textNode = document.createTextNode('All Objects');
    // button.appendChild(textNode);
    button.className = 'mdl-button mdl-js-button mdl-button--raised mdl-button--accent mdl-cell mdl-cell--12-col';
    button.setAttribute('aria-label', categoryStr);
    button.id = 'obj-button';
    componentHandler.upgradeElement(button);
    document.getElementById('grid').insertBefore(button, document.getElementById('next-button'));
  };

  // TODO: this is hacked for now - need to change to a link etc with questions
  $scope.next = function() {
    $location.path('/quiz');
  };
};
