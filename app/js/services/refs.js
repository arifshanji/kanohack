angular.module('kanoevents.services')
  .factory('Refs', ['$cookies', '$firebase',
    function($cookies, $firebase) {
      var rootRef = new Firebase($cookies.rootRef || 'https://kano-events.firebaseio.com');     
      
      // define every standard ref used application wide
      return {
        root: rootRef
      };
    }
  ]);
