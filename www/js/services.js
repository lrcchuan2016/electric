angular.module('starter.services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
  },{
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'https://pbs.twimg.com/profile_images/598205061232103424/3j5HUXMY.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'https://pbs.twimg.com/profile_images/578237281384841216/R3ae1n61.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
})

.factory('Camera', ['$q', function($q) {

  return {
    getPicture: function(options) {
      var q = $q.defer();

      navigator.camera.getPicture(function(result) {
        // Do any magic you need
        q.resolve(result);
      }, function(err) {
        q.reject(err);
      }, options);

      return q.promise;
    }
  }
}])

//请求数据的工厂
//格式就是这样的换一下url就可以
.factory('querysall', function($http, $q) {
    return {
        getAll: function() {
            var deferred = $q.defer(); // 声明延后执行，表示要去监控后面的执行
          
            $http({
                method: 'GET',
                url: 'http://121.40.133.15:8080/dianfei/' + 'select/allinformation.php',//这里放请求的api
                //写一个请求然后获取所有数据
            }, {
                cache: true
            }).
            success(function(data, status, headers, config) {
                deferred.resolve(data); // 声明执行成功，即http请求数据成功，可以返回数据了
                // console.log(data)

            }).
            error(function(data, status, headers, config) {
                deferred.reject(data); // 声明执行失败，即服务器返回错误
            });
            return deferred.promise; // 返回承诺，这里并不是最终数据，而是访问最终数据的API
        },
        getOne : function (promotionId) {

          var deferred = $q.defer();//
          $http({
                method: 'GET', 
                url: 'http://121.40.133.15:8080/dianfei/select/selectbyid.php?id='+promotionId, 
            }).
            success(function(data, status, headers, config) {
              deferred.resolve(data);
            }).
            error(function(data, status, headers, config) {
              deferred.reject(data);
            });
            return deferred.promise;
        }
        
    }
})

//欠费报表
.factory('querysowetable', function($http, $q) {
    return {
        getAll: function() {
            var deferred = $q.defer(); // 声明延后执行，表示要去监控后面的执行
          
            $http({
                method: 'GET',
                url: 'http://121.40.133.15:8080/dianfei/' + 'select/qianfeikehu.php',//这里放请求的api
                //写一个请求然后获取所有数据
            }, {
                cache: true
            }).
            success(function(data, status, headers, config) {
                deferred.resolve(data); // 声明执行成功，即http请求数据成功，可以返回数据了
                // console.log(data)

            }).
            error(function(data, status, headers, config) {
                deferred.reject(data); // 声明执行失败，即服务器返回错误
            });
            return deferred.promise; // 返回承诺，这里并不是最终数据，而是访问最终数据的API
        },
        getOne : function (promotionId) {

          var deferred = $q.defer();//
          $http({
                method: 'GET', 
                url: 'http://121.40.133.15:8080/dianfei/select/selectbyid.php?id='+promotionId, 
            }).
            success(function(data, status, headers, config) {
              deferred.resolve(data);
            }).
            error(function(data, status, headers, config) {
              deferred.reject(data);
            });
            return deferred.promise;
        }
    }
})

//欠费报表2个最新
.factory('querysowetable2', function($http, $q) {
    return {
        getAll: function() {
            var deferred = $q.defer(); // 声明延后执行，表示要去监控后面的执行
          
            $http({
                method: 'GET',
                url: 'http://121.40.133.15:8080/dianfei/' + 'select/qianfeikehu2ge.php',//这里放请求的api
                //写一个请求然后获取所有数据
            }, {
                cache: true
            }).
            success(function(data, status, headers, config) {
                deferred.resolve(data); // 声明执行成功，即http请求数据成功，可以返回数据了
                // console.log(data)

            }).
            error(function(data, status, headers, config) {
                deferred.reject(data); // 声明执行失败，即服务器返回错误
            });
            return deferred.promise; // 返回承诺，这里并不是最终数据，而是访问最终数据的API
        },
    }
})

//未抄报表
.factory('querysnocopy', function($http, $q) {
    return {
        getAll: function() {
            var deferred = $q.defer(); // 声明延后执行，表示要去监控后面的执行
          
            $http({
                method: 'GET',
                url: 'http://121.40.133.15:8080/dianfei/' + 'select/weichaokehu.php',//这里放请求的api
                //写一个请求然后获取所有数据
            }, {
                cache: true
            }).
            success(function(data, status, headers, config) {
                deferred.resolve(data); // 声明执行成功，即http请求数据成功，可以返回数据了
                // console.log(data)

            }).
            error(function(data, status, headers, config) {
                deferred.reject(data); // 声明执行失败，即服务器返回错误
            });
            return deferred.promise; // 返回承诺，这里并不是最终数据，而是访问最终数据的API
        },
        getOne : function (promotionId) {

          var deferred = $q.defer();//
          $http({
                method: 'GET', 
                url: 'http://121.40.133.15:8080/dianfei/select/selectbyid.php?id='+promotionId, 
            }).
            success(function(data, status, headers, config) {
              deferred.resolve(data);
            }).
            error(function(data, status, headers, config) {
              deferred.reject(data);
            });
            return deferred.promise;
        }
    }
})

