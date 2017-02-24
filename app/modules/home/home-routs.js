/**
 * Created by souza on 23/02/17.
 */
(function () {
    angular
        .module('xyInc')
        .config(['$stateProvider', function ($stateProvider) {

            $stateProvider
                .state('main', {
                    url: '',
                    templateUrl: 'modules/main/main.html',
                    abstract: true
                })
                .state('main.home', {
                    url: '/home',
                    templateUrl: 'modules/home/home.html',
                    controller: 'HomeController as homeCtrl'
                })
                .state('main.home-list', {
                    url: '/home/list',
                    templateUrl: 'modules/home/part/home-list.html',
                    controller: 'HomeListController as homeListCtrl'
                });
        }]);
})();