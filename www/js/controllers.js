angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, Camera, $ionicModal, $http,$ionicPopup,querysall,querysnocopy2,querysowetable2) {

  var imgInput = document.querySelector('#imgInput');
  var btn2 = document.querySelector('#btn2');
  var bac = document.getElementById('backtropQuer');
  var alert1 = document.querySelectorAll('#backtropQuer .alert')[0];
  var alert2 = document.querySelectorAll('#backtropQuer .alert')[1];
  var ammeterValue,userId;
  btn2.onclick = function(){
    $scope.openModal();
  } 
  $scope.test = function (){
    bac.style.visibility = "visible";
    bac.style.opacity = 1;
    bac.classList.add('test');
  }
    //-------------------cordova调用摄像头----------------- 
  $scope.getPhoto = function() {
    //在这里判断是否登入
    if (true) {
      cordova.plugins.barcodeScanner.scan(
        function (result) {//result.text
            // alert("We got a barcode\n" +
            //       "Result: " + result.text + "\n" +
            //       "Format: " + result.format + "\n" +
            //       "Cancelled: " + result.cancelled);
            // $scope.$broadcast('scroll.refreshComplete');
            $scope.$broadcast('scroll.refreshComplete');
            userId = result.text;
             $ionicPopup.show({
                 template: '<input type="text" id="mypop" ng-model="data.wifi">',
                 title: '您扫描的电表号是:'+userId,
                 subTitle: '请输入电表数',
                 scope: $scope,
                 buttons: [
                   { text: '取消' },
                   {
                     text: '<b>保存</b>',
                     type: 'button-royal',
                     onTap: function(e) {
                       $http({
                          url: 'http://121.40.133.15:8080/dianfei/change/ammeterValue.php?id='+userId+'&ammeterValue='+ (document.querySelector('#mypop').value),
                          method: 'GET'
                          }).
                          success(function(data, status, headers, config) {

                            
                          }).
                          error(function(data, status){
                            alert("time out")
                        })
                        $http({
                            url: 'http://121.40.133.15:8080/dianfei/change/checked.php?id='+userId+'&checked=1',
                            method: 'GET'
                            }).
                            success(function(data, status, headers, config) {
                            }).
                            error(function(data, status){
                              alert("time out")
                       })
                     }
                   },
                 ]
               });
               myPopup.then(function(res) {
                 console.log('Tapped!', res);
               });
               $timeout(function() {
                  myPopup.close(); 
               }, 3000);
            
        }, 
        function (error) {
            alert("Scanning failed: " + error);
        }
      );
    };
    
  };

  
  

    //-------------------cordova调用摄像头-----------------

 //------------------请求全部用户数据---------------------------
    var promise = querysnocopy2.getAll();
    promise.then(function(data){
      // console.log(data);    //---------data 一个数组，后台返回的数据

      var len = data.length,//-------data.lenght 后台数据的长度
          i,
          checkedList = [],
          uncheckedList = [];

      for( i =0; i<len;i++){
        //判断数据是非已超

        if (data[i].checked) {
          //超过了的
          checkedList.push(data[i]); 
        }else{
          //没抄的
          uncheckedList.push(data[i]);
        };
      }
      /*console.log('checkedList is ' + checkedList);
      console.log('uncheckedList is ' + uncheckedList);*/
      //定义$scope.uncheckedLists就能在模板上使用它
      $scope.checkedLists = checkedList;
      $scope.uncheckedLists = uncheckedList;
    })
    //-----------------请求全部用户数据--------------------------

    //-----------------请求欠费用户数据--------------------------
    var owe = querysowetable2.getAll();
    owe.then(function(data){
      // console.log(data);    //---------data 一个数组，后台返回的数据

      var len = data.length,//-------data.lenght 后台数据的长度
          i,
          owecheckedList = [];

      for( i =0; i<len;i++){
          owecheckedList.push(data[i]);
      }
      //定义$scope.uncheckedLists就能在模板上使用它
      $scope.owecheckedLists = owecheckedList;
    })
    //-----------------请求欠费用户数据--------------------------
      $scope.keyEnter = function(){

        if(event.keyCode==13){
          $scope.openModal();
        }
      }
    //-------------------login模块 -----------------------
    $ionicModal.fromTemplateUrl('my-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });
    $scope.openModal = function() {
      $scope.modal.show();
      var promise = querysall.getOne(document.querySelector('#aaa').value);
      promise.then(function(data){
        $scope.data = data[0];
      })
      
    };
    $scope.closeModal = function() {
      $scope.modal.hide();
    };
    //Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
      $scope.modal.remove();
    });
    // Execute action on hide modal
    $scope.$on('modal.hidden', function() {
      // Execute action
    });
    // Execute action on remove modal
    $scope.$on('modal.removed', function() {
      // Execute action
    });

    //-------------------login模块 -----------------------

    //-------------------查询模块-------------------------


    //-------------------查询模块-------------------------

    //--------------------初始化---------------------
    
})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope,querysmyMessage) {
  $scope.settings = {
    enableFriends: true
  };
  var username,password;
    username = document.querySelector('#userName').value;
    password = document.querySelector('#passWord').value;
    /*$scope.usernameS = username;
    $scope.passwordS = password;*/

    var promise = querysmyMessage.getOne(username);
    promise.then(function(data){
      // $scope.data = data[0];
      var len = data.length,//-------data.lenght 后台数据的长度
          i,
          myMessageList1 = [];
      for( i =0; i<len;i++){
          myMessageList1.push(data[i]);
      }
      // console.log($scope.data);
      $scope.myMessageList1s = myMessageList1;
    })
})

