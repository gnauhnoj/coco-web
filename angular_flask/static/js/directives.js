/* Directives */
angular.module('angularFlaskDirectives', [])
  .directive('fittext', function($timeout) {
  return {
    scope: {
      minFontSize: '@',
      maxFontSize: '@',
      text: '='
    },
    restrict: 'C',
    transclude: true,
    template: '<div ng-transclude class="textContainer" ng-bind="text"></div>',
    controller: function($scope, $element, $attrs) {
      var maxFontSize = $scope.maxFontSize || 50;
      var minFontSize = $scope.minFontSize || 8;

      // text container
      var textContainer = $element[0].querySelector('.textContainer');

      // Add styles
      angular.element(textContainer).css('word-wrap', 'break-word');

      // max dimensions for text container
      var maxHeight = $element[0].offsetHeight;
      var maxWidth = $element[0].offsetWidth;

      var textContainerHeight;
      var textContainerWidth;
      var fontSize = maxFontSize;

      var resizeText = function(){
        $timeout(function(){
          // set new font size and determine resulting dimensions
          textContainer.style.fontSize = fontSize + 'px';
          textContainerHeight = textContainer.offsetHeight;
          textContainerWidth = textContainer.offsetWidth;

          if((textContainerHeight > maxHeight || textContainerWidth > maxWidth) && fontSize > minFontSize){

            // shrink font size
            var ratioHeight = Math.floor(textContainerHeight / maxHeight);
            var ratioWidth = Math.floor(textContainerWidth / maxWidth);
            var shrinkFactor = ratioHeight > ratioWidth ? ratioHeight : ratioWidth;
            fontSize -= shrinkFactor;
            // console.log("fontSize", fontSize);
            resizeText();
          }else{
            /*textContainer.style.visibility = "visible";*/
          }
        }, 0);
      };

      // watch for changes to text
      $scope.$watch('text', function(newText, oldText){
        if(newText === undefined) return;

        // text was deleted
        if(oldText !== undefined && newText.length < oldText.length){
          fontSize = maxFontSize;
          // console.log("Letter was deleted");
        }
        /*textContainer.style.visibility = "hidden";*/
        resizeText();
      });
    }
  };
});
