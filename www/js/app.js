// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  /*$ionicConfigProvider.platform.android.tabs.position("bottom");
  $ionicConfigProvider.tabs.style('standard');*/

  


  $stateProvider



  // setup an abstract state for the tabs directive
    .state('tab', {
    url: "/tab",
    abstract: true,
    templateUrl: "templates/tabs.html"
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  })

  .state('tab.nocopy', {
    url: '/nocopy',
    views: {
      'tab-account': {
        templateUrl: 'templates/nocopy.html',
        controller: 'NocopyCtrl'
      }
    }
  })

  .state('tab.owetable', {
    url: '/owetable',
    views: {
      'tab-account': {
        templateUrl: 'templates/owetable.html',
        controller: 'OwetableCtrl'
      }
    }
  })

  .state('tab.alltable', {
    url: '/alltable',
    views: {
      'tab-account': {
        templateUrl: 'templates/alltable.html',
        controller: 'AlltableCtrl'
      }
    }
  })

  .state('tab.selectstable', {
    url: '/selectstable',
    views: {
      'tab-account': {
        templateUrl: 'templates/selectstable.html',
        controller: 'SelectstableCtrl'
      }
    }
  })

  .state('tab.copytable', {
    url: '/copytable',
    views: {
      'tab-account': {
        templateUrl: 'templates/copytable.html',
        controller: 'CopytableCtrl'
      }
    }
  })

  .state('tab.copytableDetails', {
    url: '/:eleId/copytableDetails',
    views: {
      'tab-account': {
        templateUrl: 'templates/copytableDetails.html',
        controller: 'CopytableDetailsCtrl'
      }
    }
  })

  .state('tab.owetableDetails', {
      url: '/:eleId/owetableDetails',
      views: {
        'tab-account': {
          templateUrl: 'templates/owetableDetails.html',
          controller: 'OwetableDetailsCtrl'
        }
      }
  })

  .state('tab.nocopy-details', {
    url: '/:eleId/nocopy-details',
    views: {
      'tab-account': {
        templateUrl: 'templates/nocopy-details.html',
        controller: 'Nocopy-detailsCtrl'
      }
    }
  })

  .state('tab.alltableDetails', {
    url: '/:eleId/alltableDetails',
    views: {
      'tab-account': {
        templateUrl: 'templates/alltableDetails.html',
        controller: 'AlltableDetailsCtrl'
      }
    }
  })

  .state('tab.ownmessage', {
    url: '/ownmessage',
    views: {
      'tab-account': {
        templateUrl: 'templates/ownmessage.html',
        controller: 'OwnmessageCtrl'
      }
    }
  })

  .state('login', {
          url: "/login",       
          templateUrl: "templates/login.html",
          controller: 'loginCtrl'
    
        })

//跳转到login界面
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');//默认跳转到此界面或者也可以像下面这样写
  // $urlRouterProvider.when('','/login');

});