//未抄报表
.controller('NocopyCtrl', function($scope,querysnocopy) {
  //------------------请求数据---------------------------
    var promise = querysnocopy.getAll();
  promise.then(function(data){
    console.log(data)
    var len = data.length,
        i,
        checkedList = [],
        uncheckedList = [];
    for( i =0; i<len;i++){
      if (data[i].checked) {
        checkedList.push(data[i]);
      }else{
        uncheckedList.push(data[i]);
      };
    }
    $scope.uncheckedLists = uncheckedList;
  })
    //-----------------请求数据--------------------------
})

//已抄报表
.controller('CopytableCtrl', function($scope,querysalltable) {
  //------------------请求数据---------------------------
    var promise = querysalltable.getAll();
  promise.then(function(data){
    console.log(data)
    var len = data.length,
        i,
        checkedList = [],
        uncheckedList = [];
    for( i =0; i<len;i++){
      if (data[i].checked) {
        checkedList.push(data[i]);
      }else{
        uncheckedList.push(data[i]);
      };
    }
    $scope.checkedLists = checkedList;
  })
    //-----------------请求数据--------------------------
})

//欠费报表
.controller('OwetableCtrl', function($scope,querysowetable) {
  //------------------请求数据---------------------------
    var promise = querysowetable.getAll();
    promise.then(function(data){
      // console.log(data);    //---------data 一个数组，后台返回的数据

      var len = data.length,//-------data.lenght 后台数据的长度
          i,
          owecheckedList = [];

      for( i =0; i<len;i++){
          owecheckedList.push(data[i]);
      }
      //定义$scope.uncheckedLists就能在模板上使用它
      $scope.owecheckedLists = owecheckedList;
    })
    //-----------------请求数据--------------------------
})

//全部报表
.controller('AlltableCtrl', function($scope,querysalltable) {
  //------------------请求数据---------------------------
    var promise = querysalltable.getAll();
    promise.then(function(data){
      // console.log(data);    //---------data 一个数组，后台返回的数据

      var len = data.length,//-------data.lenght 后台数据的长度
          i,
          allList = [];

      for( i =0; i<len;i++){
          allList.push(data[i]);
      }
      //定义$scope.uncheckedLists就能在模板上使用它
      $scope.allLists = allList;
    })
    //-----------------请求数据--------------------------
})

