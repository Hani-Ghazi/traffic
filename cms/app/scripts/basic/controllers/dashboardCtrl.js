'use strict';

angular.module('trafficCMS.basic')
.controller('DashboardCtrl', function($scope, $filter) {
  $scope.widgets = [{
    class: 'panel-solid-info',
    icon: 'fa-tags',
    label: $filter('translate')('dashboard.widgets.brands'),
    value: 7
  }, {
    class: 'panel-solid-warning',
    icon: 'fa-barcode',
    label: $filter('translate')('dashboard.widgets.products'),
    value: 23
  }, {
    class: 'panel-solid-success',
    icon: 'fa-code-fork',
    label: $filter('translate')('dashboard.widgets.branches'),
    value: 11
  }, {
    class: 'panel-solid-default',
    icon: 'fa-qrcode',
    label: $filter('translate')('dashboard.widgets.vouchers'),
    value: 45
  }];

  $scope.followers = [{
    name: 'Folisise Chos',
    image: 'images/a1.png',
    date: '23-06-2016'
  }, {
    name: 'Mogen Polish',
    image: 'images/a2.png',
    date: '01-05-2016'
  }, {
    name: 'Meg Smith',
    image: 'images/a3.jpg',
    date: '25-04-2016'
  }, {
    name: 'Chris Fox',
    image: 'images/a4.jpg',
    date: '09-02-2016'
  }, {
    name: 'James Brogan',
    image: 'images/a5.jpg',
    date: '31-12-2015'
  }, {
    name: 'Jonathan Doe',
    image: 'images/a6.jpg',
    date: '15-03-2015'
  }];

  $scope.labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  $scope.series = ['Series A'];
  $scope.data = [[55, 59, 50, 69, 56, 75, 77]];
  $scope.datasetOverride = [{
    yAxisID: $filter('translate')('dashboard.followers.visitors')
  }];
  $scope.options = {
    scales: {
      yAxes: [
        {
          id: $filter('translate')('dashboard.followers.visitors'),
          type: 'linear',
          display: true,
          position: 'left'
        }
      ]
    }
  };
});