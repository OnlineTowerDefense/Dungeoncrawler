'use strict'

angular
  .module('otd.controller.navigation', [])
  .controller('NavigationController', ['$scope', '$location', '$timeout', function ($scope, $location, $timeout) {
    $scope.menu = [
        {
            label: 'Home',
            authorized: false,
            iconClasses: 'fa fa-home',
            url: '#/'
        },
        {
            label: 'Dashboard',
            authorized: true,
            iconClasses: 'fa fa-th-large',
            url: '#/dashboard'
        },
        {
            label: 'Dungeon Editor',
            authorized: true,
            iconClasses: 'fa fa-shield',
            url: '#/dungeon'
        },{
            label: 'Attack Force Editor',
            authorized: true,
            iconClasses: 'fa fa-bolt',
            url: '#/attackForce'
        }/*,
        {
            label: 'Job Market',
            iconClasses: 'fa fa-tasks',
            authorized: true,
            children: [
                {
                    label:"Jobs for Defenders",
                    iconClasses:"fa fa-shield",
                    url:"#/1"
                },
                {
                    label:"Jobs for Attackers",
                    iconClasses:"fa fa-bolt",
                    url:"#/2"
                }
            ]
        },
        {
            label:"Knowledge Base",
            iconClasses:"fa fa-book",
            authorized: false,
            children: [
                {
                    label:"Offense",
                    iconClasses:"fa fa-bolt",
                    url:"#/3"
                },
                {
                    label:"Defense",
                    iconClasses:"fa fa-shield",
                    url:"#/4"
                }
            ]
        }
        */
    ];
    
    var setParent = function (children, parent) {
        angular.forEach(children, function (child) {
            child.parent = parent;
            if (child.children !== undefined) {
                setParent (child.children, child);
            }
        });
    };

    $scope.findItemByUrl = function (children, url) {
      for (var i = 0, length = children.length; i<length; i++) {
        if (children[i].url && children[i].url.replace('#', '') == url) return children[i];
        if (children[i].children !== undefined) {
          var item = $scope.findItemByUrl (children[i].children, url);
          if (item) return item;
        }
      }
    };
    
    setParent ($scope.menu, null);
    
    $scope.openItems = [];
    $scope.selectedItems = [];
    $scope.selectedFromNavMenu = false;
    
    $scope.select = function (item) {
        // close open nodes
        if (item.open) {
            item.open = false;
            return;
        }
        for (var i = $scope.openItems.length - 1; i >= 0; i--) {
            $scope.openItems[i].open = false;
        };
        $scope.openItems = [];
        var parentRef = item;
        while (parentRef !== null) {
            parentRef.open = true;
            $scope.openItems.push(parentRef);
            parentRef = parentRef.parent;
        }
        // handle leaf nodes
        if (!item.children || (item.children && item.children.length<1)) {
            $scope.selectedFromNavMenu = true;
            for (var j = $scope.selectedItems.length - 1; j >= 0; j--) {
                $scope.selectedItems[j].selected = false;
            };
            $scope.selectedItems = [];
            var parentRef = item;
            while (parentRef !== null) {
                parentRef.selected = true;
                $scope.selectedItems.push(parentRef);
                parentRef = parentRef.parent;
            }
        };
    };

    $scope.$watch(function () {
      return $location.path();
    }, function (newVal, oldVal) {
      if ($scope.selectedFromNavMenu == false) {
        var item = $scope.findItemByUrl ($scope.menu, newVal);
        if (item)
          $timeout (function () { $scope.select (item); });
      }
      $scope.selectedFromNavMenu = false;
    });

  }])