//查询报表
.controller('SelectstableCtrl', function($scope,$stateParams, $ionicModal, $ionicGesture, querysalltable){
  var value = '';
  $scope.value = value;
  var bac = document.getElementById('backtropId');
  var bacInput = bac.getElementsByTagName('input')[0];
  
  $scope.action = function(){

    bac.style.visibility = "visible";
    bac.classList.add('test');
    console.log(bac.style.cssText)
  }
  $scope.hide = function(){
    bac.style.visibility = "hidden";
    bac.classList.remove('test');
  }

  $ionicModal.fromTemplateUrl('my-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });
    $scope.openModal = function() {
      $scope.modal.show();
      $scope.titleId = $scope.value;
      var promise = querysalltable.getOne($scope.value);
      promise.then(function(data){
        $scope.data = data;
      })
    };
    $scope.closeModal = function() {
      $scope.modal.hide();
    };
    //Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
      $scope.modal.remove();
    });
    // Execute action on hide modal
    $scope.$on('modal.hidden', function() {
      // Execute action
    });
    // Execute action on remove modal
    $scope.$on('modal.removed', function() {
      // Execute action
    });

})

//未抄报表详细内容
.controller('Nocopy-detailsCtrl', function($scope,$stateParams,querysnocopy) {
   //------------------请求数据---------------------------
    var promise = querysnocopy.getOne($stateParams.eleId);
    promise.then(function(data){
      $scope.data = data[0];
      // console.log($scope.data);
    })
    // console.log($stateParams.eleId);
    
    //-----------------请求数据--------------------------
})

//已抄报表详细内容
.controller('CopytableDetailsCtrl', function($scope,$stateParams,querysalltable) {
   //------------------请求数据---------------------------
    var promise = querysalltable.getOne($stateParams.eleId);
    promise.then(function(data){
      $scope.data = data[0];
      // console.log($scope.data);
    })
    // console.log($stateParams.eleId);
    
    //-----------------请求数据--------------------------
})

//欠费报表详细内容
.controller('OwetableDetailsCtrl', function($scope,$stateParams,querysalltable) {
   //------------------请求数据---------------------------
    var promise = querysalltable.getOne($stateParams.eleId);
    promise.then(function(data){
      $scope.data = data[0];
      // console.log($scope.data);
    })
    // console.log($stateParams.eleId);
    
    //-----------------请求数据--------------------------
})

.controller('loginCtrl', function($scope, $http, $ionicLoading) {
  var username,password;
   $scope.show1 = function() {
    $ionicLoading.show({
      template: '登录成功'
    });
  };
  $scope.show2 = function() {
    $ionicLoading.show({
      template: '用户名或密码错误'
    });
  };
  $scope.hide = function(){
    $ionicLoading.hide();
  };
  $scope.login = function(){
    username = document.querySelector('#userName').value;
    password = document.querySelector('#passWord').value;
    
    location.href="#/tab/dash"
  }
   
})

.controller('OwnmessageCtrl', function($scope,$stateParams,$ionicLoading, querysmyMessage) {
   //------------------请求数据---------------------------
    var username,password;
    username = document.querySelector('#userName').value;
    password = document.querySelector('#passWord').value;
    /*$scope.usernameS = username;
    $scope.passwordS = password;*/
    $scope.show3 = function() {
    $ionicLoading.show({
      template: '注销成功'
    });
  };
    var promise = querysmyMessage.getOne(username);
    promise.then(function(data){
      // $scope.data = data[0];
      var len = data.length,//-------data.lenght 后台数据的长度
          i,
          myMessageList = [];
      for( i =0; i<len;i++){
          myMessageList.push(data[i]);
      }
      // console.log($scope.data);
      $scope.myMessageLists = myMessageList;
    })
    $scope.refresh = function(){
      setTimeout(function(){
          window.location.reload();
        },2000)
      $scope.show3();
    }
    //-----------------请求数据--------------------------
})


//全部报表详细内容
.controller('AlltableDetailsCtrl', function($scope,$stateParams,querysnocopy) {
   //------------------请求数据---------------------------
    var promise = querysnocopy.getOne($stateParams.eleId);
    promise.then(function(data){
      $scope.data = data[0];
      // console.log($scope.data);
    })
    // console.log($stateParams.eleId);
    
    //-----------------请求数据--------------------------
});