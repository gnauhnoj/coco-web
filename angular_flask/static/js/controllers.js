// /* Controllers */

var IndexController = function($scope, dataStore) {
  require(['json!/static/img/test.json'], function(data) {
    // update this shit when i array this
    dataStore.currentImg = data.file_name;
    dataStore.currentData = data;
    var _img = document.getElementById('id1');
    var newImg = new Image();

    // var ratio = window.devicePixelRatio || 1;
    // var w = screen.width * ratio;
    // var h = screen.height * ratio;

    var w = document.documentElement.clientWidth;
    var h = document.documentElement.clientHeight;

    newImg.onload = function() {
        _img.src = newImg.src;
        var height = newImg.height;
        var width = newImg.width;
        var rat_w = width / w;
        var rat_h = height / h;

        _img.width = w;

        var b_canvas = document.getElementById("b");
        var b_context = b_canvas.getContext("2d");
        console.log(_img.width, _img.height);
        b_context.fillRect(0, 0, _img.width, _img.height);
    };
    newImg.src = '/static/img/' + dataStore.currentImg;
  });
};

var dateIfy = function(arr) {
  for (var i = 0; i < arr.length; i++) {
    for (var j = 0; j < arr[i].length; j++) {
      var newd = new Date(arr[i][j].replace( /(\d{4})-(\d{2})-(\d{2})/, "$2/$3/$1"));
      arr[i][j] = newd;
    }
  }
  return arr;
};
