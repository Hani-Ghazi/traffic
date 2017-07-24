

angular.module('trafficCMS.issues', [])
  .config(function ($stateProvider) {
     $stateProvider.state('app.issues', {
       url: '/issue?page&count',
       templateUrl: 'views/issue/issues-page.html',
       controller: 'issuesCtrl',
       data: {
         requiredPermission: 'issue.list'
       },
       resolve: {
         authorize: function (authorization) {
           return authorization.authorize();
         }
       }
     }).state('app.issue', {
       url: '/issues/:issueId',
       templateUrl: 'views/issue/issue-page.html',
       controller: 'issueCtrl',
       params: {
         issue: null,
         stops: null
       },
       data: {
         child: true,
         requiredPermission: 'issue.edit'
       },
       resolve: {
         issue: function ($rootScope, $q, $state, $stateParams, authorization, models) {
           return authorization.authorize().then(function () {
             var deferred = $q.defer();
             if (angular.isDefined($stateParams.issue) && $stateParams.issue !== null) {
               deferred.resolve($stateParams.issue.clone ? $stateParams.issue.clone() : angular.copy($stateParams.issue));
             }
             else if (angular.isUndefined($stateParams.issueId) || $stateParams.issueId === '' || $stateParams.issueId === null) {
               $state.go('app.issues', {}, {
                 location: 'replace'
               });
               deferred.reject();
             }
             else if ($stateParams.issueId === 'new') {
               deferred.resolve(models.issue.one(''));
             }
             else {
               models.issue.get($stateParams.issueId).then(function (issue) {
                 deferred.resolve(issue);
               }, deferred.reject);
             }
             return deferred.promise;
           });
         },
         stops: function ($q, models) {
           var deferred = $q.defer();
           models.stop.getAllStops().then(function (stops) {
             deferred.resolve(stops);
           }, deferred.reject);
           return deferred.promise;
         }
       }
     })
  });