'use strict';

function translateX(val, width, container) {
  return val - width / 2 + container.width / 2;
}
function untranslateX(val, width, container) {
  return val + width / 2 - container.width / 2;
}
function translateY(val, height, container) {
  return val - height + container.height / 2;
}
function untranslateY(val, height, container) {
  return val + height - container.height / 2;
}

angular.module('trafficCMS.basic')
  .directive('ngDraggable', function($document) {
    return {
      restrict: 'A',
      scope: {
        dragOptions: '=ngDraggable',
        x: '=',
        y: '='
      },
      link: function(scope, elem, attr) {
        var startX;
        var startY;
        var start;
        var stop;
        var drag;
        var container;

        var width  = elem[0].offsetWidth;
        var height = elem[0].offsetHeight;
        var x = scope.x;
        var y = -1 * scope.y;

        // Obtain drag options
        if (scope.dragOptions) {
          start = scope.dragOptions.start;
          drag = scope.dragOptions.drag;
          stop = scope.dragOptions.stop;
          var id = scope.dragOptions.container;
          var containerSize = scope.dragOptions.containerSize;
          if (id) {
            container = document.getElementById(id).getBoundingClientRect();
            // if old container size was specified then scale the position when drawing for the first time
            if (containerSize) {
              // var x = translateX(scope.x, width, containerSize) || 0;
              // var y = translateY(scope.y, height, containerSize) || 0;
              // // un-translate
              // x += width / 2;
              // y += height;
              // scale
              x = x / containerSize.width * container.width;
              y = y / containerSize.height * container.height;
              // translate
              x = translateX(x, width, container);
              y = translateY(y, height, container);
            }
            // add an event on resizing to re-arrange the position so it is scaled on the same ratio
            new ResizeSensor(document.getElementById(id), function(e) {
              var newContainer = document.getElementById(id).getBoundingClientRect();
              // un-traslate
              // x += width / 2;
              // y += height;
              x = untranslateX(x, width, container);
              y = untranslateY(y, height, container);
              // scale
              var newX = x / container.width * newContainer.width;
              var newY = y / container.height * newContainer.height;
              // translate
              // x -= width / 2;
              // y -= height;
              x = translateX(newX, width, newContainer);
              y = translateY(newY, height, newContainer);
              container = newContainer;
              setPosition();
              if (drag) {
                scope.$apply(function() {
                  // drag(e, untranslateX(x, width, containerSize), -1 * untranslateY(y, height, containerSize));
                  drag(e, newX, -newY);
                });
              }
            });
          }
        }

        // Move element, within container if provided
        function setPosition() {
          if (container) {
            if (x < -width / 2) {
              x = -width / 2;
            }
            else if (x > container.width - width / 2) {
              x = container.width - width / 2;
            }
            if (y < -height) {
              y = -height;
            }
            else if (y > container.height - height) {
              y = container.height - height;
            }
          }

          elem.css({
            top: y + 'px',
            left: x + 'px'
          });
        }

        if (x || y) {
          setPosition();
          if (stop) {
            // update x,y of POI on init
            stop(null, untranslateX(x, width, container), -1 * untranslateY(y, height, container));
          }
        }

        // Bind mousedown event
        elem.on('mousedown', function(e) {
          e.preventDefault();
          startX = e.clientX - elem[0].offsetLeft;
          startY = e.clientY - elem[0].offsetTop;
          $document.on('mousemove', mousemove);
          $document.on('mouseup', mouseup);
          if (start) {
            scope.$apply(function() {
              start(e, x, y);
            });
          }
        });

        // Handle drag event
        function mousemove(e) {
          y = e.clientY - startY;
          x = e.clientX - startX;
          setPosition();
          if (drag) {
            scope.$apply(function() {
              drag(e, untranslateX(x, width, container), -1 * untranslateY(y, height, container));
            });
          }
        }

        // Unbind drag events
        function mouseup(e) {
          $document.unbind('mousemove', mousemove);
          $document.unbind('mouseup', mouseup);
          if (stop) {
            scope.$apply(function() {
              stop(e, untranslateX(x, width, container), -1 * untranslateY(y, height, container));
            });
          }
        }
      }
    };
  });