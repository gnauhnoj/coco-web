// /* Controllers */

var IndexController = function($scope, $route, dataStore) {
    // update this shit when i array this
    // dataStore.currentImg = data.file_name;
    // dataStore.currentData = data;
    console.log(dataStore.currentData);
    var segmentation = dataStore.currentData.segmentation;
    var w = document.documentElement.clientWidth;
    var h = document.documentElement.clientHeight * 0.75;

    // console.log(dataStore.currentImg);
    // console.log(dataStore.currentData);
    var _img = document.getElementById('id1');
    var newImg = new Image();

    // var ratio = window.devicePixelRatio || 1;
    // var w = screen.width * ratio;
    // var h = screen.height * ratio;

    newImg.onload = function() {
        _img.src = newImg.src;
        var height = newImg.height;
        var width = newImg.width;
        var scale_x = w / width;
        var scale_y = h / height;

        // TODO: I could probably refactor this to be true/false instead
        var dim = (width > height) ? 'x' : 'y';
        var scale;

        if (dim === 'x') {
          scale = scale_x;
          _img.width = w;
          _img.height = height * scale;

        } else {
          scale = scale_y;
          _img.width = width * scale;
          _img.height = h;
        }

        console.log(_img.width, _img.height);

        var iarea = document.getElementById('image-area');
        iarea.setAttribute('height', _img.height);
        iarea.setAttribute('width', _img.width);

        var newElement = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        newElement.setAttribute('height', _img.height);
        newElement.setAttribute('width', _img.width);
        // newElement.setAttribute('aria-label', 'image area');
        newElement.style.fill = '#D3D3D3';
        iarea.appendChild(newElement);

        for (var i=0; i<segmentation.length; i++) {
          // console.log(segmentation[i]);
          newElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
          newElement.setAttribute('role', 'img');
          var svg_id = 'svg-' + i;
          newElement.setAttribute('id', svg_id);
          newElement.setAttribute('aria-label', segmentation[i].category_name);
          iarea.appendChild(newElement);
          sub_svg = document.getElementById(svg_id);

          newElement = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
          newElement.style.stroke = '#ffffff';
          newElement.style['fill-opacity'] = 0.4;
          var pointStr = [];
          for (var j = 0; j < segmentation[i].points.length; j++) {
            var newx = (segmentation[i].points[j][0] * scale);
            var newy = (segmentation[i].points[j][1] * scale);
            pointStr.push(newx);
            pointStr.push(newy);
          }
          pointStr = pointStr.join(' ');
          newElement.setAttribute('points', pointStr);
          sub_svg.appendChild(newElement);
        }
        // console.log(_img.width, _img.height);
    };
    newImg.src = dataStore.currentImg;

    // TODO: this is hacked for now - need to change to a link etc with questions
    $scope.next = function() {
      dataStore.next();
      console.log(dataStore);
      $route.reload();
    };
};

var dateIfy = function(arr) {
  for (var i = 0; i < arr.length; i++) {
    for (var j = 0; j < arr[i].length; j++) {
      var newd = new Date(arr[i][j].replace( /(\d{4})-(\d{2})-(\d{2})/, '$2/$3/$1'));
      arr[i][j] = newd;
    }
  }
  return arr;
};
