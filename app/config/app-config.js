/**
 * Created by Evandro Lira de Souza on 21/02/17.
 */
(function (){
    angular
        .module('xyInc')
        .config(['$urlRouterProvider', function ($urlRouterProvider) {
            $urlRouterProvider.otherwise('/home');
        }])
        .constant('_env', window.__env);
})();