//未抄报表最新2个
.factory('querysnocopy2', function($http, $q) {
    return {
        getAll: function() {
            var deferred = $q.defer(); // 声明延后执行，表示要去监控后面的执行
          
            $http({
                method: 'GET',
                url: 'http://121.40.133.15:8080/dianfei/' + 'select/weichaokehu2ge.php',//这里放请求的api
                //写一个请求然后获取所有数据
            }, {
                cache: true
            }).
            success(function(data, status, headers, config) {
                deferred.resolve(data); // 声明执行成功，即http请求数据成功，可以返回数据了
                // console.log(data)

            }).
            error(function(data, status, headers, config) {
                deferred.reject(data); // 声明执行失败，即服务器返回错误
            });
            return deferred.promise; // 返回承诺，这里并不是最终数据，而是访问最终数据的API
        },
    }
})

//全部报表
.factory('querysalltable', function($http, $q) {
    return {
        getAll: function() {
            var deferred = $q.defer(); // 声明延后执行，表示要去监控后面的执行
          
            $http({
                method: 'GET',
                url: 'http://121.40.133.15:8080/dianfei/' + 'select/allinformation.php',//这里放请求的api
                //写一个请求然后获取所有数据
            }, {
                cache: true
            }).
            success(function(data, status, headers, config) {
                deferred.resolve(data); // 声明执行成功，即http请求数据成功，可以返回数据了
                // console.log(data)

            }).
            error(function(data, status, headers, config) {
                deferred.reject(data); // 声明执行失败，即服务器返回错误
            });
            return deferred.promise; // 返回承诺，这里并不是最终数据，而是访问最终数据的API
        },
        getOne : function (promotionId) {

          var deferred = $q.defer();//
          $http({
                method: 'GET', 
                url: 'http://121.40.133.15:8080/dianfei/select/selectbyid.php?id='+promotionId, 
            }).
            success(function(data, status, headers, config) {
              deferred.resolve(data);
            }).
            error(function(data, status, headers, config) {
              deferred.reject(data);
            });
            return deferred.promise;
        }
    }
})

//个人信息
.factory('querysmyMessage', function($http, $q) {
    return {
        getAll: function() {
            var deferred = $q.defer(); // 声明延后执行，表示要去监控后面的执行
          
            $http({
                method: 'GET',
                url: 'http://121.40.133.15:8080/dianfei/' + 'select/weichaokehu.php',//这里放请求的api
                //写一个请求然后获取所有数据
            }, {
                cache: true
            }).
            success(function(data, status, headers, config) {
                deferred.resolve(data); // 声明执行成功，即http请求数据成功，可以返回数据了
                // console.log(data)

            }).
            error(function(data, status, headers, config) {
                deferred.reject(data); // 声明执行失败，即服务器返回错误
            });
            return deferred.promise; // 返回承诺，这里并不是最终数据，而是访问最终数据的API
        },
        getOne : function (promotionId) {

          var deferred = $q.defer();//
          $http({
                method: 'GET', 
                url: 'http://121.40.133.15:8080/dianfei/select/adminselectbyid.php?id='+promotionId, 
            }).
            success(function(data, status, headers, config) {
              deferred.resolve(data);
            }).
            error(function(data, status, headers, config) {
              deferred.reject(data);
            });
            return deferred.promise;
        }
    }
})


//登陆信息获取
.factory('queryslogin', function($http, $q) {
    return {
        getAll: function() {
            var deferred = $q.defer(); // 声明延后执行，表示要去监控后面的执行
          
            $http({
                method: 'GET',
                url: 'http://121.40.133.15:8080/dianfei/' + 'select/allinformation.php',//这里放请求的api
                //写一个请求然后获取所有数据
            }, {
                cache: true
            }).
            success(function(data, status, headers, config) {
                deferred.resolve(data); // 声明执行成功，即http请求数据成功，可以返回数据了
                // console.log(data)

            }).
            error(function(data, status, headers, config) {
                deferred.reject(data); // 声明执行失败，即服务器返回错误
            });
            return deferred.promise; // 返回承诺，这里并不是最终数据，而是访问最终数据的API
        },
        getOne : function (promotionId) {

          var deferred = $q.defer();//
          $http({
                method: 'GET', 
                url: 'http://121.40.133.15:8080/dianfei/select/selectbyid.php?id='+promotionId, 
            }).
            success(function(data, status, headers, config) {
              deferred.resolve(data);
            }).
            error(function(data, status, headers, config) {
              deferred.reject(data);
            });
            return deferred.promise;
        }
    }
});




