'use strict';

angular.module('app').directive('card', 
    ['$compile', function($compile) {

  return {
    replace: true,
    restrict: 'E',
    scope: {
      heading: '@heading',
      onRefresh: '&onRefresh'
    },
    templateUrl: 'directives/card/CardDirective.html',
    transclude: true,
    link: function($scope, $element, $attrs) {
      var onRefreshHandler = $scope.onRefresh();
      $element.find('.panel-heading a').click(function() {
        var $this = $(this);
        var title = $this.attr('title');
        $this.addClass('fa-spin').attr('title', title + 'ing...');
        onRefreshHandler(function() {
          $this.removeClass('fa-spin').attr('title', title);
        });
      });
    }
  };
}]);