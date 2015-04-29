'use strict';

angular.module('app', [
  'ngAnimate',
  'ngTouch'
]).constant('Config', {
  api: {
    root: 'http://localhost:3000'
  }
});